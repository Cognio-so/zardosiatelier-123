import {
  definePlugin,
  definePluginRoute,
  pluginResponse,
  type PluginContext,
  type PluginDescriptor,
  type PluginStorageConfig,
  type StorageCollection,
} from "emdash";

type BridgeEventType = "publish" | "unpublish" | "delete";

type OutboxRecord = {
  eventId: string;
  siteId: string;
  eventType: BridgeEventType;
  contentId: string;
  createdAt: string;
  status: "pending" | "delivered" | "dead";
  attempts: number;
  nextAttemptAt: string;
  deliveredAt?: string;
  lastError?: string;
};

const SITE_ID = "zardosiatelier";
const PUBLIC_ORIGIN = "https://www.zardosiatelier.com";
const OUTBOX_CRON = "deliver-pending-events";
const MAX_ATTEMPTS = 12;
const storage = {
  outbox: {
    indexes: ["status", "nextAttemptAt", "createdAt", ["status", "nextAttemptAt"]],
  },
} satisfies PluginStorageConfig;

const PUBLIC_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const MAX_PUBLIC_IMAGE_BYTES = 8 * 1024 * 1024;

export function nextBridgePlugin(): PluginDescriptor {
  return {
    id: "zardosi-next-bridge",
    version: "1.0.0",
    format: "native",
    entrypoint: "/src/plugins/next-bridge.ts",
  };
}

function outbox(ctx: PluginContext): StorageCollection<OutboxRecord> {
  return ctx.storage.outbox as StorageCollection<OutboxRecord>;
}

function runtimeConfig() {
  const siteId = process.env.SITE_ID || SITE_ID;
  const publicOrigin = (process.env.PUBLIC_SITE_URL || PUBLIC_ORIGIN).replace(/\/$/, "");
  const secret = process.env.REVALIDATE_HMAC_SECRET || "";
  const target = new URL("/api/cms/revalidate", publicOrigin);

  if (target.origin !== PUBLIC_ORIGIN) {
    throw new Error(`Refusing unapproved refresh origin: ${target.origin}`);
  }

  return { siteId, secret, target: target.toString() };
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sign(secret: string, value: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToHex(new Uint8Array(signature));
}

function nextAttempt(attempts: number): string {
  const delaySeconds = Math.min(3600, 30 * 2 ** Math.min(attempts, 7));
  return new Date(Date.now() + delaySeconds * 1000).toISOString();
}

async function deliver(record: OutboxRecord, ctx: PluginContext): Promise<OutboxRecord> {
  const now = new Date();
  const timestamp = Math.floor(now.getTime() / 1000).toString();
  let error = "Unknown delivery error";

  try {
    const { siteId, secret, target } = runtimeConfig();
    if (!secret) throw new Error("REVALIDATE_HMAC_SECRET is not configured");
    if (!ctx.http) throw new Error("Plugin HTTP capability is unavailable");

    const body = JSON.stringify({
      version: 1,
      siteId,
      eventId: record.eventId,
      type: record.eventType,
      contentId: record.contentId,
      timestamp: Number(timestamp),
    });
    const signature = await sign(secret, `${timestamp}.${body}`);
    const response = await ctx.http.fetch(target, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-emdash-timestamp": timestamp,
        "x-emdash-signature": `sha256=${signature}`,
      },
      body,
      signal: AbortSignal.timeout(3500),
    });

    if (!response.ok) {
      throw new Error(`Website refresh returned HTTP ${response.status}`);
    }

    return {
      ...record,
      status: "delivered",
      attempts: record.attempts + 1,
      deliveredAt: now.toISOString(),
      lastError: undefined,
    };
  } catch (caught) {
    error = caught instanceof Error ? caught.message : String(caught);
  }

  const attempts = record.attempts + 1;
  return {
    ...record,
    status: attempts >= MAX_ATTEMPTS ? "dead" : "pending",
    attempts,
    nextAttemptAt: nextAttempt(attempts),
    lastError: error.slice(0, 1000),
  };
}

