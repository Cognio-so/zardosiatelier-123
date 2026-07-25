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
    <section className="relative h-[58vh] min-h-[420px] overflow-hidden bg-ink sm:h-[62vh]">
      <img
        src={image}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-ink/72" />
      <div className="relative z-10 flex h-full items-end pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-6 lg:px-10">
          <p className="eyebrow !text-gold-soft animate-fade-up">{eyebrow}</p>
          <h1
            className="mt-4 max-w-3xl font-serif text-3xl leading-[1.05] text-ivory animate-fade-up sm:text-5xl lg:text-[56px]"
            style={{ animationDelay: "200ms" }}
          >
            {title} {italic ? <span className="italic font-normal">{italic}</span> : null}
          </h1>
          <p
            className="mt-4 max-w-xl text-[15px] font-medium leading-7 text-ivory/90 animate-fade-up"
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
  return (
    <SiteShell>
      <div className="bg-[#F4EFE7]">{children}</div>
    </SiteShell>
  );
}

export function CTABand({
  title = "Begin your couture journey",
  body = "Share your design and our atelier will respond within two working days.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink py-16 text-ivory sm:py-20">
      <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory text-balance">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-ivory/88">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="border border-gold bg-gold px-8 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#120c09] transition-all hover:bg-transparent hover:text-gold-soft sm:px-10"
            >
              Request Quote
            </Link>
            <Link
              to="/portfolio"
              className="border border-ivory/45 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-ivory hover:text-ink sm:px-10"
            >
              View Portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
