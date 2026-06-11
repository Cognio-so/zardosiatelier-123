import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteShell, R as Reveal } from "./Reveal-DUJrgMoF.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { h as heroEmbroidery } from "./router-BH-HuD2G.mjs";
import { Z as Zap, S as ShieldCheck, U as Users, a as Sparkles, P as PenTool, G as Globe, b as Package, D as Diamond, L as Layers, C as Crown, c as ChevronDown } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const heroVideo = "/assets/hero-video-BH_3IU1P.mp4";
const techniqueZardosiNew = "/assets/technique-zardosi-new-BEj5eaho.png";
const techniqueCrystalNew = "/assets/technique-crystal-new-CSYM20BF.png";
const technique3dNew = "/assets/technique-3d-new-LbcI2jx-.png";
const techniqueBeadworkNew = "/assets/technique-beadwork-new-DQ8Qgsw_.png";
const techniques = [{
  name: "Zardosi",
  desc: "Metallic gold threadwork rooted in centuries of courtly craft.",
  image: techniqueBeadworkNew
}, {
  name: "Crystal Work",
  desc: "Hand-set crystals and sequins for couture light and shadow.",
  image: technique3dNew
}, {
  name: "3D Floral",
  desc: "Sculpted silk petals layered with pearl and bead cores.",
  image: techniqueCrystalNew
}, {
  name: "Beadwork",
  desc: "Glass, pearl and seed-bead compositions stitched by hand.",
  image: techniqueZardosiNew
}];
const whyChoose = [{
  title: "30+ Skilled Artisans",
  icon: "Crown"
}, {
  title: "Sampling to Production",
  icon: "Layers"
}, {
  title: "Couture-Level Quality",
  icon: "Diamond"
}, {
  title: "Flexible Order Quantities",
  icon: "Package"
}, {
  title: "Export Experience",
  icon: "Globe"
}, {
  title: "Custom Design Execution",
  icon: "PenTool"
}, {
  title: "Premium Materials",
  icon: "Sparkles"
}, {
  title: "Dedicated Project Support",
  icon: "Users"
}, {
  title: "Design Confidentiality",
  icon: "ShieldCheck"
}, {
  title: "Fast Sampling",
  icon: "Zap"
}];
const process = [{
  n: "01",
  title: "Share Design"
}, {
  n: "02",
  title: "Technical Review"
}, {
  n: "03",
  title: "Sampling"
}, {
  n: "04",
  title: "Approval"
}, {
  n: "05",
  title: "Production"
}, {
  n: "06",
  title: "Global Delivery"
}];
const faqs = [{
  question: "Do you work with luxury brands outside India?",
  answer: "Yes. We support international fashion houses, couture designers and bridal studios with export-ready communication, sampling and delivery."
}, {
  question: "Can you develop embroidery from design references and sketches?",
  answer: "Yes. Share sketches, mood boards, tech packs or references and our team will translate them into workable embroidery samples."
}, {
  question: "Do you support both low-volume sampling and larger production runs?",
  answer: "Yes. We can begin with swatches or prototypes, then scale the approved technique into controlled production."
}, {
  question: "What kind of products can be embellished?",
  answer: "We work on gowns, bridalwear, womenswear, menswear, bags, headbands, patches, borders and bespoke couture components."
}];
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[680px] overflow-hidden bg-[#3d2b20] pt-24 text-ivory sm:min-h-[720px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, poster: heroEmbroidery, className: "absolute inset-0 h-full w-full object-cover", children: /* @__PURE__ */ jsxRuntimeExports.jsx("source", { src: heroVideo, type: "video/mp4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#160f0b]/45 via-[#160f0b]/12 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#160f0b]/20 via-transparent to-[#160f0b]/38" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 border-y border-gold/20 bg-[#160f0b]/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1220px] gap-3 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory sm:px-6 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Low MOQ & Sampling" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Artwork Development" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "In-House Design & QC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Express Worldwide Shipping" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto flex min-h-[560px] max-w-[1220px] items-center px-5 pb-28 sm:px-6 sm:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[780px] p-0 lg:-ml-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.24em] text-gold-soft", children: "Haute Couture Embroidery - Export Atelier - India" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 font-serif text-[42px] leading-[0.98] text-white sm:text-[68px] lg:text-[88px]", children: [
          "Hand embroidery for the world's",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold-soft", children: "finest labels." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-[62ch] text-base font-semibold leading-7 text-white/92 sm:leading-8", children: "We craft and export luxury embroidered pieces for couture houses, designers and premium brands - every stitch finished by master karigars and checked twice before it ships." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-serif text-lg italic text-gold-soft sm:text-xl", children: "Patches / Bags / Headbands / Dresses / Gowns / Abayas / Bespoke commissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "w-full border border-gold bg-gold px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#120c09] transition hover:border-ivory hover:bg-ivory sm:w-auto", children: "Start With a Sample" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/918826023527", target: "_blank", rel: "noopener noreferrer", className: "w-full border border-ivory/70 bg-[#120c09]/25 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-[#120c09] sm:w-auto", children: "WhatsApp the Atelier" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#EFE8DD] py-12 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Embroidery Techniques" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-4xl leading-tight sm:text-6xl", children: "A vocabulary of luxury hand-craft." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "gold-link text-[10px] uppercase tracking-[0.3em]", children: "All Services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: techniques.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] overflow-hidden bg-[#E5D8C8]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-full w-full object-cover transition duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-serif text-3xl leading-tight text-ink", children: item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[15px] font-medium leading-7 text-ink-soft", children: item.desc })
      ] }) }, item.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#1A100B] py-12 text-ivory sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow !text-gold-soft", children: "Our Process" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl", children: "From sketch to ceremony." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6", children: process.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[128px] border border-gold/40 bg-white/[0.06] px-6 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl text-gold-soft", children: step.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/90", children: step.title })
      ] }, step.n)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "px-0 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Why Zardosi Atelier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-4xl leading-tight sm:text-5xl", children: "A partner built for luxury brands." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: whyChoose.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[112px] border border-gold/25 bg-ivory px-5 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { name: item.icon, className: "size-5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm font-medium text-ink", children: item.title })
        ] }, item.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, className: "mt-4 px-0 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 border-y border-ink/10 py-8 text-center md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-5xl text-gold sm:text-6xl", children: "120+" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft", children: "Collections Supported" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-5xl text-gold sm:text-6xl", children: "18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft", children: "Markets Served" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-5xl italic text-gold sm:text-6xl", children: "Fast-track" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft", children: "Sampling Turnaround" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg py-10 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "px-0 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-4xl leading-tight sm:text-5xl", children: "Working with our atelier." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "mt-7 w-full", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `item-${i}`, className: "border-b border-ink/10 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left font-serif text-2xl hover:text-gold hover:no-underline", children: faq.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "max-w-[70ch] pt-3 text-[15px] font-medium leading-7 text-ink-soft", children: faq.answer })
      ] }, faq.question)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LeadSection, {})
  ] });
}
function LeadSection() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "luxury-silk-bg pb-12 sm:pb-16", id: "quote", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "border border-gold/25 bg-[#fffdf9] px-5 py-8 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Begin a Commission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-serif text-4xl leading-tight sm:text-5xl", children: "Let us translate your vision into couture-grade craftsmanship." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/918826023527?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project.", target: "_blank", rel: "noopener noreferrer", className: "block border border-gold bg-gold px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#120c09] transition hover:bg-transparent", children: "WhatsApp +91 88260 23527" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:atelier@zardosiatelier.com", className: "block border border-ink/25 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition hover:border-gold hover:text-gold", children: "Email the Atelier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[15px] font-medium leading-7 text-ink-soft lg:text-left", children: "Send your sketches, references, quantity range and timeline. We will reply with the right sampling route for your project." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-ink/10 bg-ivory p-6 sm:p-8", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Thank You" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-serif text-3xl", children: "Inquiry Received" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-ink-soft", children: "Our atelier team will contact you shortly." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", name: "name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email Address", name: "email", type: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project Type", name: "subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft", children: "Project Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", rows: 4, required: true, className: "w-full resize-none border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition hover:bg-gold hover:text-[#120c09] sm:w-auto", children: "Submit Inquiry" })
      ] }) })
    ] })
  ] }) }) });
}
function Field({
  label,
  name,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required: true, className: "w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold" })
  ] });
}
function Icon({
  name,
  className
}) {
  const icons = {
    Crown,
    Layers,
    Diamond,
    Package,
    Globe,
    PenTool,
    Sparkles,
    Users,
    ShieldCheck,
    Zap
  };
  const Component = icons[name] || Crown;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { className, strokeWidth: 1.5 });
}
export {
  HomePage as component
};
