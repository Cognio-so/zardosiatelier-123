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

const specificAssetCaptions: Record<string, string> = {
  // Portfolio highlights
  "portfolio-1": "Couture Floral Embroidery on Ivory Tulle",
  "portfolio-2": "Tailored Menswear Tonal Gold Zari Lapel",
  "portfolio-3": "Royal Gold Zardozi & Silver Bridal Panel",
  "portfolio-4": "Silk Resham & Sequin Floral Motif",
  "portfolio-5": "Dimensional Pearl & Micro Beadwork Lattice",
  "portfolio-6": "Haute Couture Gown Crystal & Zardozi Accent",

  // Sequin Work
  "sequin-1": "Maroon & Gold Sequin Lattice Pattern",
  "sequin-2": "Geometric Sequin & Metallic Beadwork",
  "sequin-3": "3D Floral Sequin & Micro-Bead Close-up",
  "sequin-4": "Full Couture Floral Sequin Panel",
  "sequin-5": "Beaded Metallic Floral Sequin Work",
  "sequin-6": "Dimensional 3D Sequin Blossom Detail",

  // Zardozi Work
  "zardozi-1": "Zardozi Paisley Motif in Gold Thread on Silk",
  "zardozi-2": "Close-up of Intricate Zardozi Needlework",
  "zardozi-3": "Fine Metallic Zardozi Stitching on Luxury Fabric",
  "zardozi-4": "Dense Gold Zardozi Threadwork Couture Panel",
  "zardozi-5": "Zardozi Embellishment with Floral Swirls",
  "zardozi-6": "Metallic Zardozi Floral & Leaf Composition",
  "zardozi-7": "Artisan Hand-Stitched Zardozi Swatch",
  "zardozi-8": "Symmetrical Metallic Zardozi Geometry",
  "zardozi-9": "Ornate Zardozi Pattern with Heavy Gold Relief",
  "zardozi-10": "Detail of Fine Zardozi Wire Work & Bead Accents",
  "zardozi-11": "Couture Zardozi Border & Medallion Detail",
  "zardozi-12": "Gold Zardozi Threadwork on Deep Velvet Base",
  "zardozi-13": "Ornate Zardozi Crest & Vine Embroidery",
  "zardozi-14": "Gold Zardozi Floral Arrangement with Beaded Stems",
  "zardozi-15": "Surface Zardozi Texture Sample for Couture",
  "zardozi-16": "Luxury Gold Zardozi Craftsmanship Detail",
  "zardozi-17": "Heavy Gold Zardozi Work on Sheer Net Fabric",
  "zardozi-18": "Heritage Zardozi Craft with Metallic Dabka Springs",
  "zardozi-19": "Symmetrical Zardozi Medallion Motif",
  "zardozi-20": "Refined Zardozi Couture Finishing Detail",
  "zardozi-21": "Detailed Zardozi Wire Stitching & Raised Texture",
  "zardozi-22": "Gold Zardozi Filigree Embroidery on Silk",
  "zardozi-23": "Hand-Stitched Zardozi Panel with Beaded Outlines",
  "zardozi-24": "Luxury Zardozi Embellishment Swatch",
  "zardozi-25": "Zardozi Design Accentuated with Gemstones & Beads",
  "zardozi-26": "Master Karigar Zardozi Craftsmanship Study",
  "zardozi-27": "Export-Quality Zardozi Surface Work",
  "zardozi-28": "Fine Zardozi Needlework on Sheer Ground",
  "zardozi-29": "Artisan Zardozi Embroidery Pattern Swatch",
  "zardozi-30": "Metallic Gold Zardozi Threadwork Panel",
  "zardozi-31": "Ornate Zardozi Motif with Sculpted Gold Threads",
  "zardozi-32": "Couture Zardozi Surface Work for Gowns & Lehengas",
  "zardozi-33": "Zardozi Surface Embellishment & Metallic Highlights",
  "zardozi-34": "Heritage Zardozi Craft for Bridal Accessories",
  "zardozi-35": "Luxury Gold Zardozi Finishing with Seed Beads",
  "zardozi-36": "Karigar Hand Embroidery Detail with Dabka & Salma",
  "zardozi-37": "Precision Zardozi Surface Work for Luxury Fashion",

  // Crystal & Stone Work
  "crystal-1": "Amethyst Floral Scrollwork on Silk",
  "crystal-2": "Multi-Stone Couture Panel Detail",
  "crystal-3": "Gold Zircon Cluster Motif",
  "crystal-4": "Hand-Set Swarovski Embellishments",
  "crystal-5": "Cutdana Bugle Bead Border",
  "crystal-6": "Dimensional Crystal Lattice Work",
  "crystal-7": "Scattered Stone and Sequin Mix",
  "crystal-8": "Stone Paisley Motif Swatch",
  "crystal-9": "Full Panel Stonework Composition",
  "crystal-10": "Mirror & Crystal Hand Embroidery",
  "crystal-11": "Delicate Zircon Surface Overlay",
  "crystal-12": "Symmetrical Mandala Stonework",
  "crystal-13": "Couture Gown Crystal Embellishment",
  "crystal-14": "Lace and Stone Bridal Border",
  "crystal-15": "Full-Coverage Crystal Netting",
  "crystal-16": "Burgundy Stone Inlay Detail",
  "crystal-17": "Fine Crystal Mesh Close-up",
  "crystal-18": "Floral Stone Cluster Motif",
  "crystal-19": "Emerald-Tone Stone Panel",
  "crystal-20": "Dual-Tone Crystal Scatter Swatch",
  "crystal-21": "Rich Jewel-Tone Crystal Embroidery",

  // Resham & Zari Work
  "resham-zari-page-1": "Fine Silk Resham Floral Spray on Cream Ground",
  "resham-zari-page-2": "Gold Zari & Silk Threadwork Border Detail",
  "resham-zari-page-3": "Intricate Resham Leaf & Vine Composition",
  "resham-zari-page-4": "Multi-Color Silk Resham Medallion Motif",
  "resham-zari-page-5": "Gold Zari Surface Stitching Swatch",
  "resham-zari-page-6": "Dual-Tone Resham & Zari Floral Pattern",
  "resham-zari-page-7": "Traditional Paisley Motif in Gold Zari",
  "resham-zari-page-8": "Fine Silk Threadwork Fill & Shading",
  "resham-zari-page-9": "Ornate Zari Threaded Architectural Motif",
  "resham-zari-page-10": "High-Density Silk Resham Border Study",
  "resham-zari-page-11": "Geometric Zari & Silk Grid Embroidery",
  "resham-zari-page-12": "Botanical Silk Resham Embroidery Panel",
  "resham-zari-page-13": "Gold Zari Filigree with Silk Accents",
  "resham-zari-page-14": "Delicate Resham Stitching on Sheer Base",
  "resham-zari-page-15": "Heritage Zari Threadwork Composition",
  "resham-zari-page-16": "Contrast Resham Floral Embroidery Swatch",
  "resham-zari-page-17": "Luminous Gold Zari Grid & Floral Fill",
  "resham-zari-page-18": "Master Karigar Resham Thread Shading",
  "resham-zari-page-19": "Symmetrical Silk Resham Crest Motif",
  "resham-zari-page-20": "Gold Zari & Silk Threadwork Band",
  "resham-zari-page-21": "Fine Resham Micro-Stitch Floral Swatch",
  "resham-zari-page-22": "Rich Resham & Gold Zari Couture Surface",
  "resham-zari-page-23": "Full Resham & Zari Tapestry Panel",

  // Pearl Work
  "pearl-work-page-1": "Delicate Pearl Check Grid Pattern",
  "pearl-work-page-2": "Hand-Stitched Pearl Surface Texture",
  "pearl-work-page-3": "Diamond Pearl & Beadwork Lattice",
  "pearl-work-page-4": "Bridal Ivory Pearl Fabric Swatch",
  "pearl-work-page-5": "Couture Glass Bead & Seed Pearl Composition",
  "pearl-work-page-6": "Traditional Pearl Flower Motif",
  "pearl-work-page-7": "Hand-Sewn Micro Pearl & Bead Cluster",
  "pearl-work-page-8": "Elegant White Pearl & Crystal Accents",
  "pearl-work-page-9": "Intricate Pearl Mesh Layout for Couture",
};