async function enqueue(
  eventType: BridgeEventType,
  contentId: string,
  ctx: PluginContext,
): Promise<void> {
  const createdAt = new Date().toISOString();
  const record: OutboxRecord = {
    eventId: crypto.randomUUID(),
    siteId: SITE_ID,
    eventType,
    contentId,
    createdAt,
    status: "pending",
    attempts: 0,
    nextAttemptAt: createdAt,
  };

  await outbox(ctx).put(record.eventId, record);
  const delivered = await deliver(record, ctx);
  await outbox(ctx).put(record.eventId, delivered);
  if (delivered.status !== "delivered") {
    ctx.log.warn("Website refresh queued for retry", {
      eventId: record.eventId,
      error: delivered.lastError,
    });
  }
}

export function createPlugin() {
  return definePlugin({
    id: "zardosi-next-bridge",
    version: "1.0.0",
    capabilities: ["content:read", "media:read", "media:bytes:read", "network:request"],
    allowedHosts: ["www.zardosiatelier.com"],
    storage,
    routes: {
      media: definePluginRoute({
        public: true,
        methods: ["GET", "HEAD"],
        response: "raw",
        request: { body: "none", headers: ["if-none-match"] },
        cacheControl: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        handler: async (ctx) => {
          const url = new URL(ctx.request.url);
          const id = url.searchParams.get("id") || "";
          const version = url.searchParams.get("v") || "";
          if (!/^[A-Za-z0-9_-]{1,128}$/.test(id) || !/^[A-Za-z0-9_-]{8,128}$/.test(version)) {
            return pluginResponse({ status: 404 });
          }

          const media = await ctx.media?.get(id);
          if (!media || !PUBLIC_IMAGE_TYPES.has(media.mimeType) || !ctx.media?.readBytes) {
            return pluginResponse({ status: 404 });
          }

          const file = await ctx.media.readBytes(id, { maxBytes: MAX_PUBLIC_IMAGE_BYTES });
          if (
            !file.contentHash ||
            file.contentHash !== version ||
            !PUBLIC_IMAGE_TYPES.has(file.mimeType)
          ) {
            return pluginResponse({ status: 404 });
          }

          const etag = `"${file.contentHash}"`;
          if (ctx.request.headers.get("if-none-match") === etag) {
            return pluginResponse({ status: 304, headers: { etag } });
          }

          return pluginResponse({
            status: 200,
            headers: {
              "content-type": file.mimeType,
              "content-disposition": "inline",
              etag,
            },
            body: ctx.request.method === "HEAD" ? null : { kind: "bytes", value: file.bytes },
          });
        },
      }),
    },
    hooks: {
      "plugin:activate": async (_event, ctx) => {
        await ctx.cron?.schedule(OUTBOX_CRON, { schedule: "* * * * *" });
      },
      "content:afterPublish": {
        errorPolicy: "continue",
        timeout: 5000,
        handler: async (event, ctx) => {
          if (event.collection !== "posts") return;
          await enqueue("publish", String(event.content.id), ctx);
        },
      },
      "content:afterUnpublish": {
        errorPolicy: "continue",
        timeout: 5000,
        handler: async (event, ctx) => {
          if (event.collection !== "posts") return;
          await enqueue("unpublish", String(event.content.id), ctx);
        },
      },
      "content:afterDelete": {
        errorPolicy: "continue",
        timeout: 5000,
        handler: async (event, ctx) => {
          if (event.collection !== "posts") return;
          await enqueue("delete", event.id, ctx);
        },
      },
      cron: {
        errorPolicy: "continue",
        timeout: 50000,
        handler: async (event, ctx) => {
          if (event.name !== OUTBOX_CRON) return;
          const pending = await outbox(ctx).query({
            where: {
              status: "pending",
              nextAttemptAt: { lte: new Date().toISOString() },
            },
            orderBy: { nextAttemptAt: "asc" },
            limit: 10,
          });

          await Promise.all(
            pending.items.map(async ({ id, data }) => {
              const delivered = await deliver(data as OutboxRecord, ctx);
              await outbox(ctx).put(id, delivered);
            }),
          );
        },
      },
    },
  });
}

export default createPlugin;
