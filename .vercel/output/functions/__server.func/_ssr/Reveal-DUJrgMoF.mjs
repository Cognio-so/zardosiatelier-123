import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/industries", label: "Category" },
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" }
];
function Navigation() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isLightHeader = scrolled || open;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed top-0 z-50 w-full transition-all duration-500 ${isLightHeader ? "bg-ivory/95 backdrop-blur-md border-b border-ink/5" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col items-start z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-serif text-2xl lg:text-[28px] tracking-[0.22em] uppercase leading-none transition-colors duration-300 ${isLightHeader ? "text-ink" : "text-ivory"}`,
                children: "Zardosi"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `mt-1 text-[8px] uppercase tracking-[0.45em] transition-colors duration-300 ${isLightHeader ? "text-ink-soft" : "text-gold-soft"}`,
                children: "Atelier"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "nav",
              {
                className: `hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${isLightHeader ? "text-ink/80" : "text-ivory/80"}`,
                children: navLinks.slice(1).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: l.to,
                    className: `gold-link transition-colors ${isLightHeader ? "hover:text-ink" : "hover:text-ivory"}`,
                    activeProps: { className: isLightHeader ? "text-ink" : "text-ivory" },
                    children: l.label
                  },
                  l.to
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                className: `hidden md:inline-block border px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${isLightHeader ? "border-ink bg-ink text-ivory hover:bg-gold hover:border-gold" : "border-ivory/30 bg-transparent text-ivory hover:bg-ivory hover:text-ink"}`,
                children: "Request Sampling"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-label": "Toggle menu",
                onClick: () => setOpen((s) => !s),
                className: "lg:hidden flex flex-col gap-[5px]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "translate-y-[6px] rotate-45" : ""}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "opacity-0" : ""}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `lg:hidden overflow-hidden bg-ivory transition-[max-height] duration-500 ease-out border-t border-ink/5 ${open ? "max-h-[600px]" : "max-h-0"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-6 py-8 gap-5", children: [
              navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  onClick: () => setOpen(false),
                  className: "font-serif text-2xl text-ink",
                  children: l.label
                },
                l.to
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  onClick: () => setOpen(false),
                  className: "mt-4 inline-block border border-ink bg-ink px-5 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-ivory",
                  children: "Book Consultation"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-[#1A100B] text-ivory/90", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1320px] px-5 py-10 sm:px-6 sm:py-12 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 px-0 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.9fr_0.65fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl uppercase tracking-[0.24em] text-ivory", children: "Zardosi Atelier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-[48ch] text-[15px] font-medium leading-7 text-ivory/88", children: "Luxury hand embroidery and fashion manufacturing for international brands, couture designers and bridal houses." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-[15px] font-medium leading-6 text-ivory/88", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email: atelier@zardosiatelier.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "WhatsApp: +91 88260 23527" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Instagram: @zardosiatelier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "LinkedIn: Zardosi Atelier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Location: India - Serving global fashion brands" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft", children: "Explore" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 text-[15px] font-medium text-ivory/88", children: [
          ["Home", "/"],
          ["Services", "/services"],
          ["Portfolio", "/portfolio"],
          ["Category", "/industries"],
          ["About", "/about"],
          ["Process", "/process"],
          ["Contact", "/contact"]
        ].map(([label, to]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "footer-link", children: label }) }, label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/70", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Zardosi Atelier. All rights reserved."
    ] })
  ] }) });
}
function FloatingWhatsApp() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: "https://wa.me/918826023527?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project.",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Chat with us on WhatsApp",
      className: "group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-3 transition-all duration-400 hover:bg-[#20ba5a] hover:scale-105",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 place-items-center rounded-full bg-white/20 text-white transition-colors duration-400 group-hover:bg-white/30 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 32 32", className: "size-5", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.255.59 4.466 1.71 6.4l-1.81 6.6 6.77-1.78a12.78 12.78 0 0 0 6.13 1.56h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.331-6.633-3.749-9.05A12.738 12.738 0 0 0 16.001 3.2zm0 23.36a10.55 10.55 0 0 1-5.38-1.474l-.386-.23-4.018 1.057 1.073-3.918-.252-.402a10.55 10.55 0 0 1-1.616-5.61c0-5.84 4.752-10.59 10.59-10.59a10.52 10.52 0 0 1 7.49 3.105 10.52 10.52 0 0 1 3.098 7.49c-.001 5.838-4.755 10.572-10.6 10.572zm5.797-7.927c-.318-.16-1.88-.927-2.171-1.034-.291-.108-.503-.16-.715.16-.211.318-.82 1.034-1.005 1.246-.185.211-.37.238-.688.08-.318-.16-1.343-.495-2.558-1.578-.946-.844-1.585-1.886-1.77-2.204-.185-.318-.02-.49.14-.648.144-.143.318-.371.477-.557.16-.185.211-.318.318-.529.106-.211.053-.397-.027-.557-.08-.16-.715-1.724-.98-2.36-.258-.62-.52-.535-.715-.546l-.61-.011a1.17 1.17 0 0 0-.847.397c-.291.318-1.11 1.084-1.11 2.643 0 1.56 1.137 3.066 1.295 3.279.16.211 2.237 3.415 5.42 4.79.758.327 1.349.523 1.81.67.76.241 1.452.207 2 .126.61-.091 1.88-.768 2.144-1.51.265-.741.265-1.376.185-1.509-.08-.132-.291-.211-.61-.371z" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-white font-semibold", children: "WhatsApp" })
      ]
    }
  );
}
function SiteShell({ children }) {
  const [lightboxImage, setLightboxImage] = reactExports.useState(null);
  const [zoomed, setZoomed] = reactExports.useState(false);
  const [transformOrigin, setTransformOrigin] = reactExports.useState("center");
  reactExports.useEffect(() => {
    const handleDocumentClick = (e) => {
      const target = e.target;
      const previewAttr = target.closest("[data-preview-image]");
      if (previewAttr) {
        const src = previewAttr.getAttribute("data-preview-image");
        if (src) {
          setLightboxImage(src);
          setZoomed(false);
          setTransformOrigin("center");
          return;
        }
      }
      if (target.tagName === "IMG" && !target.closest("nav") && !target.closest("footer") && !target.classList.contains("no-preview") && !target.closest(".no-preview")) {
        const src = target.src;
        setLightboxImage(src);
        setZoomed(false);
        setTransformOrigin("center");
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
        setZoomed(false);
      }
    };
    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage]);
  const handleMouseMove = (e) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-ivory text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWhatsApp, {}),
    lightboxImage && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md transition-opacity duration-300 cursor-pointer",
        onClick: () => {
          setLightboxImage(null);
          setZoomed(false);
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-3 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 z-[110] font-sans",
              onClick: () => {
                setLightboxImage(null);
                setZoomed(false);
              },
              children: [
                "Close",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-light leading-none", children: "×" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "relative max-h-[85vh] max-w-[90vw] overflow-hidden bg-transparent select-none transition-all duration-300",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "relative overflow-hidden flex items-center justify-center",
                  style: { cursor: zoomed ? "zoom-out" : "zoom-in" },
                  onClick: () => setZoomed(!zoomed),
                  onMouseMove: handleMouseMove,
                  onMouseLeave: () => {
                    if (zoomed) {
                      setZoomed(false);
                      setTransformOrigin("center");
                    }
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: lightboxImage,
                      alt: "Bespoke embroidery detail",
                      className: "max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-300 ease-out",
                      style: {
                        transform: zoomed ? "scale(2.5)" : "scale(1)",
                        transformOrigin
                      }
                    }
                  )
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      ref,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.2s cubic-bezier(0.19,1,0.22,1) ${delay}ms, transform 1.2s cubic-bezier(0.19,1,0.22,1) ${delay}ms`,
        willChange: "opacity, transform"
      },
      className,
      children
    }
  );
}
export {
  Reveal as R,
  SiteShell as S
};
