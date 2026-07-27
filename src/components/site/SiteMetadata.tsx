import { useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSeoEntries } from "@/lib/admin-data";

const siteUrl = "https://www.zardosiatelier.com";
const fallbackShareImage = `${siteUrl}/social-share.png`;

function normalizePage(pathname: string) {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/portfolio")) return "Portfolio";
  const first = pathname.split("/").filter(Boolean)[0] ?? "Home";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function SiteMetadata() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: seoEntries = [] } = useQuery({
    queryKey: ["seo-public"],
    queryFn: () => getSeoEntries(),
    staleTime: 0,
  });

  useEffect(() => {
    const page = normalizePage(pathname);
    const entry =
      seoEntries.find((seo) => seo.page.toLowerCase() === page.toLowerCase()) ??
      seoEntries.find((seo) => seo.id.toLowerCase() === page.toLowerCase());
    if (!entry) return;

    const pageUrl = pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
    const shareImage = entry.ogImage || fallbackShareImage;

    document.title = entry.metaTitle;
    upsertMeta('meta[name="description"]', "name", "description", entry.metaDescription);
    upsertMeta('meta[name="keywords"]', "name", "keywords", entry.keywords);
    upsertMeta('meta[property="og:title"]', "property", "og:title", entry.metaTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", entry.metaDescription);
    upsertMeta('meta[property="og:url"]', "property", "og:url", pageUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", shareImage);
    upsertMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", shareImage);
    upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", "Zardosi Atelier logo");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", entry.metaTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", entry.metaDescription);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", shareImage);
    upsertMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", "Zardosi Atelier logo");
    upsertMeta('meta[name="robots"]', "name", "robots", entry.robots);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = pageUrl;
  }, [pathname, seoEntries]);

  return null;
}
