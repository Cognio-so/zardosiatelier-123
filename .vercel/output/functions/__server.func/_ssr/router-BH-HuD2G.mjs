import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-CROE9nZq.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-ivory px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Error 404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-serif text-6xl text-ink", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-ink-soft", children: "The page you are looking for has been moved or no longer exists." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-10 inline-block border border-ink/20 px-10 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-ivory",
        children: "Return Home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-ivory px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Something Interrupted" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-serif text-4xl text-ink", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-ink-soft", children: "Please refresh or return to the homepage." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "border border-ink bg-ink px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-gold hover:border-gold",
          children: "Try Again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "border border-ink/20 px-8 py-3 text-[10px] uppercase tracking-[0.3em] text-ink transition-colors hover:bg-ink hover:text-ivory",
          children: "Go Home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Zardosi Atelier" },
      {
        name: "description",
        content: "A luxury hand embroidery and couture manufacturing atelier serving global fashion houses. Sampling to production-scale execution."
      },
      { name: "author", content: "Zardosi Atelier" },
      { property: "og:site_name", content: "Zardosi Atelier" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Zardosi Atelier" },
      { name: "twitter:title", content: "Zardosi Atelier" },
      {
        name: "description",
        content: "Couture Craft Studio is a premium website for luxury fashion and embroidery services."
      },
      {
        property: "og:description",
        content: "Couture Craft Studio is a premium website for luxury fashion and embroidery services."
      },
      {
        name: "twitter:description",
        content: "Couture Craft Studio is a premium website for luxury fashion and embroidery services."
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3007cb1-89fc-4da7-b947-1eacdc1ff1fc/id-preview-2c9e4ba7--e2873867-03ab-488d-ab3a-e57e0ef13fa5.lovable.app-1781076229698.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d3007cb1-89fc-4da7-b947-1eacdc1ff1fc/id-preview-2c9e4ba7--e2873867-03ab-488d-ab3a-e57e0ef13fa5.lovable.app-1781076229698.png"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const gown = "/assets/collection-gown-YftNhQUh.jpg";
const $$splitComponentImporter$6 = () => import("./services-uOwSr2YC.mjs");
const Route$6 = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services — Couture Embroidery & Manufacturing | Zardosi Atelier"
    }, {
      name: "description",
      content: "Couture embroidery sampling, hand-embroidered production, embellished panels and luxury handbag treatments for global fashion houses."
    }, {
      property: "og:title",
      content: "Services — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "Couture embroidery sampling and production for luxury fashion brands."
    }, {
      property: "og:url",
      content: "/services"
    }, {
      property: "og:image",
      content: gown
    }],
    links: [{
      rel: "canonical",
      href: "/services"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const aari = "/assets/technique-aari-EUT4_alR.jpg";
const $$splitComponentImporter$5 = () => import("./process-fkWxHqmk.mjs");
const Route$5 = createFileRoute("/process")({
  head: () => ({
    meta: [{
      title: "Process — From Design to Delivery | Zardosi Atelier"
    }, {
      name: "description",
      content: "Our six-step embroidery process: design share, technical review, sampling, approval, production, and global delivery."
    }, {
      property: "og:title",
      content: "Process — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "How we partner from design share to global delivery."
    }, {
      property: "og:url",
      content: "/process"
    }, {
      property: "og:image",
      content: aari
    }],
    links: [{
      rel: "canonical",
      href: "/process"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const p1 = "/assets/portfolio-1-XWfcmS_y.jpg";
const $$splitComponentImporter$4 = () => import("./portfolio-DyBcnuto.mjs");
const Route$4 = createFileRoute("/portfolio")({
  head: () => ({
    meta: [{
      title: "Portfolio — Couture Embroidery Archive | Zardosi Atelier"
    }, {
      name: "description",
      content: "Selected couture embroidery work for global fashion houses — bridal, eveningwear, accessories."
    }, {
      property: "og:title",
      content: "Portfolio — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "A curated archive of luxury hand embroidery work."
    }, {
      property: "og:url",
      content: "/portfolio"
    }, {
      property: "og:image",
      content: p1
    }],
    links: [{
      rel: "canonical",
      href: "/portfolio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./industries-DJ-ohFCo.mjs");
const Route$3 = createFileRoute("/industries")({
  head: () => ({
    meta: [{
      title: "Category — Who We Serve | Zardosi Atelier"
    }, {
      name: "description",
      content: "Couture houses, bridal labels, designer menswear, accessory brands — the categories our atelier serves."
    }, {
      property: "og:title",
      content: "Category — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "Categories served by our luxury embroidery atelier."
    }, {
      property: "og:url",
      content: "/industries"
    }, {
      property: "og:image",
      content: gown
    }],
    links: [{
      rel: "canonical",
      href: "/industries"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const hero$1 = "/assets/portfolio-6-CUfHrlfE.jpg";
const $$splitComponentImporter$2 = () => import("./contact-DoZieky6.mjs");
const Route$2 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Request a Quote | Zardosi Atelier"
    }, {
      name: "description",
      content: "Request a quote or book a consultation with our embroidery atelier — response within two working days."
    }, {
      property: "og:title",
      content: "Contact — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "Begin a project with our embroidery atelier."
    }, {
      property: "og:url",
      content: "/contact"
    }, {
      property: "og:image",
      content: hero$1
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const hero = "/assets/portfolio-5-CPKVz6px.jpg";
const $$splitComponentImporter$1 = () => import("./about-CJ_xKzcr.mjs");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — The Atelier | Zardosi Atelier"
    }, {
      name: "description",
      content: "Zardosi Atelier is a luxury embroidery atelier built on multi-generational craftsmanship — serving global fashion houses."
    }, {
      property: "og:title",
      content: "About — Zardosi Atelier"
    }, {
      property: "og:description",
      content: "A luxury embroidery atelier serving global fashion houses."
    }, {
      property: "og:url",
      content: "/about"
    }, {
      property: "og:image",
      content: hero
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const heroEmbroidery = "/assets/hero-embroidery-C-OVl8oc.jpg";
const $$splitComponentImporter = () => import("./index-BarSFCZQ.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Zardosi Atelier - Luxury Hand Embroidery & Export Atelier"
    }, {
      name: "description",
      content: "Zardosi Atelier creates couture-grade hand embroidery, zardosi, crystal work and beadwork for luxury brands, couture designers and bridal houses."
    }, {
      property: "og:title",
      content: "Zardosi Atelier - Luxury Hand Embroidery"
    }, {
      property: "og:description",
      content: "Hand embroidery for the world's finest labels - from sampling to production and global delivery."
    }, {
      property: "og:url",
      content: "/"
    }, {
      property: "og:image",
      content: heroEmbroidery
    }, {
      property: "twitter:image",
      content: heroEmbroidery
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ServicesRoute = Route$6.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$7
});
const ProcessRoute = Route$5.update({
  id: "/process",
  path: "/process",
  getParentRoute: () => Route$7
});
const PortfolioRoute = Route$4.update({
  id: "/portfolio",
  path: "/portfolio",
  getParentRoute: () => Route$7
});
const IndustriesRoute = Route$3.update({
  id: "/industries",
  path: "/industries",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  ContactRoute,
  IndustriesRoute,
  PortfolioRoute,
  ProcessRoute,
  ServicesRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  aari as a,
  hero$1 as b,
  hero as c,
  gown as g,
  heroEmbroidery as h,
  p1 as p,
  router as r
};
