import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { slugifyPortfolioTag } from "./portfolio-categories";
import { deleteBlob, hasBlobToken, listBlobs, putBlob } from "./vercel-blob-rest";

const METADATA_KEY = "portfolio-data.json";
function getAdminPass() {
  return process.env.ADMIN_PASSWORD ?? "zardosi@admin2024";
}
function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN ?? "";
}

export type PortfolioItem = {
  id: string;
  url: string;
  caption: string;
  tag: string;
  categorySlug: string;
  uploadedAt: string;
  order: number;
  sourcePath?: string;
  isDynamic: true;
};

const defaultAssetModules = import.meta.glob<string>(
  ["../assets/*.{jpg,jpeg,png,webp}", "!../assets/*.tmp"],
  { eager: true, import: "default", query: "?url" },
);

const defaultAssetConfig: Record<
  string,
  {
    caption: string;
    tag: string;
    priority: number;
  }
> = {
  portfolio: {
    caption: "Couture Floral Embroidery on Ivory Tulle",
    tag: "Couture Studies",
    priority: 0,
  },
  "portfolio-hero": {
    caption: "Portfolio Archive Hero Image",
    tag: "Couture Studies",
    priority: 20,
  },
  collection: {
    caption: "Couture Collection Showcase",
    tag: "Couture Studies",
    priority: 40,
  },
  "hero-embroidery": {
    caption: "Homepage Hero Embroidery Detail",
    tag: "Couture Studies",
    priority: 60,
  },
  "hero-zardosi": {
    caption: "Zardozi Hero Embroidery Detail",
    tag: "Zardozi",
    priority: 80,
  },
  zardozi: {
    caption: "Traditional Gold Zardozi Hand Embroidery",
    tag: "Zardozi",
    priority: 100,
  },
  "zardozi-paisley": {
    caption: "Zardozi Paisley Surface Work",
    tag: "Zardozi",
    priority: 120,
  },
  sequin: {
    caption: "Hand-Stitched Sequin Embellishment",
    tag: "Sequin",
    priority: 200,
  },
  crystal: {
    caption: "Crystal and Stone Couture Surface Work",
    tag: "Crystal & Stone Work",
    priority: 300,
  },
  "resham-zari": {
    caption: "Resham and Zari Threadwork Detail",
    tag: "Resham & Zari",
    priority: 400,
  },
  "pearl-work": {
    caption: "Pearl and Seed Bead Hand Embroidery",
    tag: "Pearl Work",
    priority: 500,
  },
  "technique-zardosi": {
    caption: "Technique Study - Zardozi",
    tag: "Zardozi",
    priority: 600,
  },
  "technique-sequin": {
    caption: "Technique Study - Sequin",
    tag: "Sequin",
    priority: 610,
  },
  "technique-crystal": {
    caption: "Technique Study - Crystal Work",
    tag: "Crystal & Stone Work",
    priority: 620,
  },
  "technique-beadwork": {
    caption: "Technique Study - Beadwork",
    tag: "Pearl Work",
    priority: 630,
  },
  "technique-bead": {
    caption: "Technique Study - Beadwork",
    tag: "Pearl Work",
    priority: 640,
  },
  "technique-aari": {
    caption: "Technique Study - Aari Work",
    tag: "Couture Studies",
    priority: 650,
  },
  "technique-3d": {
    caption: "Technique Study - 3D Embroidery",
    tag: "Couture Studies",
    priority: 660,
  },
  "category-hero": {
    caption: "Category Page Hero Image",
    tag: "Couture Studies",
    priority: 700,
  },
  "about-hero": {
    caption: "About Page Hero Image",
    tag: "Couture Studies",
    priority: 710,
  },
  "about-quality": {
    caption: "Quality Craftsmanship Image",
    tag: "Couture Studies",
    priority: 720,
  },
  "contact-hero": {
    caption: "Contact Page Hero Image",
    tag: "Couture Studies",
    priority: 730,
  },
  "process-hero": {
    caption: "Process Page Hero Image",
    tag: "Couture Studies",
    priority: 740,
  },
  "za-logo": {
    caption: "Zardosi Atelier Brand Logo",
    tag: "Couture Studies",
    priority: 750,
  },
};

function defaultAssetGroup(path: string) {
  const filename = path.split("/").pop() ?? "";
  return Object.keys(defaultAssetConfig)
    .sort((a, b) => b.length - a.length)
    .find((prefix) => filename.startsWith(prefix));
}

