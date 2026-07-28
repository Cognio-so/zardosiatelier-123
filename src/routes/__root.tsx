import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteMetadata } from "@/components/site/SiteMetadata";
import { SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE, SITE_URL } from "@/lib/seo";

const siteUrl = SITE_URL;
const brandImage = `${siteUrl}/icon-512.png`;
const favicon = "/favicon.ico";
const iconPng = "/icon.png";
const appleTouchIcon = "/apple-touch-icon.png";
const manifest = "/manifest.webmanifest";
const maskIcon = "/mask-icon.svg";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zardosi Atelier",
  description: SEO_DESCRIPTION,
  url: siteUrl,
  logo: brandImage,
  image: brandImage,
  sameAs: ["https://www.instagram.com/reel/DaUjL2Mp4qF/?igsh=amUyNnNnbWJudzQz"],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <span className="eyebrow">Error 404</span>
        <h1 className="mt-6 font-serif text-6xl text-ink">Page not found</h1>
        <p className="mt-4 text-sm text-ink-soft">
          The page you are looking for has been moved or no longer exists.
        </p>
        <Link
          to="/"
          className="mt-10 inline-block border border-ink/20 px-10 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="max-w-md text-center">
        <span className="eyebrow">Something Interrupted</span>
        <h1 className="mt-6 font-serif text-4xl text-ink">This page didn't load</h1>
        <p className="mt-4 text-sm text-ink-soft">Please refresh or return to the homepage.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-ink bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-gold hover:border-gold"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-ink/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESCRIPTION },
      { name: "keywords", content: SEO_KEYWORDS.join(", ") },
      { name: "author", content: "Zardosi Atelier" },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#1A100B" },
      { name: "application-name", content: "Zardosi Atelier" },
      { property: "og:site_name", content: "Zardosi Atelier" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESCRIPTION },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: "https://www.zardosiatelier.com/icon-512.png" },
      { property: "og:image:secure_url", content: brandImage },
      { property: "og:image:alt", content: "Zardosi Atelier logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESCRIPTION },
      { name: "twitter:image", content: brandImage },
      { name: "twitter:image:alt", content: "Zardosi Atelier logo" },
    ],
    links: [
      { rel: "icon", href: favicon, sizes: "any" },
      { rel: "shortcut icon", href: favicon },
      { rel: "icon", type: "image/png", sizes: "512x512", href: iconPng },
      { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon },
      { rel: "manifest", href: manifest },
      { rel: "mask-icon", href: maskIcon, color: "#1A100B" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      {
        rel: "preload",
        href: "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteMetadata />
      <Outlet />
    </QueryClientProvider>
  );
}









