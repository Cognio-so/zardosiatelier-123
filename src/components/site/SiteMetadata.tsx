import { useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getSeoEntries } from "@/lib/admin-data";

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

    document.title = entry.metaTitle;
    upsertMeta('meta[name="description"]', "name", "description", entry.metaDescription);
    upsertMeta('meta[name="keywords"]', "name", "keywords", entry.keywords);
    upsertMeta('meta[property="og:title"]', "property", "og:title", entry.metaTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", entry.metaDescription);
    upsertMeta('meta[name="robots"]', "name", "robots", entry.robots);
    if (entry.ogImage) upsertMeta('meta[property="og:image"]', "property", "og:image", entry.ogImage);
  }, [pathname, seoEntries]);

  return null;
}