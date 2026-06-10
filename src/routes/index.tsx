import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";

import heroEmbroidery from "@/assets/hero-embroidery.jpg";
import collectionGown from "@/assets/collection-gown.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionHandbag from "@/assets/collection-handbag.jpg";
import techniqueAari from "@/assets/technique-aari.jpg";
import techniqueCrystal from "@/assets/technique-crystal.jpg";
import technique3d from "@/assets/technique-3d.jpg";
import techniqueBead from "@/assets/technique-bead.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

// ... later in JSX
                {heroVideo?.url ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={heroEmbroidery}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                    onError={(e) => {
                      const video = e.currentTarget as HTMLVideoElement;
                      video.style.display = "none";
                    }}
                  >
                    <source src={heroVideo.url} type="video/mp4" />
                    {/* Fallback text */}
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={heroEmbroidery}
                    alt="Hero"
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                )}

// later in JSX use src={heroVideo}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Auréline — Luxury Hand Embroidery & Couture Manufacturing" },
      {
        name: "description",
        content:
          "Maison Auréline is a luxury hand embroidery atelier serving global fashion houses — from couture sampling to production-scale execution.",
      },
      { property: "og:title", content: "Maison Auréline — Luxury Hand Embroidery Atelier" },
      {
        property: "og:description",
        content:
          "Couture-level hand embroidery, beadwork, zardosi and crystal work for the world's most discerning fashion houses.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroEmbroidery },
      { property: "twitter:image", content: heroEmbroidery },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const collection = [
  {
    title: "La Sérénade",
    caption: "Couture Gowns · Gold Zardosi",
    image: collectionGown,
    aspect: "3/4",
  },
  {
    title: "Veil of Pearls",
    caption: "Bridal Couture · Crystal & Pearl",
    image: collectionBridal,
    aspect: "3/4",
  },
  {
    title: "Petit Bijou",
    caption: "Luxury Accessories · Mixed Media",
    image: collectionHandbag,
    aspect: "3/4",
  },
];

const techniques = [
  {
    name: "Zardosi",
    desc: "Antique gold metallic thread, hand-laid in relief.",
    image: heroEmbroidery,
  },
  { name: "Aari", desc: "Fine hook needlework on stretched silk frames.", image: techniqueAari },
  {
    name: "Crystal Work",
    desc: "Hand-set faceted crystals across couture surfaces.",
    image: techniqueCrystal,
  },
  {
    name: "3D Embroidery",
    desc: "Dimensional silk petals, sculpted appliqués.",
    image: technique3d,
  },
  {
    name: "Beadwork",
    desc: "Glass beads and freshwater pearls, individually applied.",
    image: techniqueBead,
  },
  {
    name: "Mixed Media",
    desc: "Composed surfaces of sequin, thread and embellishment.",
    image: portfolio6,
  },
];

const whyChoose = [
  {
    title: "30+ Master Artisans",
    desc: "Multi-generational embroiderers led by atelier directors.",
  },
  { title: "Sampling to Production", desc: "From a single swatch to scaled production runs." },
  { title: "Couture-Level Quality", desc: "Calibrated to haute couture finishing standards." },
  { title: "Flexible Order Quantities", desc: "From bespoke editions to commercial runs." },
  { title: "Global Export Experience", desc: "Documented logistics into Paris, Milan, New York." },
  {
    title: "Design Confidentiality",
    desc: "NDA-protected studio with restricted access protocols.",
  },
  {
    title: "Custom Design Execution",
    desc: "Translation of mood boards into technical embroidery.",
  },
  { title: "Fast Sampling", desc: "Initial swatches within 7–14 days of brief lock." },
];

const process = [
  {
    n: "01",
    title: "Share Design",
    desc: "Sketches, tech packs or mood boards via our secure client portal.",
  },
  {
    n: "02",
    title: "Technical Review",
    desc: "Material feasibility, stitch density, and production timing.",
  },
  { n: "03", title: "Sampling", desc: "Precision swatches or full prototypes for approval." },
  { n: "04", title: "Approval", desc: "Sign-off on embellishment, colour accuracy and material." },
  { n: "05", title: "Production", desc: "Hand-executed manufacturing by dedicated artisan pods." },
  {
    n: "06",
    title: "Global Delivery",
    desc: "Insured logistics directly to your studio or factory.",
  },
];

const portfolio = [
  { src: portfolio1, tag: "Couture · Zardosi", caption: "Embroidered Evening Cape" },
  { src: portfolio4, tag: "Bridal · Lace Border", caption: "Lace-Bordered Bridal Veil" },
  { src: portfolio6, tag: "Couture · 3D Florals", caption: "Cascading Petal Skirt" },
  { src: portfolio5, tag: "Atelier · Process", caption: "Hand-set Gold Thread Study" },
  { src: portfolio3, tag: "Accessory · Crystal", caption: "All-Over Crystal Minaudière" },
  { src: portfolio2, tag: "Menswear · Tonal", caption: "Tonal Lapel Detail" },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroEmbroidery}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            onError={(e) => {
              const video = e.currentTarget as HTMLVideoElement;
              video.style.display = "none";
            }}
          >
            <source src={heroVideo.url} type="video/mp4" />
          </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <p
              className="eyebrow !text-gold-soft animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              Maison · Atelier · Established
            </p>
            <h1
              className="mt-8 font-serif text-[40px] leading-[1.05] text-ivory sm:text-6xl lg:text-[78px] text-balance animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              Luxury Hand Embroidery <br className="hidden sm:block" />
              <span className="italic font-normal">for Global Maisons</span>
            </h1>
            <p
              className="mx-auto mt-8 max-w-[58ch] text-base sm:text-lg text-ivory/80 leading-relaxed animate-fade-up"
              style={{ animationDelay: "500ms" }}
            >
              From couture sampling to production-scale execution, we transform fashion concepts
              into luxury embroidered masterpieces.
            </p>
            <div
              className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "700ms" }}
            >
              <Link
                to="/contact"
                className="border border-gold bg-gold px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:bg-transparent hover:text-ivory"
              >
                Request Quote
              </Link>
              <Link
                to="/contact"
                className="border border-ivory/40 px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:bg-ivory hover:text-ink"
              >
                Send Your Design
              </Link>
              <Link
                to="/portfolio"
                className="px-2 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory gold-link"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-ivory/15 bg-ink/30 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px md:grid-cols-4">
            {[
              ["30+", "Master Artisans"],
              ["Sampling", "To Production"],
              ["Global", "Export Standards"],
              ["Couture", "Quality Controlled"],
            ].map(([k, v]) => (
              <div key={v} className="px-6 py-6 text-center">
                <div className="font-serif italic text-lg sm:text-xl text-gold-soft">{k}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-ivory/60">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="eyebrow">Chapter 01 — Featured</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Couture artistry for the <br />
                world's finest <span className="italic">maisons</span>.
              </h2>
            </div>
            <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.3em] gold-link">
              View All Collections →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
            {collection.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 120}
                className={`group cursor-pointer ${i === 1 ? "lg:mt-24" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-linen luxury-card">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1366}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-2xl">{c.title}</h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                    {c.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE EMBROIDER */}
      <section className="bg-champagne py-28 sm:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">Chapter 02 — Discipline</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              What we <span className="italic">embroider</span>.
            </h2>
            <p className="mt-6 max-w-[52ch] text-ink-soft">
              Couture eveningwear, bridal, womenswear, menswear, accessories and individual luxury
              components — finished to the standards of the ateliers we serve.
            </p>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {[
              { label: "Couture & Eveningwear", img: portfolio1, span: "row-span-2 aspect-[3/4]" },
              { label: "Bridalwear", img: portfolio4, span: "aspect-square" },
              { label: "Womenswear", img: portfolio6, span: "aspect-square" },
              { label: "Menswear", img: portfolio2, span: "aspect-[3/2]" },
              { label: "Handbags & Accessories", img: portfolio3, span: "aspect-[3/2]" },
              { label: "Luxury Components", img: techniqueAari, span: "aspect-square" },
              { label: "Patches & Motifs", img: techniqueCrystal, span: "aspect-square" },
            ].map((it, i) => (
              <Reveal
                key={it.label}
                delay={i * 80}
                className={`group relative overflow-hidden ${it.span}`}
              >
                <img
                  src={it.img}
                  alt={it.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0">
                  <p className="p-5 text-[10px] uppercase tracking-[0.28em] text-ivory">
                    {it.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMBROIDERY TECHNIQUES */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Chapter 03 — Vocabulary</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              The vocabulary of <span className="italic">embroidery</span>.
            </h2>
            <div className="hairline mt-10 w-32 mx-auto" />
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {techniques.map((t, i) => (
              <Reveal
                key={t.name}
                delay={(i % 3) * 100}
                className="group relative overflow-hidden bg-ivory"
              >
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.08]"
                  />
                </div>
                <div className="p-8">
                  <span className="font-serif italic text-2xl text-gold">{t.name}</span>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BRANDS CHOOSE US */}
      <section className="bg-linen py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
            <div className="lg:w-2/5">
              <span className="eyebrow">Chapter 04 — Standards</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Why brands <br />
                <span className="italic">choose us</span>.
              </h2>
            </div>
            <p className="lg:w-3/5 text-lg text-ink-soft leading-relaxed lg:pt-12">
              For over two decades our studio has translated the most demanding creative briefs into
              surfaces that hold up to runway scrutiny — hand by hand, sample by sample, season by
              season.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={(i % 4) * 80} className="group">
                <div className="hairline w-12 mb-6" />
                <h3 className="font-serif text-xl">{w.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-ink text-ivory py-28 sm:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Chapter 05 — Methodology</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ivory">
              The path to <span className="italic">production</span>.
            </h2>
          </Reveal>

          <div className="mt-24 relative">
            <div className="absolute left-0 right-0 top-[42px] hidden lg:block h-px bg-ivory/10" />
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
              {process.map((p, i) => (
                <Reveal key={p.n} delay={i * 100} className="relative text-center lg:px-4">
                  <div className="mx-auto grid size-[84px] place-items-center rounded-full bg-ink ring-1 ring-ivory/15 relative z-10">
                    <span className="font-serif text-xl text-gold italic">{p.n}</span>
                  </div>
                  <h4 className="mt-6 font-serif text-xl text-ivory">{p.title}</h4>
                  <p className="mt-3 text-xs text-ivory/55 leading-relaxed">{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO MASONRY */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="eyebrow">Chapter 06 — Portfolio</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Selected <span className="italic">work</span>.
              </h2>
            </div>
            <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.3em] gold-link">
              Full Archive →
            </Link>
          </Reveal>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {portfolio.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
                <div className="group relative overflow-hidden luxury-card">
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="p-6">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-soft">
                        {p.tag}
                      </p>
                      <h4 className="mt-2 font-serif text-2xl text-ivory">{p.caption}</h4>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD GEN */}
      <LeadSection />
    </SiteShell>
  );
}

function LeadSection() {
  return (
    <section className="bg-champagne py-28 sm:py-40" id="quote">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Chapter 07 — Begin</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
              Get a free embroidery <span className="italic">feasibility review</span>.
            </h2>
            <p className="mt-8 text-lg text-ink-soft leading-relaxed max-w-[48ch]">
              Share your design and our master artisans will respond with technique guidance, cost
              direction, and a sampling timeline — within two working days.
            </p>
            <ul className="mt-10 space-y-4 text-sm">
              {[
                "Technique recommendations",
                "Cost guidance",
                "Production feasibility",
                "Sampling suggestions",
                "Estimated timeline",
              ].map((b) => (
                <li key={b} className="flex items-center gap-4">
                  <span className="w-8 h-px bg-gold" />
                  <span className="uppercase tracking-[0.2em] text-xs text-ink-soft">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <form
              className="bg-ivory p-8 sm:p-12 ring-1 ring-ink/5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. Our atelier will be in touch within two working days.");
              }}
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field label="Full Name" name="name" />
                <Field label="Brand / Maison" name="brand" />
                <Field label="Country" name="country" />
                <Field label="Email" type="email" name="email" />
                <Field label="WhatsApp" name="whatsapp" />
                <Field label="Upload Design" type="file" name="file" />
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft block mb-2">
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full border-b border-ink/15 bg-transparent py-2 text-sm focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-10 w-full border border-ink bg-ink px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-gold hover:border-gold"
              >
                Request Quote
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft block mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={type !== "file"}
        className="w-full border-b border-ink/15 bg-transparent py-2 text-sm focus:border-gold focus:outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold"
      />
    </div>
  );
}
