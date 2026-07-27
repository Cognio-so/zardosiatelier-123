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

const siteUrl = "https://www.zardosiatelier.com";
const shareImage = `${siteUrl}/social-share.png`;
const favicon = `${siteUrl}/favicon.png`;
const appleTouchIcon = `${siteUrl}/apple-touch-icon.png`;

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
      { title: "Zardosi Atelier | Luxury Hand Embroidery" },
      {
        name: "description",
        content:
          "Luxury hand embroidery and couture manufacturing by Zardosi Atelier for global fashion houses, designers, and premium brands.",
      },
      { name: "author", content: "Zardosi Atelier" },
      { name: "robots", content: "index,follow" },
      { property: "og:site_name", content: "Zardosi Atelier" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Zardosi Atelier | Luxury Hand Embroidery" },
      {
        property: "og:description",
        content:
          "Luxury hand embroidery and couture manufacturing by Zardosi Atelier for global fashion houses, designers, and premium brands.",
      },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: shareImage },
      { property: "og:image:secure_url", content: shareImage },
      { property: "og:image:alt", content: "Zardosi Atelier logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Zardosi Atelier | Luxury Hand Embroidery" },
      {
        name: "twitter:description",
        content:
          "Luxury hand embroidery and couture manufacturing by Zardosi Atelier for global fashion houses, designers, and premium brands.",
      },
      { name: "twitter:image", content: shareImage },
      { name: "twitter:image:alt", content: "Zardosi Atelier logo" },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "icon", type: "image/png", href: favicon },
      { rel: "shortcut icon", href: favicon },
      { rel: "apple-touch-icon", href: appleTouchIcon },
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

