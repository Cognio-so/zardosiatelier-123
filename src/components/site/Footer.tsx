import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/admin-data";

export function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["settings-public"],
    queryFn: () => getSettings(),
    staleTime: 0,
  });

  const siteName = settings?.siteName ?? "Zardosi Atelier";
  const tagline =
    settings?.tagline ??
    "Luxury hand embroidery and fashion manufacturing for international brands, couture designers and bridal houses.";

  return (
    <footer className="bg-[#1A100B] text-ivory/90">
      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid gap-8 px-0 py-6 sm:py-8 lg:grid-cols-[1.15fr_0.9fr_0.65fr]">
          <div>
            <span className="font-serif text-2xl uppercase tracking-[0.24em] text-ivory">
              {siteName}
            </span>
            <p className="mt-5 max-w-[48ch] text-[15px] font-medium leading-7 text-ivory/88">
              {tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Contact
            </h3>
            <ul className="space-y-3 text-[15px] font-medium leading-6 text-ivory/88">
              {settings?.email && <li>Email: {settings.email}</li>}
              {settings?.whatsappNumber && <li>WhatsApp: {settings.whatsappNumber}</li>}
              {settings?.instagramUrl && <li>Instagram: {settings.instagramUrl}</li>}
              {settings?.linkedinUrl && <li>LinkedIn: {settings.linkedinUrl}</li>}
              <li>Location: {settings?.address ?? "India - Serving global fashion brands"}</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
              Explore
            </h3>
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
          {settings?.footerText ?? `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}