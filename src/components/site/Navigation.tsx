import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/industries", label: "Category" },
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLightHeader = scrolled || open;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isLightHeader ? "bg-ivory/95 backdrop-blur-md border-b border-ink/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12">
        {/* Left Brand logo */}
        <Link to="/" className="flex flex-col items-start z-10">
          <span className={`font-serif text-2xl lg:text-[28px] tracking-[0.22em] uppercase leading-none transition-colors duration-300 ${
            isLightHeader ? "text-ink" : "text-ivory"
          }`}>
            Zardosi
          </span>
          <span className={`mt-1 text-[8px] uppercase tracking-[0.45em] transition-colors duration-300 ${
            isLightHeader ? "text-ink-soft" : "text-gold-soft"
          }`}>
            Atelier
          </span>
        </Link>

        {/* Right links + CTA */}
        <div className="flex items-center gap-6 z-10">
          <nav className={`hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${
            isLightHeader ? "text-ink/80" : "text-ivory/80"
          }`}>
            {navLinks.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`gold-link transition-colors ${
                  isLightHeader ? "hover:text-ink" : "hover:text-ivory"
                }`}
                activeProps={{ className: isLightHeader ? "text-ink" : "text-ivory" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className={`hidden md:inline-block border px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
              isLightHeader
                ? "border-ink bg-ink text-ivory hover:bg-gold hover:border-gold"
                : "border-ivory/30 bg-transparent text-ivory hover:bg-ivory hover:text-ink"
            }`}
          >
            Request Sampling
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden flex flex-col gap-[5px]"
          >
            <span
              className={`block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${isLightHeader ? "bg-ink" : "bg-ivory"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-ivory transition-[max-height] duration-500 ease-out border-t border-ink/5 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-5">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-serif text-2xl text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block border border-ink bg-ink px-5 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-ivory"
          >
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}
