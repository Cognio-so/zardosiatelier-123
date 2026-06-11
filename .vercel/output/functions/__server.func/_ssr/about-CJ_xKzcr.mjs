import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero, C as CTABand } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { c as hero, g as gown } from "./router-BH-HuD2G.mjs";
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
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "The Maison", title: "A studio of", italic: "hands.", description: "Zardosi Atelier is built on multi-generational embroidery — restrained, considered, and held to the standards of the houses we serve.", image: hero }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Our Approach" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl", children: [
          "Quiet craft. ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "Loud results." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-[16px] font-medium leading-7 text-ink-soft", children: "Founded as a small studio commissioned by independent couture ateliers, Zardosi Atelier has grown into a 30-artisan house with dedicated pods for sampling, production, and finishing. Our clients include houses in Paris, Milan, New York and beyond." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[16px] font-medium leading-7 text-ink-soft", children: "We work under NDA, in restricted-access rooms, with documented quality checkpoints at every stage. The result: embroidered surfaces that hold up under runway light and editorial macro." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, className: "aspect-[4/5] overflow-hidden border border-gold/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gown, alt: "Atelier", decoding: "async", className: "h-full w-full object-cover" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTABand, {})
  ] });
}
export {
  AboutPage as component
};
