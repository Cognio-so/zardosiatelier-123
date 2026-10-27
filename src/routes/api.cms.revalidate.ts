import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { expireBlogCache } from "@/lib/emdash-blog.server";

const payloadSchema = z.object({
  version: z.literal(1),
  siteId: z.literal("zardosiatelier"),
  eventId: z.string().uuid(),
  type: z.enum(["publish", "unpublish", "delete"]),
  contentId: z.string().min(1).max(200),
  timestamp: z.number().int().positive(),
});
const MAX_BODY_BYTES = 16_384;

async function readBoundedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) return body + decoder.decode();
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    body += decoder.decode(value, { stream: true });
  }
}

function hexToBytes(value: string): Uint8Array | null {
  if (!/^[a-f0-9]{64}$/i.test(value)) return null;
  return new Uint8Array(value.match(/.{2}/g)!.map((byte) => Number.parseInt(byte, 16)));
}

function equalBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left[index] ^ right[index];
  return mismatch === 0;
}

async function expectedSignature(secret: string, value: string): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export const Route = createFileRoute("/api/cms/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const length = Number(request.headers.get("content-length") || "0");
        if (length > MAX_BODY_BYTES) return new Response("Payload too large", { status: 413 });

        const timestamp = request.headers.get("x-emdash-timestamp") || "";
        const suppliedHeader = request.headers.get("x-emdash-signature") || "";
        const supplied = hexToBytes(suppliedHeader.replace(/^sha256=/, ""));
        const secret = process.env.REVALIDATE_HMAC_SECRET || "";
        const rawBody = await readBoundedBody(request);
        const timestampNumber = Number(timestamp);

        if (rawBody === null) return new Response("Payload too large", { status: 413 });

        if (!secret || !supplied || !Number.isInteger(timestampNumber)) {
          return new Response("Unauthorized", { status: 401 });
        }
        if (Math.abs(Math.floor(Date.now() / 1000) - timestampNumber) > 300) {
          return new Response("Expired", { status: 401 });
        }

        const expected = await expectedSignature(secret, `${timestamp}.${rawBody}`);
        if (!equalBytes(supplied, expected)) return new Response("Unauthorized", { status: 401 });

        let payload: unknown;
        try {
          payload = JSON.parse(rawBody);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const parsed = payloadSchema.safeParse(payload);
        if (!parsed.success || parsed.data.timestamp !== timestampNumber) {
          return new Response("Invalid payload", { status: 400 });
        }

        await expireBlogCache();
        return Response.json(
          { ok: true, eventId: parsed.data.eventId },
          { headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
