import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import aboutHero from "@/assets/about-hero.webp";
import aboutQuality from "@/assets/about-quality.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zardosi Atelier | Founded 2002, Luxury Embroidery Manufacturer" },
      {
        name: "description",
        content:
          "Founded in 2002 by Shalini and Sajal Jain, Zardosi Atelier is a trusted manufacturer and exporter of premium hand and machine embroidery — serving fashion houses, designers, and global brands for over two decades.",
      },
      { property: "og:title", content: "About — Zardosi Atelier" },
      {
        property: "og:description",
        content: "A luxury embroidery atelier founded in 2002, combining traditional Indian craft with international quality standards.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutHero },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/about" }],
  }),
  component: AboutPage,
});

const products = [
  "Indian ethnic dresses, lehengas and sarees",
  "Moroccan caftans and Western garments",
  "Hand- and machine-embroidered laces",
  "Handbags, clutches and mobile pouches",
  "Badges, logos and custom monograms",
  "Embroidered Pashmina shawls and stoles",
  "Bedsheets, curtains, tablecloths and runners",
  "Upholstery, pillow covers and cushion covers",
  "Premium Keemkhwab and brocade fabrics",
];

function AboutPage() {
  return (
    <PageShell>
      {/* ── Hero ─────────────────────────────────── */}
      <PageHero
        eyebrow="The Maison"
        title="A studio of"
        italic="hands."
        description="Zardosi Atelier is built on multi-generational embroidery — restrained, considered, and held to the standards of the houses we serve."
        image={aboutHero}
      />

      {/* ══════════════════════════════════════════
          BLOCK 1 — The Story  (left text · right image)
      ══════════════════════════════════════════ */}
      <section className="luxury-silk-bg py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">

          {/* Left — Text */}
          <Reveal>
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl">
              About Zardosi <span className="italic">Atelier.</span>
            </h2>
            <p className="mt-6 text-[16px] font-medium leading-[1.85] text-ink-soft">
              Founded in 2002 by <strong className="text-ink font-semibold">Shalini and Sajal Jain</strong>, Zardosi Atelier was created from a shared passion for sartorial excellence, intricate craftsmanship, and the timeless art of Indian embroidery.
            </p>
            <p className="mt-5 text-[16px] font-medium leading-[1.85] text-ink-soft">
              Today, Zardosi Atelier is a trusted manufacturer and exporter of premium hand and machine embroidery, serving fashion houses, designers, wholesalers, retailers, and private-label brands across international markets. For more than two decades, we have combined traditional Indian embroidery techniques with contemporary design and dependable production capabilities to create products of exceptional quality.
            </p>
          </Reveal>

          {/* Right — Artisan Image */}
          <Reveal delay={150}>
            <div
              className="aspect-[4/5] overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.22)",
                transition: "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.70)";
                el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.35), 0 16px 56px rgba(0,0,0,0.22)";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.22)";
                el.style.boxShadow = "none";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
                <img
                  src={aboutHero}
                  alt="Artisan hands hand-stitching zardosi embroidery on an adda frame"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ transition: "transform 1.3s cubic-bezier(0.19,1,0.22,1)" }}
                />
              </Lens>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOCK 2 — Expertise & Product Range
      ══════════════════════════════════════════ */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "linear-gradient(180deg, #EDE8DF 0%, #F4EFE7 100%)" }}
      >
        <div className="mx-auto max-w-[1180px] px-5 sm:px-6 lg:px-10">

          {/* Expertise text */}
          <Reveal>
            <div className="max-w-[820px]">
              <span className="eyebrow">Craft &amp; Technique</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl">
                Our <span className="italic">Expertise.</span>
              </h2>
              <p className="mt-6 text-[16px] font-medium leading-[1.85] text-ink-soft">
                Our embroidery expertise includes <em>Resham work, Zardozi, Nakshi metal thread, Dabka and bullion work, appliqué, 3D embroidery, cutwork, Zari, sequins, pearls, Cutdana bugle beads, glass stones, zircons, Swarovski embellishments</em>, and other specialised decorative techniques.
              </p>
            </div>
          </Reveal>

          {/* Divider */}
          <Reveal delay={80}>
            <div
              className="my-12"
              style={{ borderTop: "1px solid rgba(180,148,60,0.25)" }}
            />
          </Reveal>

          {/* What We Create */}
          <Reveal delay={120}>
            <span className="eyebrow">What We Create</span>
            <h3 className="mt-3 font-serif text-3xl leading-[1.08] sm:text-4xl">
              Supported by a team of highly skilled artisans and craftsmen, we manufacture and export:
            </h3>
          </Reveal>

          {/* 3-column bullet grid */}
          <Reveal delay={180}>
            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {/* Gold diamond bullet */}
                  <span
                    className="mt-[6px] shrink-0 inline-block h-[7px] w-[7px] rotate-45"
                    style={{ background: "#C9A84C" }}
                    aria-hidden="true"
                  />
                  <span className="text-[15px] font-medium leading-[1.7] text-ink-soft">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BLOCK 3 — Quality Promise
          (left image · right text — reversed layout)
      ══════════════════════════════════════════ */}
      <section className="luxury-silk-bg py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">

          {/* Left — Image */}
          <Reveal>
            <div
              className="aspect-[4/3] overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.22)",
                transition: "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.70)";
                el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.35), 0 16px 56px rgba(0,0,0,0.22)";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.22)";
                el.style.boxShadow = "none";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
                <img
                  src={aboutQuality}
                  alt="Quality inspection of gold zardosi embroidery at Zardosi Atelier"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{ transition: "transform 1.3s cubic-bezier(0.19,1,0.22,1)" }}
                />
              </Lens>
            </div>
          </Reveal>

          {/* Right — Text */}
          <Reveal delay={150}>
            <span className="eyebrow">Quality Promise</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl">
              Quality in <span className="italic">Every Stitch.</span>
            </h2>
            <p className="mt-6 text-[16px] font-medium leading-[1.85] text-ink-soft">
              At Zardosi Atelier, quality is built into every stage of production. From material selection and embroidery detailing to finishing, measurement and final inspection, every order undergoes careful quality control before dispatch. Our focus is not merely on producing beautiful embroidery, but on delivering consistency, durability and precision across every piece and every production batch.
            </p>
            <p className="mt-5 text-[16px] font-medium leading-[1.85] text-ink-soft">
              Whether you require bespoke embroidery, private-label manufacturing, sampling, small-batch development or bulk production, Zardosi Atelier offers the craftsmanship, flexibility and attention to detail needed to bring your designs to life.
            </p>

            {/* Pull-quote */}
            <blockquote
              className="mt-10 border-l-[3px] pl-6 py-1"
              style={{ borderColor: "#C9A84C" }}
            >
              <p
                className="font-serif text-[19px] italic leading-[1.65]"
                style={{ color: "#7A5C28" }}
              >
                "Traditional craftsmanship. International quality. Embroidery made for exceptional brands."
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── CTA Band ── kept exactly as-is ─────── */}
      <CTABand />
    </PageShell>
  );
}
