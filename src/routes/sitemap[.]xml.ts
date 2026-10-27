import { createFileRoute } from "@tanstack/react-router";
import { getSitemapPostsInternal } from "@/lib/emdash-blog.server";

const SITE = "https://www.zardosiatelier.com";
const staticPaths = [
  "",
  "/about",
  "/portfolio",
  "/zardozi",
  "/sequin",
  "/crystal-stone",
  "/resham-zari",
  "/pearl-work",
  "/industries",
  "/process",
  "/contact",
  "/blog",
];

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character]!,
  );
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const result = await getSitemapPostsInternal();
        if (result.status === "unavailable" || result.status === "unconfigured") {
          return new Response("Sitemap temporarily unavailable", {
            status: 503,
            headers: { "cache-control": "no-store" },
          });
        }
        const urls = [
          ...staticPaths.map((path) => ({ loc: `${SITE}${path}`, lastmod: undefined })),
          ...result.posts.map((post) => ({
            loc: `${SITE}/blog/${post.slug}`,
            lastmod: post.updatedAt || post.publishedAt || undefined,
          })),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map(
            ({ loc, lastmod }) =>
              `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ""}</url>`,
          )
          .join("\n")}\n</urlset>`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
            "vercel-cache-tag": "cms:zardosiatelier",
          },
        });
      },
    },
  },
});
