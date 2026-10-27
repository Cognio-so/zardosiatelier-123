import { createFileRoute } from "@tanstack/react-router";
import {
  PREVIEW_COOKIE,
  consumePreviewHandoff,
  createPreviewSession,
} from "@/lib/emdash-preview.server";

const DEFAULT_PUBLIC_ORIGIN = "https://www.zardosiatelier.com";

function publicOrigin(): string {
  const raw = process.env.PUBLIC_SITE_URL || process.env.WEBSITE_URL || DEFAULT_PUBLIC_ORIGIN;
  return new URL(raw).origin;
}

export const Route = createFileRoute("/api/cms/preview")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const token = new URL(request.url).searchParams.get("token") || "";
          const contentId = await consumePreviewHandoff(token);
          const session = await createPreviewSession(contentId);
          const destination = new URL(
            `/preview/posts/${encodeURIComponent(contentId)}`,
            publicOrigin(),
          );

          return new Response(null, {
            status: 303,
            headers: {
              location: destination.toString(),
              "set-cookie": `${PREVIEW_COOKIE}=${session}; Path=/; Max-Age=900; HttpOnly; Secure; SameSite=Lax`,
              "cache-control": "private, no-store, max-age=0",
              "referrer-policy": "no-referrer",
              "x-robots-tag": "noindex, nofollow",
            },
          });
        } catch {
          return new Response("Invalid or expired preview link", {
            status: 401,
            headers: {
              "cache-control": "private, no-store, max-age=0",
              "referrer-policy": "no-referrer",
              "x-robots-tag": "noindex, nofollow",
            },
          });
        }
      },
    },
  },
});
