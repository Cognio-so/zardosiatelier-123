import { Link } from "@tanstack/react-router";
import { Mail, ChevronRight, Instagram, Linkedin, Heart } from "lucide-react";
import zaLogo from "@/assets/za-logo-opt.webp";

// Custom WhatsApp SVG Icon
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.637 0 5.116 1.028 6.98 2.894A9.8 9.8 0 0122 11.986c0 5.448-4.43 9.877-9.949 9.877m0-18.177C6.545 3.608 2.3 7.854 2.3 13.31c0 1.963.513 3.877 1.488 5.561L2.25 24l5.297-1.39a10.97 10.97 0 005.495 1.461c5.454 0 9.899-4.446 9.899-9.899 0-2.645-1.03-5.133-2.9-7.003-1.87-1.87-4.357-2.9-7.002-2.9" />
    </svg>
  );
}

export function Footer() {
  const siteName = "Zardosi Atelier";
  const tagline = "Luxury Hand Embroidery Couture";
  const email = "zardosiatelier@gmail.com";
  const phone = "+91 88260 23527";

  const instagramUrl = "https://www.instagram.com/reel/DaUjL2Mp4qF/?igsh=amUyNnNnbWJudzQz";
  const linkedinUrl = "https://www.linkedin.com/in/sajal-jain08";
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "") || "918826023527"}`;

  return (
    <footer className="relative bg-[#160F0C] text-[#F5F0E8] overflow-hidden selection:bg-[#D4AF37] selection:text-[#160F0C]">
      {/* Top Ornamental Gold Line */}
      <div className="relative border-t border-[#D4AF37]/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#160F0C] px-5 flex items-center gap-3">
          <div className="h-px w-8 bg-[#D4AF37]/40" />
          <svg className="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
          <div className="h-px w-8 bg-[#D4AF37]/40" />
        </div>
      </div>

      <div className="mx-auto max-w-[1360px] px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        {/* Main 4-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_0.9fr_1fr] pb-14 border-b border-[#D4AF37]/15">
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Navbar ZA Logo Image */}
            <div className="relative mb-5 flex items-center justify-center">
              <div className="relative overflow-hidden h-[54px] w-[102px] shrink-0">
                <img
                  src={zaLogo}
                  alt="Zardosi Atelier Logo"
                  className="absolute top-0 left-0 w-full h-auto no-preview"
                  style={{ filter: "brightness(1.1) drop-shadow(0 0 10px rgba(212,175,55,0.25))" }}
                />
              </div>
            </div>

            <h2 className="font-serif text-2xl uppercase tracking-[0.28em] text-[#F5F0E8] font-medium">
              {siteName}
            </h2>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
              {tagline}
            </p>

            {/* Flourish */}
            <div className="my-4 flex items-center gap-3 text-[#D4AF37]/60">
              <span className="h-px w-6 bg-[#D4AF37]/40" />
              <span className="text-xs">⚜</span>
              <span className="h-px w-6 bg-[#D4AF37]/40" />
            </div>

            <p className="max-w-[42ch] text-[13px] font-normal leading-7 text-white/70">
              At Zardosi Atelier, we celebrate the timeless art of hand embroidery through exquisite
              craftsmanship, luxurious fabrics, and attention to every detail. Each creation is a
              reflection of heritage, elegance and sophistication.
            </p>
          </div>

          {/* Column 2: CONTACT */}
          <div>
            <h3 className="mb-8 font-serif text-sm font-semibold uppercase tracking-[0.32em] text-[#D4AF37] relative inline-block">
              CONTACT
              <span className="absolute -bottom-2 left-0 h-[1.5px] w-8 bg-[#D4AF37]" />
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 transition-all duration-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] transition-all duration-500 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#160F0C] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <Mail size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Email</p>
                  <p className="mt-0.5 text-sm font-medium text-[#F5F0E8] transition-colors group-hover:text-[#D4AF37]">
                    {email}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div>
            <h3 className="mb-8 font-serif text-sm font-semibold uppercase tracking-[0.32em] text-[#D4AF37] relative inline-block">
              QUICK LINKS
              <span className="absolute -bottom-2 left-0 h-[1.5px] w-8 bg-[#D4AF37]" />
            </h3>

            <ul className="space-y-4 text-sm font-medium">
              {[
                ["Home", "/"],
                ["Portfolio", "/portfolio"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-2 text-white/80 transition-all duration-300 hover:text-[#D4AF37]"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <span className="relative">
                      {label}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: FOLLOW US */}
          <div>
            <h3 className="mb-8 font-serif text-sm font-semibold uppercase tracking-[0.32em] text-[#D4AF37] relative inline-block">
              FOLLOW US
              <span className="absolute -bottom-2 left-0 h-[1.5px] w-8 bg-[#D4AF37]" />
            </h3>

            <div className="space-y-4">
              {/* Instagram */}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:text-[#D4AF37]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#160F0C] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <Instagram size={17} strokeWidth={1.5} />
                  </div>
                  <span className="tracking-wide">Instagram</span>
                </a>
              )}

              {/* LinkedIn */}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:text-[#D4AF37]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#160F0C] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <Linkedin size={17} strokeWidth={1.5} />
                  </div>
                  <span className="tracking-wide">LinkedIn</span>
                </a>
              )}

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:text-[#D4AF37]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#D4AF37] transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#160F0C] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <span className="tracking-wide">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Luxury Quote */}
        <div className="my-10 text-center">
          <p className="font-serif text-base sm:text-lg italic tracking-wide text-[#D4AF37]/90 font-normal">
            " Every stitch tells a story of timeless elegance. "
          </p>
        </div>

        {/* Thin Gold Shimmer Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-8" />

        {/* Footer Bottom Bar */}
        <div className="flex flex-col gap-4 text-center text-xs font-medium text-white/60 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="tracking-wider">
            © {new Date().getFullYear()} {siteName}. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs tracking-wider">
            <Link to="/contact" className="transition-colors hover:text-[#D4AF37]">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/contact" className="transition-colors hover:text-[#D4AF37]">
              Terms of Service
            </Link>
          </div>

          <p className="inline-flex items-center justify-center gap-1.5 tracking-wider">
            <span>Crafted with</span>
            <Heart size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
            <span>in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
