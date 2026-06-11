import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, a as PageHero } from "./PageShell-CIfeRifQ.mjs";
import { R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { b as hero$1 } from "./router-BH-HuD2G.mjs";
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
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Begin", title: "Request a", italic: "feasibility review.", description: "Share your project and our atelier will respond within two working days with a tailored proposal.", image: hero$1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-4xl", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 space-y-6 text-[15px] font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-ink-soft", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:atelier@zardosiatelier.com", className: "mt-2 inline-block font-serif text-xl gold-link", children: "atelier@zardosiatelier.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-ink-soft", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/918826023527", target: "_blank", rel: "noopener noreferrer", className: "mt-2 inline-block font-serif text-xl gold-link", children: "+91 88260 23527" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.3em] text-ink-soft", children: "Studio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-serif text-xl", children: "New Delhi · Paris · New York" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "border border-gold/20 bg-champagne p-5 sm:p-8", onSubmit: (e) => {
        e.preventDefault();
        alert("Thank you. Our atelier will be in touch within two working days.");
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: [
          [["Full Name", "name", "text"], ["Brand / Maison", "brand", "text"], ["Country", "country", "text"], ["Email", "email", "email"], ["WhatsApp", "whatsapp", "text"], ["Upload Design", "file", "file"]].map(([label, name, type]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required: type !== "file", className: "w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold focus:border-gold focus:outline-none" })
          ] }, name)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft", children: "Project Brief" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, required: true, className: "w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors focus:border-gold focus:outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "mt-8 w-full border border-ink bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-[#120c09]", children: "Send Request" })
      ] }) })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
