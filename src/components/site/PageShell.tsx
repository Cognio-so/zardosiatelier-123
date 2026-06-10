import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";

export function PageHero({
  eyebrow,
  title,
  italic,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description: string;
  image: string;
}) {
  return (
    <section className="relative h-[68vh] min-h-[480px] overflow-hidden bg-ink">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />
      <div className="relative z-10 flex h-full items-end pb-20">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
          <p className="eyebrow !text-gold-soft animate-fade-up">{eyebrow}</p>
          <h1
            className="mt-6 max-w-4xl font-serif text-4xl sm:text-6xl lg:text-7xl text-ivory leading-[1.05] animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            {title}{" "}
            {italic ? <span className="italic font-normal">{italic}</span> : null}
          </h1>
          <p
            className="mt-6 max-w-2xl text-ivory/75 text-lg leading-relaxed animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}

export function CTABand({
  title = "Begin your couture journey",
  body = "Share your design and our atelier will respond within two working days.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink text-ivory py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl text-ivory text-balance">
            {title}
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-ivory/70">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="border border-gold bg-gold px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-all hover:bg-transparent"
            >
              Request Quote
            </Link>
            <Link
              to="/portfolio"
              className="border border-ivory/30 px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-ivory hover:text-ink"
            >
              View Portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
