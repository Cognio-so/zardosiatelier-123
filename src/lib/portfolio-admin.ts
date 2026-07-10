import { createServerFn } from "@tanstack/react-start";
import { put, del, list } from "@vercel/blob";
import { z } from "zod";

const METADATA_KEY = "portfolio-data.json";
const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "zardosi@admin2024";
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN ?? "";

export type PortfolioItem = {
  id: string;
  url: string;
  caption: string;
  tag: string;
  uploadedAt: string;
  isDynamic: true;
};

// ── helpers ────────────────────────────────────────────

async function readMetadata(): Promise<PortfolioItem[]> {
  if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") return [];
  try {
    const { blobs } = await list({ token: BLOB_TOKEN, prefix: METADATA_KEY });
    const meta = blobs.find((b) => b.pathname === METADATA_KEY);
    if (!meta) return [];
    const res = await fetch(meta.url);
    if (!res.ok) return [];
    return (await res.json()) as PortfolioItem[];
  } catch {
    return [];
  }
}

async function writeMetadata(items: PortfolioItem[]): Promise<void> {
  if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") return;
  await put(METADATA_KEY, JSON.stringify(items), {
    access: "public",
    token: BLOB_TOKEN,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

// ── Server Functions ───────────────────────────────────

/** GET — returns all dynamically uploaded portfolio items */
export const getPortfolioItems = createServerFn({ method: "GET" }).handler(
  async () => {
    return readMetadata();
  }
);

/** POST upload — admin only */
export const uploadPortfolioImage = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      filename: z.string(),
      base64: z.string(), // data:image/...;base64,...
      caption: z.string().max(120),
      tag: z.string().max(60),
    })
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) {
      throw new Error("Unauthorized");
    }
    if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") {
      throw new Error("BLOB_READ_WRITE_TOKEN not configured");
    }

    // decode base64 → buffer
    const matches = data.base64.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid image data");
    const mimeType = matches[1];
    if (!["image/png", "image/jpeg"].includes(mimeType)) {
      throw new Error("Only PNG and JPG files are allowed");
    }

    const buffer = Buffer.from(matches[2], "base64");
    if (buffer.byteLength > 5 * 1024 * 1024) {
      throw new Error("File exceeds 5 MB limit");
    }

    const ext = mimeType === "image/png" ? "png" : "jpg";
    const blobName = `portfolio/${Date.now()}-${data.filename.replace(/[^a-z0-9.]/gi, "_")}.${ext}`;
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
      tag: data.tag,
      uploadedAt: new Date().toISOString(),
      isDynamic: true,
    };
    await writeMetadata([...existing, newItem]);
    return newItem;
  });

/** PATCH — edit caption/tag of an existing item */
export const updatePortfolioItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      id: z.string(),
      caption: z.string().max(120),
      tag: z.string().max(60),
    })
  )
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    const items = await readMetadata();
    const updated = items.map((it) =>
      it.id === data.id ? { ...it, caption: data.caption, tag: data.tag } : it
    );
    await writeMetadata(updated);
    return { ok: true };
  });

/** DELETE — remove image from blob + metadata */
export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), id: z.string(), url: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) throw new Error("Unauthorized");
    try {
      await del(data.url, { token: BLOB_TOKEN });
    } catch {
      // if blob already gone, continue
    }
    const items = await readMetadata();
    await writeMetadata(items.filter((it) => it.id !== data.id));
    return { ok: true };
  });
