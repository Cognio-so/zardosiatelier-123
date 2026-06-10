import { Link } from "@tanstack/react-router";
import { Mail, MessageSquare, Instagram, Linkedin, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FCFAF7] text-[#4A4A4A] border-t border-[#D4AF37]/15">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Brand & Socials Column */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#1A1A1A] font-semibold">
                Zardosi Atelier
              </span>
              
              {/* Thin gold decorative divider */}
              <div className="w-12 h-[1px] bg-[#D4AF37] my-5 opacity-60" />
              
              <p className="max-w-[42ch] text-xs leading-relaxed uppercase tracking-wider font-sans text-[#4A4A4A] mt-4">
                Luxury hand embroidery and fashion manufacturing for international brands, couture
                designers and bridal houses.
              </p>
            </div>
            
            {/* Social Icons row */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="size-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#4A4A4A] hover:bg-[#D4AF37] hover:text-[#FAF7F2] hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="#"
                className="size-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#4A4A4A] hover:bg-[#D4AF37] hover:text-[#FAF7F2] hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="mailto:atelier@aureline.studio"
                className="size-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#4A4A4A] hover:bg-[#D4AF37] hover:text-[#FAF7F2] hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4 lg:pl-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold mb-6 relative">
              The Studio
              <span className="absolute -bottom-1.5 left-0 w-8 h-[1px] bg-[#D4AF37]/45" />
            </h4>
            
            <ul className="space-y-4 text-xs">
              <li className="flex items-center gap-3.5 group">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#D4AF37]/8 text-[#D4AF37] border border-[#D4AF37]/15">
                  <Mail className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#4A4A4A]/50 font-semibold mb-0.5">Email Us</span>
                  <a className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors font-medium" href="mailto:atelier@aureline.studio">
                    atelier@aureline.studio
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5 group">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#25D366]/8 text-[#25D366] border border-[#25D366]/15">
                  <MessageSquare className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#25D366] font-semibold mb-0.5">WhatsApp Chat</span>
                  <a
                    className="text-[#4A4A4A] hover:text-[#25D366] transition-colors font-medium"
                    href="https://wa.me/918826023527"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +91 88260 23527
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5 group">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#D4AF37]/8 text-[#D4AF37] border border-[#D4AF37]/15">
                  <Instagram className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#4A4A4A]/50 font-semibold mb-0.5">Follow Us</span>
                  <a className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors font-medium" href="#">
                    @zardosiatelier
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3.5 group">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#D4AF37]/8 text-[#D4AF37] border border-[#D4AF37]/15">
                  <Linkedin className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#4A4A4A]/50 font-semibold mb-0.5">Connect LinkedIn</span>
                  <a className="text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors font-medium" href="#">
                    Zardosi Atelier
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5 group">
                <span className="flex items-center justify-center size-7 rounded-full bg-[#D4AF37]/8 text-[#D4AF37] border border-[#D4AF37]/15 mt-0.5">
                  <MapPin className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#4A4A4A]/50 font-semibold mb-0.5">Studio Location</span>
                  <span className="text-[#4A4A4A] font-medium">India — Serving global fashion brands</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Explore Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold mb-6 relative">
              Explore
              <span className="absolute -bottom-1.5 left-0 w-8 h-[1px] bg-[#D4AF37]/45" />
            </h4>
            
            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-6 text-[13px] uppercase tracking-wider font-medium">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="footer-link">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/industries" className="footer-link">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/process" className="footer-link">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="mt-16 pt-8 border-t border-[#D4AF37]/15 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] uppercase tracking-[0.2em] text-[#4A4A4A]/70 font-sans">
          <p>© {new Date().getFullYear()} Zardosi Atelier. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
