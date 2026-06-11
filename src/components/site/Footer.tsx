import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-[#120c09] text-ivory/72">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="grid gap-12 border-x border-gold/20 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <div>
            <span className="font-serif text-2xl uppercase tracking-[0.24em] text-ivory">
              Zardosi Atelier
            </span>
            <p className="mt-6 max-w-[48ch] text-sm leading-7">
              Luxury hand embroidery and fashion manufacturing for international brands, couture
              designers and bridal houses.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Contact
            </h4>
            <ul className="space-y-3 text-sm leading-6">
              <li>Email: atelier@zardosiatelier.com</li>
              <li>WhatsApp: +91 88260 23527</li>
              <li>Instagram: @zardosiatelier</li>
              <li>LinkedIn: Zardosi Atelier</li>
              <li>Location: India - Serving global fashion brands</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["Industries", "/industries"],
                ["About", "/about"],
                ["Process", "/process"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-x border-b border-gold/20 px-6 py-6 text-[11px] uppercase tracking-[0.24em] text-ivory/48 sm:px-10">
          © {new Date().getFullYear()} Zardosi Atelier. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
