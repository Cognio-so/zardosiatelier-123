import type { APIRoute } from "astro";
import { getEmDashEntry } from "emdash";

const SITE_ID = "zardosiatelier";
const COLLECTION = "posts";
const PUBLIC_ORIGIN = "https://www.zardosiatelier.com";

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function encodePayload(value: object): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(value)));
}

async function sign(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(
    new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))),
  );
}

export const GET: APIRoute = async ({ params }) => {
  const id = params.id || "";
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) return new Response("Not found", { status: 404 });

  const { entry, isPreview, error } = await getEmDashEntry(COLLECTION, id);
  if (error) return new Response("Preview unavailable", { status: 503 });
  if (!entry || !isPreview) return new Response("Not found", { status: 404 });

  const secret = process.env.PREVIEW_HANDOFF_SECRET || "";
  const configuredOrigin = new URL(process.env.PUBLIC_SITE_URL || PUBLIC_ORIGIN).origin;
  if (secret.length < 32 || configuredOrigin !== PUBLIC_ORIGIN) {
    return new Response("Preview is not configured", { status: 503 });
  }

  const contentId = typeof entry.data.id === "string" ? entry.data.id : id;
  if (contentId !== id) return new Response("Not found", { status: 404 });

  const now = Math.floor(Date.now() / 1000);
  const encoded = encodePayload({
    v: 1,
    purpose: "preview-handoff",
    siteId: SITE_ID,
    collection: COLLECTION,
    contentId,
    aud: PUBLIC_ORIGIN,
    iat: now,
    exp: now + 60,
  });
  const signature = await sign(`handoff.${encoded}`, secret);
  const destination = new URL("/api/cms/preview", PUBLIC_ORIGIN);
  destination.searchParams.set("token", `${encoded}.${signature}`);

  return new Response(null, {
    status: 303,
    headers: {
      location: destination.toString(),
      "cache-control": "private, no-store, max-age=0",
      "referrer-policy": "no-referrer",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
};
