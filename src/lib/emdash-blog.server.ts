import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { getCache } from "@vercel/functions";
import { z } from "zod";

const SITE_ID = "zardosiatelier";
const DEFAULT_CMS_ORIGIN = "https://cms.zardosiatelier.com";
const CACHE_TAG = `cms:${SITE_ID}`;
const CACHE_TTL_SECONDS = 300;
const STALE_TTL_SECONDS = 3600;

export type PortableTextSpan = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: Array<Record<string, JsonValue>>;
  code?: string;
  language?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  asset?: { _ref?: string; url?: string; provider?: string };
  rows?: Array<{
    _key?: string;
    cells?: Array<{
      _key?: string;
      content?: PortableTextSpan[];
      markDefs?: Array<Record<string, JsonValue>>;
      isHeader?: boolean;
      colspan?: number;
      rowspan?: number;
    }>;
  }>;
};

export type BlogImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: PortableTextBlock[];
  image?: BlogImage;
  author: string;
  publishedAt: string | null;
  updatedAt: string;
  seo: {
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    noIndex: boolean;
  };
};

export type BlogIndexResult = {
  status: "ok" | "unconfigured" | "unavailable";
  posts: BlogPost[];
  nextCursor?: string;
  total?: number;
  stale: boolean;
};

export type BlogPostResult = {
  status: "ok" | "not-found" | "unconfigured" | "unavailable";
  post: BlogPost | null;
  stale: boolean;
};

type ApiItem = {
  id?: unknown;
  slug?: unknown;
  status?: unknown;
  data?: unknown;
  byline?: unknown;
  bylines?: unknown;
  publishedAt?: unknown;
  updatedAt?: unknown;
  seo?: unknown;
};

type ApiMediaItem = {
  id?: unknown;
  mimeType?: unknown;
  status?: unknown;
  contentHash?: unknown;
  alt?: unknown;
  width?: unknown;
  height?: unknown;
};

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: { code?: string; message?: string };
};

class CmsNotFoundError extends Error {}

