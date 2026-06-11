import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, a as PageHero, C as CTABand } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { h as heroEmbroidery, g as gown } from "./router-BH-HuD2G.mjs";
import { b as bridal, h as handbag } from "./collection-handbag-DmQS_8m7.mjs";
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
const technique3d = "/assets/technique-3d-B4Kqa_Pa.jpg";
const techniqueBead = "/assets/technique-bead-DDwyfq5I.jpg";
const techniqueCrystal = "/assets/technique-crystal-D9jj_3dm.jpg";
const services = [{
  name: "Couture Sampling",
  desc: "Precision swatches and prototypes for runway, lookbook and press samples — turnaround within seven to fourteen days.",
  image: heroEmbroidery
}, {
  name: "Hand Embroidery for Fashion Brands",
  desc: "Calibrated hand embroidery across silk, organza, tulle and wool — built for couture finish at production scale.",
  image: gown
}, {
  name: "Bridal Embroidery Manufacturing",
  desc: "Heritage zardosi, crystal and pearl work for bridal ateliers — full gown embellishment to veil borders.",
  image: bridal
}, {
  name: "Luxury Handbag Embellishment",
  desc: "Bead, sequin and metallic work for leather and fabric handbags — production-tested for retail.",
  image: handbag
}, {
  name: "Embellished Panels & Components",
  desc: "Standalone embroidered panels, motifs, appliqués and borders shipped to your manufacturing partner.",
  image: technique3d
}, {
  name: "Mixed Media & Crystal Studies",
  desc: "Layered surfaces combining bead, crystal, sequin and thread — engineered for weight and structural integrity.",
  image: techniqueCrystal
}];
function ServicesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Atelier · Services", title: "Couture services for", italic: "global houses.", description: "A full-spectrum embroidery offer — from a single sample to scaled production runs — held to the standards of haute couture.", image: techniqueBead }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10", children: services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 100, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col overflow-hidden border border-[#D4AF37]/25 bg-[#FAF7F2] transition-all duration-500 group-hover:border-[#D4AF37]/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden aspect-[4/3] cursor-pointer", "data-preview-image": s.image, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.image, alt: s.name, loading: "lazy", decoding: "async", className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.08]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-6 pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-[0.75px] bg-[#D4AF37]/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-1 bg-[#D4AF37] rotate-45 opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-[0.75px] bg-[#D4AF37]/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-serif text-[26px] leading-tight text-[#1A1A1A]", children: s.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-[15px] font-medium leading-7 text-[#2B2722]", children: s.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#D4AF37]/55 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A672C] transition-all duration-400 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto", children: [
          "Request Sampling",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-300 group-hover:translate-x-1", children: "→" })
        ] })
      ] })
    ] }) }, s.name)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABand, {})
  ] });
}
export {
  ServicesPage as component
};