const topPinnedIds = [
  "default-zardozi-3",
  "default-zardozi-4",
  "default-zardozi-1",
  "default-pearl-work-page-2",
  "default-portfolio-3",
  "default-zardozi-9",
  "default-zardozi-30",
  "default-zardozi-32",
  "default-portfolio-6",
  "default-sequin-4",
  "default-crystal-9",
  "default-resham-zari-page-23",
  "default-zardozi-17",
  "default-zardozi-37",
];

export const DEFAULT_ITEMS: PortfolioItem[] = defaultAssetEntries
  .map<PortfolioItem | null>(([path, url]) => {
    const group = defaultAssetGroup(path);
    if (!group) return null;
    const config = defaultAssetConfig[group];
    const number = defaultAssetNumber(path);
    const slug = slugifyPortfolioTag(config.tag);
    const baseId = defaultAssetId(path).replace(/-opt$/, "");
    const fullId = `default-${baseId}`;
    const pinnedIndex = topPinnedIds.indexOf(fullId);
    const order = pinnedIndex !== -1 ? pinnedIndex + 1 : config.priority + number + 100;
    const caption = specificAssetCaptions[baseId] || (number === 999 ? config.caption : `${config.caption} ${number}`);

    return {
      id: fullId,
      url,
      caption,
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
