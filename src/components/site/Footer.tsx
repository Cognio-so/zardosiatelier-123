import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-[#1A100B] text-ivory/90">
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid gap-8 px-0 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.9fr_0.65fr]">
          <div>
            <span className="font-serif text-2xl uppercase tracking-[0.24em] text-ivory">
              Zardosi Atelier
            </span>
            <p className="mt-5 max-w-[48ch] text-[15px] font-medium leading-7 text-ivory/88">
              Luxury hand embroidery and fashion manufacturing for international brands, couture
              designers and bridal houses.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Contact
            </h4>
            <ul className="space-y-3 text-[15px] font-medium leading-6 text-ivory/88">
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
            <ul className="space-y-3 text-[15px] font-medium text-ivory/88">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Portfolio", "/portfolio"],
                ["About", "/about"],
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

        <div className="pt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory/70">
          © {new Date().getFullYear()} Zardosi Atelier. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
