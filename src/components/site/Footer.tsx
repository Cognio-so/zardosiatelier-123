import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-linen text-ink/80 border-t border-ink/5">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <span className="font-serif text-2xl tracking-[0.15em] uppercase text-ink">
              Zardosi Atelier
            </span>
            <p className="mt-6 max-w-[45ch] text-xs leading-relaxed text-ink-soft uppercase tracking-wider">
              Luxury hand embroidery and fashion manufacturing for international brands, couture
              designers and bridal houses.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-8">Contact</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest">
              <li>
                <span className="text-ink/40 mr-2">Email:</span>
                <a className="hover:text-gold transition-colors" href="mailto:atelier@aureline.studio">
                  atelier@aureline.studio
                </a>
              </li>
              <li>
                <span className="text-ink/40 mr-2">WhatsApp:</span>
                <a
                  className="hover:text-gold transition-colors"
                  href="https://wa.me/918826023527"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 88260 23527
                </a>
              </li>
              <li>
                <span className="text-ink/40 mr-2">Instagram:</span>
                <a className="hover:text-gold transition-colors" href="#">
                  @zardosiatelier
                </a>
              </li>
              <li>
                <span className="text-ink/40 mr-2">LinkedIn:</span>
                <a className="hover:text-gold transition-colors" href="#">
                  Zardosi Atelier
                </a>
              </li>
              <li>
                <span className="text-ink/40 mr-2">Location:</span>
                <span className="text-ink-soft">India — Serving global fashion brands</span>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-8">Explore</h4>
            <ul className="grid grid-cols-1 gap-4 text-[11px] uppercase tracking-widest">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-gold transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-gold transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-ink/30">
          <p>© {new Date().getFullYear()} Zardosi Atelier. All Rights Reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
