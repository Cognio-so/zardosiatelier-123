import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteShell, R as Reveal } from "./Reveal-DUJrgMoF.mjs";
function PageHero({
  eyebrow,
  title,
  italic,
  description,
  image
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[58vh] min-h-[420px] overflow-hidden bg-ink sm:h-[62vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: image,
        alt: "",
        decoding: "async",
        className: "absolute inset-0 h-full w-full object-cover opacity-70"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-ink/72" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex h-full items-end pb-12 sm:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1360px] px-5 sm:px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow !text-gold-soft animate-fade-up", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h1",
        {
          className: "mt-4 max-w-4xl font-serif text-4xl leading-[1.02] text-ivory animate-fade-up sm:text-6xl lg:text-7xl",
          style: { animationDelay: "200ms" },
          children: [
            title,
            " ",
            italic ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-normal", children: italic }) : null
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "mt-5 max-w-2xl text-base font-medium leading-7 text-ivory/90 animate-fade-up sm:text-lg",
          style: { animationDelay: "400ms" },
          children: description
        }
      )
    ] }) })
  ] });
}
function PageShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SiteShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#F4EFE7]", children }) });
}
function CTABand({
  title = "Begin your couture journey",
  body = "Share your design and our atelier will respond within two working days."
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ink py-16 text-ivory sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1100px] px-5 text-center sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl sm:text-5xl text-ivory text-balance", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-base leading-7 text-ivory/88", children: body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contact",
          className: "border border-gold bg-gold px-8 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#120c09] transition-all hover:bg-transparent hover:text-gold-soft sm:px-10",
          children: "Request Quote"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/portfolio",
          className: "border border-ivory/45 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-ivory hover:text-ink sm:px-10",
          children: "View Portfolio"
        }
      )
    ] })
  ] }) }) });
}
export {
  CTABand as C,
  PageShell as P,
  PageHero as a
};
