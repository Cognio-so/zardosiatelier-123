import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import zaLogo from "@/assets/za-logo-opt.webp";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * Per-route navbar theme - each section gets its own tonal dark variation.
 * All colours are kept inside the dark-charcoal family so the luxury feel is preserved.
 */
type NavTheme = {
  bg: string; // CSS background value for the header
  border: string; // bottom border colour
  logoText: string; // "Zardosi" word colour
  logoSub: string; // "Atelier" sub-label colour
  linkText: string; // default nav link colour
  linkHover: string; // hover colour (always gold)
  ctaBorder: string; // CTA button border
  ctaText: string; // CTA button text
  ctaHoverBg: string; // CTA button hover bg
  ctaHoverText: string; // CTA button hover text
  hamburgerColor: string; // mobile hamburger line colour
};

const themes: Record<string, NavTheme> = {
  "/": {
    bg: "rgba(0, 0, 0, 0.96)",
    border: "rgba(212,175,55,0.12)",
    logoText: "#FFFFFF",
    logoSub: "#C9A84C",
    linkText: "rgba(255,255,255,0.88)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(255,255,255,0.28)",
    ctaText: "#FFFFFF",
    ctaHoverBg: "#FFFFFF",
    ctaHoverText: "#120C09",
    hamburgerColor: "#F5F0E8",
  },
  "/portfolio": {
    bg: "linear-gradient(180deg, rgba(32,18,11,0.96) 0%, rgba(23,14,10,0.97) 100%)",
    border: "rgba(212,175,55,0.12)",
    logoText: "#FFFFFF",
    logoSub: "#C9A84C",
    linkText: "rgba(245,240,232,0.82)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(212,175,55,0.4)",
    ctaText: "rgba(245,240,232,0.9)",
    ctaHoverBg: "#D4AF37",
    ctaHoverText: "#120C09",
    hamburgerColor: "#F5F0E8",
  },
  "/industries": {
    // warm deep brown-black - pairs with the linen bg of the category page
    bg: "rgba(26,16,11,0.98)",
    border: "rgba(212,175,55,0.10)",
    logoText: "#FFFFFF",
    logoSub: "#C9A84C",
    linkText: "rgba(245,240,232,0.80)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(212,175,55,0.35)",
    ctaText: "rgba(245,240,232,0.88)",
    ctaHoverBg: "#D4AF37",
    ctaHoverText: "#120C09",
    hamburgerColor: "#F5F0E8",
  },
  "/about": {
    // pure charcoal - matches about hero darkness
    bg: "rgba(14,14,14,0.98)",
    border: "rgba(255,255,255,0.08)",
    logoText: "#FFFFFF",
    logoSub: "#C9A84C",
    linkText: "rgba(240,235,225,0.84)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(255,255,255,0.25)",
    ctaText: "#FFFFFF",
    ctaHoverBg: "#FFFFFF",
    ctaHoverText: "#120C09",
    hamburgerColor: "#F5F0E8",
  },
  "/process": {
    // deep matte black - matches process matte-black table image
    bg: "rgba(10,10,10,0.98)",
    border: "rgba(199,162,106,0.18)",
    logoText: "#FFFFFF",
    logoSub: "#D4AF37",
    linkText: "rgba(235,230,218,0.82)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(212,175,55,0.4)",
    ctaText: "rgba(235,230,218,0.9)",
    ctaHoverBg: "#D4AF37",
    ctaHoverText: "#120C09",
    hamburgerColor: "#EBE6DA",
  },
  "/contact": {
    // warm dark wood - matches contact hero dark wooden table
    bg: "rgba(22,12,8,0.98)",
    border: "rgba(212,175,55,0.14)",
    logoText: "#FFFFFF",
    logoSub: "#C9A84C",
    linkText: "rgba(245,238,225,0.82)",
    linkHover: "#D4AF37",
    ctaBorder: "rgba(212,175,55,0.38)",
    ctaText: "rgba(245,238,225,0.9)",
    ctaHoverBg: "#D4AF37",
    ctaHoverText: "#120C09",
    hamburgerColor: "#F5EEE1",
  },
};

const scrolledTheme: NavTheme = {
  bg: "linear-gradient(180deg, rgba(31,18,11,0.86) 0%, rgba(20,12,8,0.78) 100%)",
  border: "rgba(199,162,106,0.16)",
  logoText: "#FFFFFF",
  logoSub: "#C9A84C",
  linkText: "rgba(245,240,232,0.85)",
  linkHover: "#D4AF37",
  ctaBorder: "rgba(212,175,55,0.4)",
  ctaText: "rgba(245,240,232,0.9)",
  ctaHoverBg: "#D4AF37",
  ctaHoverText: "#120C09",
  hamburgerColor: "#F5F0E8",
};

