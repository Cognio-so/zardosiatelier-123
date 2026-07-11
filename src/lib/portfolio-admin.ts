import { createServerFn } from "@tanstack/react-start";
import { put, del, list } from "@vercel/blob";
import { z } from "zod";
import { slugifyPortfolioTag } from "./portfolio-categories";

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
  if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") return [];
  try {
    const { blobs } = await list({ token: BLOB_TOKEN, prefix: METADATA_KEY });
    const meta = blobs.find((b) => b.pathname === METADATA_KEY);
    if (!meta) return [];
    const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return [];
    return normalizeItems((await res.json()) as RawPortfolioItem[]);
  } catch {
    return [];
  }
}

async function writeMetadata(items: PortfolioItem[]): Promise<void> {
  if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") return;
  await put(METADATA_KEY, JSON.stringify(normalizeItems(items), null, 2), {
    access: "public",
    token: BLOB_TOKEN,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export const getPortfolioItems = createServerFn({ method: "GET" }).handler(
  async () => readMetadata()
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
    })
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") {
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
    const { url } = await put(blobName, buffer, {
      access: "public",
      token: BLOB_TOKEN,
      contentType: mimeType,
    });

    const existing = await readMetadata();
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
    })
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    const items = await readMetadata();
    const updated = items.map((it) =>
      it.id === data.id
        ? {
            ...it,
            caption: data.caption,
            tag: canonicalTag(data.tag),
            categorySlug: slugifyPortfolioTag(data.tag),
            order: data.order ?? it.order,
          }
        : it
    );
    await writeMetadata(updated);
    return { ok: true };
  });

export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), id: z.string(), url: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    try {
      await del(data.url, { token: BLOB_TOKEN });
    } catch {
      // Continue if the blob has already been removed.
    }
    const items = await readMetadata();
    await writeMetadata(items.filter((it) => it.id !== data.id));
    return { ok: true };
  });