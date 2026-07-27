$stylesPath = "src/styles.css"
$styles = Get-Content -Raw $stylesPath

$marker = "@utility grain-overlay {"
$insert = @'

.hero-glass-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 32px;
  box-shadow:
    0 40px 90px rgba(0, 0, 0, 0.22),
    0 15px 50px rgba(212, 175, 55, 0.12);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  transform:
    perspective(1600px)
    rotateX(var(--hero-rotate-x, 0deg))
    rotateY(var(--hero-rotate-y, 0deg))
    translateY(var(--hero-shift-y, 0px));
  transition:
    transform 320ms cubic-bezier(0.19, 1, 0.22, 1),
    box-shadow 320ms cubic-bezier(0.19, 1, 0.22, 1),
    border-color 320ms ease;
  animation:
    hero-card-float 6s ease-in-out infinite,
    fade-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.18) 24%, rgba(255, 255, 255, 0.04) 54%, rgba(255, 255, 255, 0.18) 100%);
  pointer-events: none;
  z-index: 0;
}

.hero-glass-card::after {
  content: "";
  position: absolute;
  top: -18%;
  left: -40%;
  width: 42%;
  height: 140%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 48%, rgba(255,255,255,0) 100%);
  transform: rotate(16deg);
  opacity: 0.72;
  pointer-events: none;
  z-index: 0;
  animation: hero-card-sweep 6s ease-in-out infinite;
}

.hero-glass-card:hover {
  border-color: rgba(212, 175, 55, 0.34);
  box-shadow:
    0 48px 110px rgba(0, 0, 0, 0.24),
    0 24px 65px rgba(212, 175, 55, 0.18);
}

.hero-card-inner {
  position: relative;
  z-index: 1;
}

.hero-corner-ornament {
  position: absolute;
  width: 86px;
  height: 86px;
  pointer-events: none;
  opacity: 0.72;
  z-index: 1;
}

.hero-corner-ornament::before,
.hero-corner-ornament::after {
  content: "";
  position: absolute;
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.9), rgba(212, 175, 55, 0.16));
}

.hero-corner-ornament::before {
  width: 62px;
  height: 1px;
}

.hero-corner-ornament::after {
  width: 1px;
  height: 62px;
}

.hero-corner-ornament.top-left {
  top: 22px;
  left: 22px;
}

.hero-corner-ornament.top-left::before,
.hero-corner-ornament.top-left::after {
  top: 0;
  left: 0;
}

.hero-corner-ornament.bottom-right {
  right: 22px;
  bottom: 22px;
}

.hero-corner-ornament.bottom-right::before,
.hero-corner-ornament.bottom-right::after {
  right: 0;
  bottom: 0;
}

.hero-gold-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(212, 175, 55, 0) 0%, rgba(212, 175, 55, 0.58) 18%, rgba(212, 175, 55, 0.28) 100%);
}