function defaultAssetId(path: string) {
  return path
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
function defaultAssetNumber(path: string) {
  const filename = path.split("/").pop() ?? "";
  const match = filename.match(/-(\d+)\./);
  return match ? Number(match[1]) : 999;
}

function defaultAssetVariantRank(path: string) {
  const filename = path.split("/").pop() ?? "";
  if (filename.includes("-opt.")) return 0;
  if (filename.endsWith(".webp")) return 1;
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return 2;
  return 3;
}

const defaultAssetEntries = Object.entries(defaultAssetModules)
  .sort(([pathA], [pathB]) => defaultAssetVariantRank(pathA) - defaultAssetVariantRank(pathB))
  .filter(([path], index, entries) => {
    const id = defaultAssetId(path).replace(/-opt$/, "");
    return (
      entries.findIndex(([candidate]) => defaultAssetId(candidate).replace(/-opt$/, "") === id) ===
      index
    );
  });

export const DEFAULT_ITEMS: PortfolioItem[] = defaultAssetEntries
  .map<PortfolioItem | null>(([path, url]) => {
    const group = defaultAssetGroup(path);
    if (!group) return null;
    const config = defaultAssetConfig[group];
    const number = defaultAssetNumber(path);
    const slug = slugifyPortfolioTag(config.tag);
    const order = config.priority + number;
    return {
      id: `default-${defaultAssetId(path).replace(/-opt$/, "")}`,
      url,
      caption: number === 999 ? config.caption : `${config.caption} ${number}`,
      tag: config.tag,
      categorySlug: slug,
      uploadedAt: new Date(Date.UTC(2026, 0, 1, 0, order)).toISOString(),
      order,
      sourcePath: path,
      isDynamic: true as const,
    };
  })
  .filter((item): item is PortfolioItem => item !== null)
  .sort((a, b) => a.order - b.order);

type RawPortfolioItem = Partial<PortfolioItem> &
  Pick<PortfolioItem, "id" | "url" | "caption" | "tag" | "uploadedAt">;

function canonicalTag(tag: string) {
  const slug = slugifyPortfolioTag(tag);
  const labels: Record<string, string> = {
    zardozi: "Zardozi",
    sequin: "Sequin",
    "crystal-stone-work": "Crystal & Stone Work",
    "resham-zari": "Resham & Zari",
    "pearl-work": "Pearl Work",
    "couture-studies": "Couture Studies",
    other: "Other",
  };
  return labels[slug] ?? tag.trim();
}

function normalizeItems(items: RawPortfolioItem[]): PortfolioItem[] {
  return items
    .map((item, index) => ({
      id: item.id,
      url: item.url,
      caption: item.caption ?? "",
      tag: canonicalTag(item.tag ?? "Other"),
      categorySlug: item.categorySlug ?? slugifyPortfolioTag(item.tag ?? "Other"),
      uploadedAt: item.uploadedAt,
      order: typeof item.order === "number" ? item.order : index,
      sourcePath: item.sourcePath,
      isDynamic: true as const,
    }))
    .sort((a, b) => a.order - b.order || a.uploadedAt.localeCompare(b.uploadedAt));
}

function uniquePortfolioItems(items: PortfolioItem[]): PortfolioItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.url || item.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function readStoredMetadata(): Promise<PortfolioItem[]> {
  const token = getBlobToken();
  if (!hasBlobToken(token)) return [];
  const { blobs } = await listBlobs(token, { prefix: METADATA_KEY });
  const meta = blobs.find((b) => b.pathname === METADATA_KEY);
  if (!meta) return [];
  const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as RawPortfolioItem[];
  return normalizeItems(Array.isArray(data) ? data : []);
}

async function discoverPortfolioBlobs(): Promise<PortfolioItem[]> {
  const token = getBlobToken();
  if (!hasBlobToken(token)) return [];
  const discovered: PortfolioItem[] = [];
  let cursor: string | undefined;

  do {
    const result = await listBlobs(token, { prefix: "portfolio/", cursor, limit: 100 });
    for (const blob of result.blobs) {
      if (!/\.(png|jpe?g|webp)$/i.test(blob.pathname)) continue;
      const id = `blob-${defaultAssetId(blob.pathname)}`;
      discovered.push({
        id,
        url: blob.url,
        caption:
          blob.pathname
            .split("/")
            .pop()
            ?.replace(/\.[^.]+$/, "")
            .replace(/[-_]+/g, " ") ?? "Portfolio image",
        tag: "Other",
        categorySlug: "other",
        uploadedAt: blob.uploadedAt ?? new Date().toISOString(),
        order: 10_000 + discovered.length,
        sourcePath: blob.pathname,
        isDynamic: true,
      });
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return discovered;
}

async function readMetadata(): Promise<PortfolioItem[]> {
  const token = getBlobToken();
  if (!hasBlobToken(token)) return DEFAULT_ITEMS;
  try {
    const [stored, discovered] = await Promise.all([
      readStoredMetadata(),
      discoverPortfolioBlobs(),
    ]);
    return uniquePortfolioItems([...DEFAULT_ITEMS, ...stored, ...discovered]).sort(
      (a, b) => a.order - b.order || a.uploadedAt.localeCompare(b.uploadedAt),
    );
  } catch {
    return DEFAULT_ITEMS;
  }
}
// Only reads blob-stored items (no defaults). Used for write operations so
// default static assets never get written into blob storage metadata.
async function readBlobOnlyMetadata(): Promise<PortfolioItem[]> {
  try {
    return (await readStoredMetadata()).filter((item) => !item.id.startsWith("default-"));
  } catch {
    return [];
  }
}
async function writeMetadata(items: PortfolioItem[]): Promise<void> {
  const token = getBlobToken();
  if (!hasBlobToken(token)) return;
  // Never write default items into blob storage
  const blobItems = items.filter((item) => !item.id.startsWith("default-"));
  await putBlob(token, METADATA_KEY, JSON.stringify(normalizeItems(blobItems), null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export const getPortfolioItems = createServerFn({ method: "GET" }).handler(async () =>
  readMetadata(),
);

export const uploadPortfolioImage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      filename: z.string(),
      base64: z.string(),
      caption: z.string().max(120),
      tag: z.string().max(60),
      order: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      if (data.password !== getAdminPass()) throw new Error("Unauthorized");
      const token = getBlobToken();
      if (!hasBlobToken(token)) {
        throw new Error("BLOB_READ_WRITE_TOKEN not configured");
      }

      const matches = data.base64.match(/^data:([^;]+);base64,(.+)$/);
      if (!matches) throw new Error("Invalid image data");
      const mimeType = matches[1];
      if (!["image/png", "image/jpeg", "image/webp"].includes(mimeType)) {
        throw new Error("Only PNG, JPG and WEBP files are allowed");
      }

      const buffer = Buffer.from(matches[2], "base64");
      if (buffer.byteLength > 5 * 1024 * 1024) {
        throw new Error("File exceeds 5 MB limit");
      }

      const ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
      const safeName = data.filename
        .replace(/[^a-z0-9.]/gi, "_")
        .replace(/\.(png|jpe?g|webp)$/i, "");
      const blobName = `portfolio/${Date.now()}-${safeName}.${ext}`;
      const { url } = await putBlob(token, blobName, buffer, {
        access: "public",
        contentType: mimeType,
        addRandomSuffix: false,
      });

      const existing = await readBlobOnlyMetadata();
      const newItem: PortfolioItem = {
        id: `${Date.now()}`,
        url,
        caption: data.caption,
        tag: canonicalTag(data.tag),
        categorySlug: slugifyPortfolioTag(data.tag),
        uploadedAt: new Date().toISOString(),
        order: data.order ?? existing.length,
        isDynamic: true,
      };
      await writeMetadata([...existing, newItem]);
      return { success: true, item: newItem };
    } catch (err: any) {
      console.error("uploadPortfolioImage error:", err);
      return { success: false, error: err.message || String(err) };
    }
  });

export const updatePortfolioItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      id: z.string(),
      caption: z.string().max(120),
      tag: z.string().max(60),
      order: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      if (data.password !== getAdminPass()) throw new Error("Unauthorized");
      const items = await readBlobOnlyMetadata();
      const updated = items.map((it) =>
        it.id === data.id
          ? {
              ...it,
              caption: data.caption,
              tag: canonicalTag(data.tag),
              categorySlug: slugifyPortfolioTag(data.tag),
              order: data.order ?? it.order,
            }
          : it,
      );
      await writeMetadata(updated);
      return { success: true };
    } catch (err: any) {
      console.error("updatePortfolioItem error:", err);
      return { success: false, error: err.message || String(err) };
    }
  });

export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), id: z.string(), url: z.string() }))
  .handler(async ({ data }) => {
    try {
      if (data.password !== getAdminPass()) throw new Error("Unauthorized");
      const token = getBlobToken();
      try {
        await deleteBlob(token, data.url);
      } catch {
        // Continue if the blob has already been removed.
      }
      const items = await readBlobOnlyMetadata();
      await writeMetadata(items.filter((it) => it.id !== data.id));
      return { success: true };
    } catch (err: any) {
      console.error("deletePortfolioItem error:", err);
      return { success: false, error: err.message || String(err) };
    }
  });

export const seedDefaultPortfolio = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    try {
      if (data.password !== getAdminPass()) throw new Error("Unauthorized");
      await writeMetadata(DEFAULT_ITEMS);
      return { success: true };
    } catch (err: any) {
      console.error("seedDefaultPortfolio error:", err);
      return { success: false, error: err.message || String(err) };
    }
  });