function getTheme(pathname: string, scrolled: boolean): NavTheme {
  if (scrolled) return scrolledTheme;
  return themes[pathname] ?? scrolledTheme;
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Displayed theme with smooth interpolation via CSS transitions
  const theme = getTheme(pathname, scrolled || open);

  // Track scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const prevPathRef = useRef(pathname);
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setOpen(false);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <header
      style={{
        background: theme.bg,
        borderBottomColor: theme.border,
        backdropFilter: scrolled || open ? "blur(18px) saturate(145%)" : "blur(8px) saturate(115%)",
        WebkitBackdropFilter: scrolled || open ? "blur(18px) saturate(145%)" : "blur(8px) saturate(115%)",
        transition:
          "background 0.7s cubic-bezier(0.4,0,0.2,1), border-color 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
      className="fixed top-0 z-50 w-full border-b"
    >
      <div className="mx-auto flex h-[76px] max-w-[1520px] items-center justify-between px-5 sm:h-[84px] sm:px-8 lg:px-10">
        {/* Brand logo - clicking logo does NOT navigate; use the Home nav link instead */}
        <Link
          to="/"
          className="z-10 flex select-none items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4"
          aria-label="Zardosi Atelier homepage"
        >
          {/* Logo Icon (Cropped bottom text to display high-quality monogram only) */}
          <div className="relative h-[42px] w-[78px] shrink-0 overflow-hidden sm:h-[48px] sm:w-[90px]">
            <img
              src={zaLogo}
              alt="ZA Monogram"
              className="absolute top-0 left-0 w-full h-auto no-preview"
              style={{ filter: "brightness(1.08) drop-shadow(0 0 8px rgba(255,255,255,0.15))" }}
            />
          </div>
          {/* Crisp HTML Brand Text */}
          <div className="flex flex-col items-start">
            <span
              className="font-serif text-[20px] font-normal uppercase leading-none tracking-[0.24em] sm:text-[22px]"
              style={{
                color: theme.logoText,
                transition: "color 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              Zardosi
            </span>
            <span
              className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.34em] sm:text-[9px] sm:tracking-[0.4em]"
              style={{
                color: theme.logoSub,
                transition: "color 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              Atelier
            </span>
          </div>
        </Link>

        {/* Desktop nav links + CTA */}
        <div className="z-10 flex items-center gap-7">
          <nav
            className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.24em] lg:flex xl:gap-11"
            aria-label="Main navigation menu"
          >
            {navLinks.map((l) => {
              const isActive = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    color: isActive ? "#D4AF37" : theme.linkText,
                    transition: "color 0.7s cubic-bezier(0.4,0,0.2,1)",
                    fontWeight: isActive ? "700" : "600",
                    borderBottom: isActive ? "1px solid #D4AF37" : "1px solid transparent",
                    paddingBottom: "5px",
                  }}
                  className="rounded px-1 transition-all duration-500 hover:-translate-y-0.5 hover:!text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4"
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA button */}
          <Link
            to="/contact"
            className="hidden rounded-sm px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 md:inline-block"
            style={{
              border: `1px solid ${theme.ctaBorder}`,
              color: theme.ctaText,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              transition:
                "color 0.7s cubic-bezier(0.4,0,0.2,1), border-color 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = theme.ctaHoverBg;
              (e.currentTarget as HTMLElement).style.color = theme.ctaHoverText;
              (e.currentTarget as HTMLElement).style.borderColor = theme.ctaHoverBg;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              (e.currentTarget as HTMLElement).style.color = theme.ctaText;
              (e.currentTarget as HTMLElement).style.borderColor = theme.ctaBorder;
            }}
          >
            Request Sampling
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden flex flex-col gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4 p-1 rounded"
          >
            {[
              open ? "translate-y-[6px] rotate-45" : "",
              open ? "opacity-0" : "",
              open ? "-translate-y-[6px] -rotate-45" : "",
            ].map((extra, idx) => (
              <span
                key={idx}
                className={`block h-px w-6 transition-all duration-300 ${extra}`}
                style={{
                  backgroundColor: theme.hamburgerColor,
                  transition: "background-color 0.7s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-[#0a0806] transition-[max-height] duration-500 ease-out border-t border-white/5 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-5">
          {navLinks.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl transition-colors duration-300"
                style={{ color: isActive ? "#D4AF37" : "#F5F0E8" }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-md border border-gold bg-gold px-5 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-[#120C09] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}


