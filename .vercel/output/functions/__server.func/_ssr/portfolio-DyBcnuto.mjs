import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero, C as CTABand } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { p as p1, g as gown, b as hero$1, c as hero, a as aari } from "./router-BH-HuD2G.mjs";
import { p as p2 } from "./portfolio-2-DFWNxYN2.mjs";
import { b as bridal, h as handbag } from "./collection-handbag-DmQS_8m7.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const p3 = "/assets/portfolio-3-DMChIzeU.jpg";
const p4 = "/assets/portfolio-4-Cci3KUrA.jpg";
const items = [{
  src: p1,
  tag: "Couture · Zardosi",
  caption: "Embroidered Evening Cape"
}, {
  src: gown,
  tag: "Couture · Gold Thread",
  caption: "La Sérénade Gown"
}, {
  src: p4,
  tag: "Bridal · Lace Border",
  caption: "Lace-Bordered Bridal Veil"
}, {
  src: bridal,
  tag: "Bridal · Crystal",
  caption: "Veil of Pearls Bodice"
}, {
  src: hero$1,
  tag: "Couture · 3D Florals",
  caption: "Cascading Petal Skirt"
}, {
  src: hero,
  tag: "Atelier · Process",
  caption: "Hand-set Gold Thread Study"
}, {
  src: p3,
  tag: "Accessory · Crystal",
  caption: "All-Over Crystal Minaudière"
}, {
  src: handbag,
  tag: "Accessory · Bead",
  caption: "Petit Bijou Handbag"
}, {
  src: p2,
  tag: "Menswear · Tonal",
  caption: "Tonal Lapel Detail"
}, {
  src: aari,
  tag: "Technique · Aari",
  caption: "Fine Aari Motif Study"
}];
function PortfolioPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Atelier · Archive", title: "Selected", italic: "work.", description: "A curated archive of recent commissions — couture, bridal, accessories and atelier studies.", image: p1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-5 sm:columns-2 lg:columns-3", children: items.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 100, className: "mb-6 break-inside-avoid", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative cursor-pointer overflow-hidden border border-gold/20 bg-[#FAF7F2]", "data-preview-image": p.src, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.src, alt: p.caption, loading: "lazy", decoding: "async", className: "w-full h-auto object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.05]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end bg-gradient-to-t from-ink/86 via-ink/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.22em] text-gold-soft", children: p.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-2 font-serif text-3xl leading-tight text-ivory", children: p.caption })
      ] }) })
    ] }) }, i)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABand, {})
  ] });
}
export {
  PortfolioPage as component
};
