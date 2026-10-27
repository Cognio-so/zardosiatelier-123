import { createFileRoute } from "@tanstack/react-router";
import { PREVIEW_COOKIE } from "@/lib/emdash-preview.server";

function closePreview() {
  return new Response(null, {
    status: 303,
    headers: {
      location: "/blog",
      "set-cookie": `${PREVIEW_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
      "cache-control": "private, no-store, max-age=0",
      "referrer-policy": "no-referrer",
    },
  });
}

export const Route = createFileRoute("/api/cms/preview/exit")({
  server: {
    handlers: {
      GET: closePreview,
      POST: closePreview,
    },
  },
});
