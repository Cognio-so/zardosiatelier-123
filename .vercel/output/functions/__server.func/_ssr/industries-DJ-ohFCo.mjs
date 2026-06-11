import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, C as CTABand } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { g as gown, b as hero$1, p as p1 } from "./router-BH-HuD2G.mjs";
import { b as bridal, h as handbag } from "./collection-handbag-DmQS_8m7.mjs";
import { p as p2 } from "./portfolio-2-DFWNxYN2.mjs";
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
const industries = [{
  label: "Haute Couture",
  desc: "Runway-grade embroidery for Paris and Milan shows, calibrated to the precise finishing standards of haute couture.",
  img: gown
}, {
  label: "Bridal Labels",
  desc: "Heritage and contemporary bridalwear ateliers specializing in zardosi, crystal and pearl embellishments.",
  img: bridal
}, {
  label: "Designer Womenswear",
  desc: "Seasonal embellishment programs for ready-to-wear collections across global fashion markets.",
  img: hero$1
}, {
  label: "Designer Menswear",
  desc: "Tonal embroidery and patch programs for fine tailoring, lapels, and occasion-wear.",
  img: p2
}, {
  label: "Luxury Accessories",
  desc: "Embellished handbags, belts, headpieces and scarves crafted for luxury retail standards.",
  img: handbag
}, {
  label: "Costume & Editorial",
  desc: "Bespoke embroidery for film, opera, theatre and high-end editorial photography projects.",
  img: p1
}];
function IndustriesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "luxury-silk-bg py-10 pt-28 sm:py-12 sm:pt-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mb-8 max-w-[1320px] px-5 sm:px-6 lg:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-serif text-4xl leading-tight text-ink sm:text-6xl", children: "Categories we serve." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-3xl text-[16px] font-medium leading-7 text-ink-soft", children: "From haute couture to designer menswear and luxury accessories, our studio partners with brands held to the highest finishing standards." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10", children: industries.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 100, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col overflow-hidden border border-[#D4AF37]/25 bg-[#FAF7F2] transition-all duration-500 group-hover:border-[#D4AF37]/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden aspect-[4/3] cursor-pointer", "data-preview-image": s.img, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: s.label, loading: "lazy", decoding: "async", className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.08]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-6 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-[0.75px] bg-[#D4AF37]/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-1 bg-[#D4AF37] rotate-45 opacity-60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-[0.75px] bg-[#D4AF37]/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-serif text-[26px] leading-tight text-[#1A1A1A]", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-[15px] font-medium leading-7 text-[#2B2722]", children: s.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#D4AF37]/55 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A672C] transition-all duration-400 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto", children: [
            "View Projects",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
          ] })
        ] })
      ] }) }, s.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABand, {})
  ] });
}
export {
  IndustriesPage as component
};