function cmsConfig() {
  const origin = (process.env.CMS_ORIGIN || DEFAULT_CMS_ORIGIN).replace(/\/$/, "");
  const token = process.env.CMS_READ_TOKEN || "";
  const parsed = new URL(origin);
  if (!["https:", "http:"].includes(parsed.protocol)) throw new Error("CMS_ORIGIN must be HTTP(S)");
  return { origin: parsed.origin, token };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function numberValue(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

async function mediaUrl(value: unknown, cmsOrigin: string): Promise<BlogImage | undefined> {
  if (!isRecord(value)) return undefined;
  const id = stringValue(value.id);
  if (!id) return undefined;

  try {
    const response = await cmsRequest<{ item?: ApiMediaItem }>(
      `/_emdash/api/media/${encodeURIComponent(id)}`,
    );
    const media = response.item;
    const mimeType = stringValue(media?.mimeType);
    const version = stringValue(media?.contentHash);
    if (!media || media.status !== "ready" || !mimeType.startsWith("image/") || !version) {
      return undefined;
    }

    const query = new URLSearchParams({ id, v: version });
    return {
      src: `${cmsOrigin}/_emdash/api/plugins/zardosi-next-bridge/media?${query}`,
      alt: stringValue(value.alt) || stringValue(media.alt) || "Zardosi Atelier editorial image",
      width: numberValue(value.width) || numberValue(media.width),
      height: numberValue(value.height) || numberValue(media.height),
    };
  } catch (error) {
    console.error(`Em Dash media ${id} is unavailable`, error);
    return undefined;
  }
}

async function resolvePortableMedia(
  blocks: PortableTextBlock[],
  cmsOrigin: string,
): Promise<PortableTextBlock[]> {
  return Promise.all(
    blocks.map(async (block) => {
      if (block._type !== "image" || !isRecord(block.asset)) return block;
      const id = stringValue(block.asset._ref);
      if (!id) return block;
      const image = await mediaUrl(
        {
          id,
          alt: block.alt,
          width: block.width,
          height: block.height,
        },
        cmsOrigin,
      );
      if (!image) return block;
      return {
        ...block,
        alt: image.alt,
        width: image.width,
        height: image.height,
        asset: { ...block.asset, url: image.src },
      };
    }),
  );
}

async function mapPost(
  item: ApiItem,
  cmsOrigin: string,
  requirePublished = true,
): Promise<BlogPost | null> {
  if (!isRecord(item.data)) return null;
  const slug = stringValue(item.slug);
  const title = stringValue(item.data.title);
  if (!slug || !title || (requirePublished && item.status !== "published")) return null;

  const byline = isRecord(item.byline) ? stringValue(item.byline.displayName) : "";
  const firstCredit =
    Array.isArray(item.bylines) && isRecord(item.bylines[0]) ? item.bylines[0] : undefined;
  const creditedByline =
    firstCredit && isRecord(firstCredit.byline) ? stringValue(firstCredit.byline.displayName) : "";
  const seo = isRecord(item.seo) ? item.seo : {};
  const image = await mediaUrl(item.data.featured_image, cmsOrigin);
  const rawContent = Array.isArray(item.data.content)
    ? (item.data.content as PortableTextBlock[])
    : [];
  const content = await resolvePortableMedia(rawContent, cmsOrigin);
  const rawSeoImage = stringValue(seo.image);
  const seoImage =
    /^https?:\/\//i.test(rawSeoImage) && !rawSeoImage.startsWith(cmsOrigin)
      ? rawSeoImage
      : undefined;

  return {
    id: stringValue(item.id, slug),
    slug,
    title,
    excerpt: stringValue(item.data.excerpt),
    content,
    image,
    author: byline || creditedByline || "Zardosi Atelier",
    publishedAt: typeof item.publishedAt === "string" ? item.publishedAt : null,
    updatedAt: stringValue(item.updatedAt, stringValue(item.publishedAt)),
    seo: {
      title: stringValue(seo.title) || undefined,
      description: stringValue(seo.description) || undefined,
      canonical: stringValue(seo.canonical) || undefined,
      image: seoImage,
      noIndex: seo.noIndex === true,
    },
  };
}

async function cmsRequest<T>(path: string, tokenOverride?: string): Promise<T> {
  const { origin, token: configuredToken } = cmsConfig();
  const token = tokenOverride || configuredToken;
  if (!token) throw new Error("CMS_READ_TOKEN is not configured");

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${origin}${path}`, {
        headers: { authorization: `Bearer ${token}`, accept: "application/json" },
        signal: AbortSignal.timeout(7000),
      });
      const body = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;
      if (response.status === 404) throw new CmsNotFoundError("Content not found");
      if (!response.ok || body.success !== true || body.data === undefined) {
        throw new Error(body.error?.message || `Em Dash returned HTTP ${response.status}`);
      }
      return body.data;
    } catch (error) {
      if (error instanceof CmsNotFoundError) throw error;
      lastError = error;
      if (attempt === 0) continue;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Em Dash request failed");
}

async function cached<T>(
  key: string,
  load: () => Promise<T>,
): Promise<{ value: T; stale: boolean }> {
  let cache: ReturnType<typeof getCache> | undefined;
  try {
    cache = getCache({ namespace: "emdash" });
    const hit = (await cache.get(key)) as T | undefined;
    if (hit !== undefined) return { value: hit, stale: false };
  } catch {
    cache = undefined;
  }

  try {
    const value = await load();
    if (cache) {
      await Promise.all([
        cache.set(key, value, { ttl: CACHE_TTL_SECONDS, tags: [CACHE_TAG], name: key }),
        cache.set(`stale:${key}`, value, {
          ttl: STALE_TTL_SECONDS,
          tags: [CACHE_TAG],
          name: `${key}-stale`,
        }),
      ]).catch(() => undefined);
    }
    return { value, stale: false };
  } catch (error) {
    if (cache) {
      const stale = (await cache.get(`stale:${key}`).catch(() => undefined)) as T | undefined;
      if (stale !== undefined) return { value: stale, stale: true };
    }
    throw error;
  }
}

export async function listPublishedPostsInternal(page = 1): Promise<BlogIndexResult> {
  const { origin, token } = cmsConfig();
  if (!token) return { status: "unconfigured", posts: [], stale: false };

  try {
    const result = await cached(`posts:list:${page}`, async () => {
      const query = new URLSearchParams({
        status: "published",
        limit: "24",
        page: String(page),
        orderBy: "publishedAt",
        order: "desc",
      });
      const data = await cmsRequest<{ items?: ApiItem[]; nextCursor?: string; total?: number }>(
        `/_emdash/api/content/posts?${query}`,
      );
      return {
        posts: (await Promise.all((data.items || []).map((item) => mapPost(item, origin)))).filter(
          Boolean,
        ) as BlogPost[],
        nextCursor: data.nextCursor,
        total: numberValue(data.total),
      };
    });
    return { status: "ok", ...result.value, stale: result.stale };
  } catch (error) {
    console.error("Em Dash blog list unavailable", error);
    return { status: "unavailable", posts: [], stale: false };
  }
}

export async function getSitemapPostsInternal(): Promise<BlogIndexResult> {
  const posts: BlogPost[] = [];
  let stale = false;

  for (let page = 1; page <= 1000; page += 1) {
    const result = await listPublishedPostsInternal(page);
    if (result.status !== "ok") return { ...result, posts: [] };
    posts.push(...result.posts);
    stale ||= result.stale;
    if (result.posts.length === 0 || (result.total !== undefined && posts.length >= result.total)) {
      return { status: "ok", posts, total: result.total, stale };
    }
  }

  return { status: "unavailable", posts: [], stale: false };
}

export async function getPublishedPostInternal(slug: string): Promise<BlogPostResult> {
  const { origin, token } = cmsConfig();
  if (!token) return { status: "unconfigured", post: null, stale: false };

  try {
    const result = await cached(`posts:item:${slug}`, async () => {
      const data = await cmsRequest<{ item?: ApiItem }>(
        `/_emdash/api/content/posts/${encodeURIComponent(slug)}`,
      );
      return data.item ? await mapPost(data.item, origin) : null;
    });
    return {
      status: result.value ? "ok" : "not-found",
      post: result.value,
      stale: result.stale,
    };
  } catch (error) {
    if (error instanceof CmsNotFoundError) {
      return { status: "not-found", post: null, stale: false };
    }
    console.error("Em Dash blog post unavailable", error);
    return { status: "unavailable", post: null, stale: false };
  }
}

export async function getPreviewPostInternal(id: string): Promise<BlogPostResult> {
  const { origin } = cmsConfig();
  const token = process.env.CMS_PREVIEW_READ_TOKEN || "";
  if (!token) return { status: "unconfigured", post: null, stale: false };

  try {
    const data = await cmsRequest<{ item?: ApiItem }>(
      `/_emdash/api/content/posts/${encodeURIComponent(id)}`,
      token,
    );
    const post = data.item ? await mapPost(data.item, origin, false) : null;
    return { status: post ? "ok" : "not-found", post, stale: false };
  } catch (error) {
    if (error instanceof CmsNotFoundError) {
      return { status: "not-found", post: null, stale: false };
    }
    console.error("Em Dash preview unavailable", error);
    return { status: "unavailable", post: null, stale: false };
  }
}

export async function expireBlogCache(): Promise<void> {
  await getCache({ namespace: "emdash" }).expireTag(CACHE_TAG);
}

export const listPublishedPosts = createServerFn({ method: "GET" })
  .validator(z.object({ page: z.number().int().min(1).max(1000).default(1) }))
  .handler(async ({ data }) => {
    const result = await listPublishedPostsInternal(data.page);
    if (result.status === "unavailable" || result.status === "unconfigured") {
      setResponseStatus(503);
    }
    return result;
  });

export const getPublishedPost = createServerFn({ method: "GET" })
  .validator(
    z.object({
      slug: z
        .string()
        .min(1)
        .max(200)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    }),
  )
  .handler(async ({ data }) => {
    const result = await getPublishedPostInternal(data.slug);
    if (result.status === "unavailable" || result.status === "unconfigured") {
      setResponseStatus(503);
    }
    return result;
  });