.hero-feature-pill {
  border: 1px solid rgba(212, 175, 55, 0.18);
  background: rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

@keyframes hero-card-float {
  0%, 100% {
    transform:
      perspective(1600px)
      rotateX(var(--hero-rotate-x, 0deg))
      rotateY(var(--hero-rotate-y, 0deg))
      translateY(0);
  }
  50% {
    transform:
      perspective(1600px)
      rotateX(var(--hero-rotate-x, 0deg))
      rotateY(var(--hero-rotate-y, 0deg))
      translateY(-8px);
  }
}

@keyframes hero-card-sweep {
  0%, 100% {
    transform: translateX(-24%) rotate(16deg);
    opacity: 0;
  }
  14% {
    opacity: 0;
  }
  35% {
    opacity: 0.72;
  }
  55% {
    transform: translateX(290%) rotate(16deg);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero-glass-card {
    border-radius: 28px;
  }

  .hero-corner-ornament {
    width: 64px;
    height: 64px;
  }

  .hero-corner-ornament::before {
    width: 46px;
  }

  .hero-corner-ornament::after {
    height: 46px;
  }
}

'@

if (-not $styles.Contains(".hero-glass-card")) {
  $styles = $styles.Replace($marker, $insert + $marker)
}

Set-Content -Path $stylesPath -Value $styles

$indexPath = "src/routes/index.tsx"
$index = Get-Content -Raw $indexPath

$old = @'
        <div className="relative z-10 flex min-h-screen items-start px-7 pb-28 pt-20 sm:px-12 sm:pt-24 lg:px-[88px] lg:pt-[96px] xl:px-[104px] xl:pt-[104px]">
          <div
            className="w-full max-w-[760px] animate-fade-in rounded-[28px] text-left"
            style={{
              background:
                "linear-gradient(145deg, rgba(252, 248, 242, 0.97) 0%, rgba(246, 239, 229, 0.965) 50%, rgba(236, 226, 214, 0.96) 100%)",
              border: "1px solid rgba(205, 165, 106, 0.28)",
              boxShadow:
                "0 24px 70px rgba(86, 55, 24, 0.14), 0 8px 24px rgba(86, 55, 24, 0.08), inset 0 1px 0 rgba(255,255,255,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="px-7 py-8 text-left sm:px-9 sm:py-10 lg:px-10 lg:py-10">
              <div className="flex items-center gap-3">
                <p className="animate-fade-up text-left font-sans text-[12px] font-medium uppercase tracking-[0.34em] text-[#C7A26A] sm:text-[13px]">
                  Haute Couture Embroidery - India
                </p>
                <span className="hidden h-px flex-1 bg-gradient-to-r from-[#D4B06A]/50 to-transparent sm:block" />
                <span className="hidden text-[#D4B06A] sm:block">+</span>
              </div>
              <h1
                className="mt-7 max-w-[640px] animate-fade-up text-left font-serif text-[#1B130E] sm:text-[48px] lg:text-[58px]"
                style={{
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.6px",
                  textShadow: "none",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  animationDuration: "0.8s",
                  animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                Hand embroidery
                <br />
                for the world's <span style={{ color: "#C7A26A", fontStyle: "italic", fontWeight: 400, textShadow: "none" }}>finest</span>
                <br />
                labels.
              </h1>
              <p className="mt-7 max-w-[560px] animate-fade-up text-left font-sans text-[15px] font-normal leading-[1.8] text-[#4D3F35] sm:text-[16px] lg:text-[17px]">
                We craft and export luxury embroidered pieces for couture houses, designers and
                premium brands. Every stitch is finished by master karigars and checked twice
                before it ships.
              </p>
              <p
                className="mt-10 animate-fade-up text-left text-[#C7A26A]/95"
                style={{
                  fontFamily: '"Instrument Serif", "Times New Roman", serif',
                  fontStyle: "italic",
                  fontSize: "18px",
                  lineHeight: 1.55,
                }}
              >
                Patches / Bags / Headbands / Gowns / Bespoke commissions
              </p>
              <div className="mt-10 flex flex-nowrap items-center gap-2.5">
                <Link
                  to="/contact"
                  className="inline-flex h-[48px] min-w-[188px] items-center justify-center gap-2 rounded-[10px] border border-[#CDA56A] bg-[#CDA56A] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#120c09] shadow-[0_10px_24px_rgba(205,165,106,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Start With a Sample</span>
                </Link>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex h-[48px] min-w-[188px] items-center justify-center gap-2 rounded-[10px] border border-[#9A8168]/55 bg-white/58 px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#241913] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"
                >
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Call the Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>
'@

$new = @'
        <div className="relative z-10 flex min-h-screen items-start px-5 pb-28 pt-20 sm:px-10 sm:pt-24 lg:px-[84px] lg:pt-[92px] xl:px-[102px] xl:pt-[100px]">
          <div
            className="hero-glass-card w-full max-w-[760px] text-left lg:max-w-[680px] xl:max-w-[760px]"
            onMouseMove={(event) => {
              const target = event.currentTarget as HTMLDivElement;
              const bounds = target.getBoundingClientRect();
              const offsetX = event.clientX - bounds.left;
              const offsetY = event.clientY - bounds.top;
              const rotateY = ((offsetX / bounds.width) - 0.5) * 5.5;
              const rotateX = (0.5 - (offsetY / bounds.height)) * 5.5;
              target.style.setProperty("--hero-rotate-x", `${rotateX.toFixed(2)}deg`);
              target.style.setProperty("--hero-rotate-y", `${rotateY.toFixed(2)}deg`);
            }}
            onMouseLeave={(event) => {
              const target = event.currentTarget as HTMLDivElement;
              target.style.setProperty("--hero-rotate-x", "0deg");
              target.style.setProperty("--hero-rotate-y", "0deg");
            }}
          >
            <span className="hero-corner-ornament top-left" />
            <span className="hero-corner-ornament bottom-right" />

            <div className="hero-card-inner px-7 py-7 sm:px-10 sm:py-10 lg:px-12 lg:py-[60px]">
              <div className="flex items-center gap-4">
                <p className="animate-fade-up text-left font-sans text-[14px] font-medium uppercase tracking-[0.26em] text-[#D4AF37] sm:text-[16px] lg:text-[18px]">
                  Haute Couture Embroidery - India
                </p>
                <span className="hero-gold-divider hidden sm:block" />
                <span className="hidden text-lg text-[#D4AF37] sm:block">+</span>
              </div>

              <h1
                className="mt-7 max-w-[640px] animate-fade-up text-left font-serif text-[#17110D] text-[54px] sm:text-[72px] lg:text-[88px]"
                style={{
                  fontWeight: 600,
                  lineHeight: 0.94,
                  letterSpacing: "-2px",
                  textShadow: "none",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                Hand embroidery
                <br />
                for the world's{" "}
                <span
                  style={{
                    color: "#D4AF37",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                  }}
                >
                  finest
                </span>
                <br />
                labels.
              </h1>

              <p className="mt-8 max-w-[90%] animate-fade-up font-sans text-[20px] font-medium leading-[1.8] text-[#3B342F] lg:text-[28px]">
                We craft and export luxury embroidered pieces for couture houses, designers and
                premium brands. Every stitch is finished by master karigars and checked twice
                before it ships.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Crown, label: "Master Craftsmanship" },
                  { icon: Diamond, label: "Luxury Quality" },
                  { icon: Globe, label: "Global Export" },
                  { icon: ShieldCheck, label: "Double Checked" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="hero-feature-pill flex min-h-[72px] items-center gap-3 rounded-[18px] px-4 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/28 bg-white/40 text-[#C49A43]">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A4C42]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className="mt-8 animate-fade-up text-left text-[#B89042]"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  lineHeight: 1.5,
                  wordSpacing: "20px",
                }}
              >
                Patches Bags Headbands Gowns Bespoke commissions
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
                <Link
                  to="/contact"
                  className="inline-flex h-[70px] w-full items-center justify-center gap-3 rounded-[18px] px-9 text-[18px] font-medium uppercase tracking-[0.16em] text-[#120c09] shadow-[0_18px_38px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_56px_rgba(212,175,55,0.34)] sm:w-auto sm:text-[22px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #E4C27A 0%, #D4AF37 55%, #C5952E 100%)",
                  }}
                >
                  <ArrowUpRight className="h-4.5 w-4.5 shrink-0" strokeWidth={1.7} />
                  <span className="whitespace-nowrap">Start With a Sample</span>
                </Link>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex h-[70px] w-full items-center justify-center gap-3 rounded-[18px] border border-white/70 bg-white/58 px-9 text-[18px] font-medium uppercase tracking-[0.16em] text-[#241913] shadow-[0_12px_36px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/70 hover:shadow-[0_24px_56px_rgba(212,175,55,0.18)] sm:w-auto sm:text-[22px]"
                >
                  <PhoneCall className="h-4.5 w-4.5 shrink-0" strokeWidth={1.7} />
                  <span className="whitespace-nowrap">Call the Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>
'@

$index = $index.Replace($old, $new)

Set-Content -Path $indexPath -Value $index
