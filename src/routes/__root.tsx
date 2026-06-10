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
      { title: "Zardosi Atelier" },
      {
        name: "description",
        content:
          "A luxury hand embroidery and couture manufacturing atelier serving global fashion houses. Sampling to production-scale execution.",
      },
      { name: "author", content: "Zardosi Atelier" },
      { property: "og:site_name", content: "Zardosi Atelier" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Zardosi Atelier" },
      { name: "twitter:title", content: "Zardosi Atelier" },
      {
        name: "description",
        content:
          "Couture Craft Studio is a premium website for luxury fashion and embroidery services.",
      },
      {
        property: "og:description",
        content:
          "Couture Craft Studio is a premium website for luxury fashion and embroidery services.",
      },
      {
        name: "twitter:description",
        content:
          "Couture Craft Studio is a premium website for luxury fashion and embroidery services.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3007cb1-89fc-4da7-b947-1eacdc1ff1fc/id-preview-2c9e4ba7--e2873867-03ab-488d-ab3a-e57e0ef13fa5.lovable.app-1781076229698.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3007cb1-89fc-4da7-b947-1eacdc1ff1fc/id-preview-2c9e4ba7--e2873867-03ab-488d-ab3a-e57e0ef13fa5.lovable.app-1781076229698.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap",
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
      <Outlet />
    </QueryClientProvider>
  );
}
