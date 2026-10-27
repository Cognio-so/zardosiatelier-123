import { createServerFn } from "@tanstack/react-start";
import { getCookie, setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { getPreviewPostInternal } from "@/lib/emdash-blog.server";

export const PREVIEW_COOKIE = "__Host-zardosi_preview";
const SITE_ID = "zardosiatelier";
const COLLECTION = "posts";
const DEFAULT_PUBLIC_ORIGIN = "https://www.zardosiatelier.com";
const SESSION_TTL_SECONDS = 15 * 60;

const handoffSchema = z
  .object({
    v: z.literal(1),
    purpose: z.literal("preview-handoff"),
    siteId: z.literal(SITE_ID),
    collection: z.literal(COLLECTION),
    contentId: z.string().min(1).max(128),
    aud: z.string().url(),
    iat: z.number().int().positive(),
    exp: z.number().int().positive(),
  })
  .strict();

const sessionSchema = z
  .object({
    v: z.literal(1),
    purpose: z.literal("preview-session"),
    siteId: z.literal(SITE_ID),
    collection: z.literal(COLLECTION),
    contentId: z.string().min(1).max(128),
    iat: z.number().int().positive(),
    exp: z.number().int().positive(),
  })
  .strict();

function previewSecret(): string {
  const secret = process.env.PREVIEW_HANDOFF_SECRET || "";
  if (secret.length < 32) throw new Error("PREVIEW_HANDOFF_SECRET is not configured");
  return secret;
}

function publicOrigin(): string {
  const raw = process.env.PUBLIC_SITE_URL || process.env.WEBSITE_URL || DEFAULT_PUBLIC_ORIGIN;
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:") throw new Error("PUBLIC_SITE_URL must use HTTPS");
  return parsed.origin;
}

function encode(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}

async function signature(purpose: string, encodedPayload: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(previewSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(`${purpose}.${encodedPayload}`)),
  );
}

async function verifyToken(token: string, purpose: string): Promise<unknown> {
  if (token.length > 4096) throw new Error("Preview token is too large");
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) throw new Error("Malformed preview token");
  const expected = await signature(purpose, parts[0]);
  let supplied: Uint8Array;
  try {
    supplied = new Uint8Array(Buffer.from(parts[1], "base64url"));
  } catch {
    throw new Error("Malformed preview signature");
  }
  if (!constantTimeEqual(expected, supplied)) throw new Error("Invalid preview signature");
  return JSON.parse(decode(parts[0]));
}

async function signPayload(value: object, purpose: string): Promise<string> {
  const payload = encode(JSON.stringify(value));
  const signed = await signature(purpose, payload);
  return `${payload}.${Buffer.from(signed).toString("base64url")}`;
}

export async function consumePreviewHandoff(token: string): Promise<string> {
  const parsed = handoffSchema.parse(await verifyToken(token, "handoff"));
  const now = Math.floor(Date.now() / 1000);
  if (parsed.aud !== publicOrigin() || parsed.exp < now || parsed.iat > now + 30) {
    throw new Error("Expired or misdirected preview token");
  }
  if (parsed.exp - parsed.iat > 60) throw new Error("Preview token lifetime is too long");
  return parsed.contentId;
}

export async function createPreviewSession(contentId: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return signPayload(
    {
      v: 1,
      purpose: "preview-session",
      siteId: SITE_ID,
      collection: COLLECTION,
      contentId,
      iat: now,
      exp: now + SESSION_TTL_SECONDS,
    },
    "session",
  );
}

async function validatePreviewSession(token: string, contentId: string): Promise<boolean> {
  try {
    const parsed = sessionSchema.parse(await verifyToken(token, "session"));
    const now = Math.floor(Date.now() / 1000);
    return parsed.contentId === contentId && parsed.exp >= now && parsed.iat <= now + 30;
  } catch {
    return false;
  }
}

export const getPreviewPost = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().min(1).max(128) }))
  .handler(async ({ data }) => {
    setResponseHeader("cache-control", "private, no-store, max-age=0");
    setResponseHeader("referrer-policy", "no-referrer");
    const session = getCookie(PREVIEW_COOKIE) || "";
    if (!(await validatePreviewSession(session, data.id))) {
      return { status: "unauthorized" as const, post: null, stale: false };
    }
    return getPreviewPostInternal(data.id);
  });
