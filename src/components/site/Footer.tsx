import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 pt-24 pb-10">
        {/* Top */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="font-serif text-3xl tracking-[0.22em] uppercase text-ivory">
              Auréline
            </span>
            <p className="mt-2 text-[8px] uppercase tracking-[0.45em] text-ivory/40">
              Maison · Atelier
            </p>
            <p className="mt-8 max-w-[36ch] text-sm leading-relaxed text-ivory/60">
              A luxury hand embroidery atelier in service of the world's most considered fashion
              houses. Couture precision delivered at production scale.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-gold">Atelier</h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link to="/services" className="gold-link hover:text-ivory">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="gold-link hover:text-ivory">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/process" className="gold-link hover:text-ivory">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/about" className="gold-link hover:text-ivory">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow text-gold">Connect</h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a className="gold-link hover:text-ivory" href="mailto:atelier@aureline.studio">
                  atelier@aureline.studio
                </a>
              </li>
              <li>
                <a
                  className="gold-link hover:text-ivory"
                  href="https://wa.me/918826023527"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp +91 88260 23527
                </a>
              </li>
              <li>
                <a className="gold-link hover:text-ivory" href="#">
                  Instagram
                </a>
              </li>
              <li>
                <a className="gold-link hover:text-ivory" href="#">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="eyebrow text-gold">Studio</h4>
            <p className="mt-6 text-sm leading-relaxed text-ivory/60">
              New Delhi
              <br />
              Paris · New York
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 border-t border-ivory/10 pt-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md">
            <h4 className="font-serif text-2xl italic text-ivory">The Atelier Letter</h4>
            <p className="mt-2 text-xs text-ivory/50">
              Seasonal dispatches from our studio. Process notes, new technique studies.
            </p>
          </div>
          <form className="flex w-full max-w-md items-end gap-4 border-b border-ivory/20 pb-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
            />
            <button
              type="submit"
              className="text-[10px] uppercase tracking-[0.3em] text-gold transition-colors hover:text-ivory"
            >
              Join
            </button>
          </form>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start md:flex-row md:items-center md:justify-between gap-4 text-[9px] uppercase tracking-[0.3em] text-ivory/30">
          <p>© {new Date().getFullYear()} Maison Auréline. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ivory">
              Privacy
            </a>
            <a href="#" className="hover:text-ivory">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
