import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { slugifyPortfolioTag } from "./portfolio-categories";
import { deleteBlob, hasBlobToken, listBlobs, putBlob } from "./vercel-blob-rest";

const METADATA_KEY = "portfolio-data.json";
const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "zardosi@admin2024";
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN ?? "";

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
  "/src/assets/{portfolio,zardozi,sequin,crystal,resham-zari,pearl-work}*.{jpg,jpeg,png,webp}",
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
  zardozi: {
    caption: "Traditional Gold Zardozi Hand Embroidery",
    tag: "Zardozi",
    priority: 100,
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
};

function defaultAssetGroup(path: string) {
  const filename = path.split("/").pop() ?? "";
  return Object.keys(defaultAssetConfig).find((prefix) => filename.startsWith(prefix));
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

export const DEFAULT_ITEMS: PortfolioItem[] = Object.entries(defaultAssetModules)
  .map<PortfolioItem | null>(([path, url]) => {
    const group = defaultAssetGroup(path);
    if (!group) return null;
    const config = defaultAssetConfig[group];
    const number = defaultAssetNumber(path);
    const slug = slugifyPortfolioTag(config.tag);
    const order = config.priority + number;
    return {
      id: `default-${defaultAssetId(path)}`,
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

async function readMetadata(): Promise<PortfolioItem[]> {
  if (!hasBlobToken(BLOB_TOKEN)) return DEFAULT_ITEMS;
  try {
    const { blobs } = await listBlobs(BLOB_TOKEN, { prefix: METADATA_KEY });
    const meta = blobs.find((b) => b.pathname === METADATA_KEY);
    if (!meta) return DEFAULT_ITEMS;
    const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return DEFAULT_ITEMS;
    const data = (await res.json()) as RawPortfolioItem[];
    const normalized = normalizeItems(Array.isArray(data) ? data : []);
    return normalized.length > 0 ? normalized : DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

// Only reads blob-stored items (no defaults). Used for write operations so
// default static assets never get written into blob storage metadata.
async function readBlobOnlyMetadata(): Promise<PortfolioItem[]> {
  if (!hasBlobToken(BLOB_TOKEN)) return [];
  try {
    const { blobs } = await listBlobs(BLOB_TOKEN, { prefix: METADATA_KEY });
    const meta = blobs.find((b) => b.pathname === METADATA_KEY);
    if (!meta) return [];
    const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as RawPortfolioItem[];
    const normalized = normalizeItems(Array.isArray(data) ? data : []);
    // Filter out any default-prefixed items that may have been stored accidentally
    return normalized.filter((item) => !item.id.startsWith("default-"));
  } catch {
    return [];
  }
}

async function writeMetadata(items: PortfolioItem[]): Promise<void> {
  if (!hasBlobToken(BLOB_TOKEN)) return;
  // Never write default items into blob storage
  const blobItems = items.filter((item) => !item.id.startsWith("default-"));
  await putBlob(BLOB_TOKEN, METADATA_KEY, JSON.stringify(normalizeItems(blobItems), null, 2), {
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
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    if (!hasBlobToken(BLOB_TOKEN)) {
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
    const safeName = data.filename.replace(/[^a-z0-9.]/gi, "_").replace(/\.(png|jpe?g|webp)$/i, "");
    const blobName = `portfolio/${Date.now()}-${safeName}.${ext}`;
    const { url } = await putBlob(BLOB_TOKEN, blobName, buffer, {
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
    return newItem;
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
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
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
    return { ok: true };
  });

export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), id: z.string(), url: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    try {
      await deleteBlob(BLOB_TOKEN, data.url);
    } catch {
      // Continue if the blob has already been removed.
    }
    const items = await readBlobOnlyMetadata();
    await writeMetadata(items.filter((it) => it.id !== data.id));
    return { ok: true };
  });

export const seedDefaultPortfolio = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    await writeMetadata(DEFAULT_ITEMS);
    return { ok: true };
  });
