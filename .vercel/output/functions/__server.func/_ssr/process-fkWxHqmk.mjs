import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero, C as CTABand } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { a as aari } from "./router-BH-HuD2G.mjs";
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
const process = [{
  n: "01",
  title: "Share Design",
  desc: "Sketches, tech packs or mood boards via our secure client portal. All correspondence is NDA-protected by default."
}, {
  n: "02",
  title: "Technical Review",
  desc: "Our atelier directors review material feasibility, stitch density, and timing — and respond with a written assessment."
}, {
  n: "03",
  title: "Sampling",
  desc: "Precision swatches or full prototypes are executed within seven to fourteen days, then shipped for approval."
}, {
  n: "04",
  title: "Approval",
  desc: "Sign-off on embellishment weight, colour calibration, and material integrity ahead of production lock."
}, {
  n: "05",
  title: "Production",
  desc: "Dedicated artisan pods execute production with daily QC and documented checkpoints."
}, {
  n: "06",
  title: "Global Delivery",
  desc: "Insured, white-glove logistics directly to your design studio or manufacturing partner."
}];
function ProcessPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Methodology", title: "The path to", italic: "production.", description: "A clear six-step path from first design share to global delivery — engineered for confidentiality, precision, and predictable timing.", image: aari }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-8 sm:space-y-10", children: process.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: i * 80, as: "li", className: "grid grid-cols-1 items-baseline gap-4 border-b border-ink/10 pb-8 md:grid-cols-[96px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-5xl italic text-gold", children: p.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-4xl leading-tight", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink-soft", children: p.desc })
      ] })
    ] }, p.n)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABand, {})
  ] });
}
export {
  ProcessPage as component
};
