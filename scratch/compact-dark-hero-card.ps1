$stylesPath = "src/styles.css"
$styles = Get-Content -Raw $stylesPath

$styles = $styles.Replace(
@'
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
'@,
@'
.hero-glass-card {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  background: rgba(28, 18, 12, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.16);
  border-radius: 24px;
  box-shadow:
    0 26px 70px rgba(0, 0, 0, 0.28),
    0 10px 28px rgba(212, 175, 55, 0.08);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
'@
)

$styles = $styles.Replace(
@'
.hero-glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.18) 24%, rgba(255, 255, 255, 0.04) 54%, rgba(255, 255, 255, 0.18) 100%);
  pointer-events: none;
  z-index: 0;
}
'@,
@'
.hero-glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(212, 175, 55, 0.03) 28%, rgba(255, 255, 255, 0.01) 58%, rgba(255, 255, 255, 0.03) 100%);
  pointer-events: none;
  z-index: 0;
}
'@
)

$styles = $styles.Replace(
@'
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
'@,
@'
.hero-glass-card::after {
  content: "";
  position: absolute;
  top: -18%;
  left: -40%;
  width: 42%;
  height: 140%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(212,175,55,0.08) 48%, rgba(255,255,255,0) 100%);
  transform: rotate(16deg);
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
  animation: hero-card-sweep 6s ease-in-out infinite;
}
'@
)

$styles = $styles.Replace(
@'
.hero-glass-card:hover {
  border-color: rgba(212, 175, 55, 0.34);
  box-shadow:
    0 48px 110px rgba(0, 0, 0, 0.24),
    0 24px 65px rgba(212, 175, 55, 0.18);
}
'@,
@'
.hero-glass-card:hover {
  border-color: rgba(212, 175, 55, 0.24);
  box-shadow:
    0 34px 80px rgba(0, 0, 0, 0.3),
    0 16px 42px rgba(212, 175, 55, 0.12);
}
'@
)

$styles = $styles.Replace('    width: 500px !important;','    width: 560px !important;')
$styles = $styles.Replace('    max-width: 500px !important;','    max-width: 560px !important;')

Set-Content -Path $stylesPath -Value $styles

$indexPath = "src/routes/index.tsx"
$index = Get-Content -Raw $indexPath

$index = $index.Replace(
'            className="hero-glass-card w-full max-w-[760px] text-left lg:max-w-[680px] xl:max-w-[760px]"',
'            className="hero-glass-card w-full max-w-[620px] text-left lg:max-w-[620px] xl:max-w-[620px]"'
)

$index = $index.Replace(
'            <div className="hero-card-inner px-7 py-7 sm:px-10 sm:py-10 lg:px-12 lg:py-[60px]">',
'            <div className="hero-card-inner px-7 py-7 sm:px-8 sm:py-8 lg:px-8 lg:py-8">'
)

$index = $index.Replace(
'                <p className="animate-fade-up text-left font-sans text-[14px] font-medium uppercase tracking-[0.26em] text-[#D4AF37] sm:text-[16px] lg:text-[18px]">',
'                <p className="animate-fade-up text-left font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-[#D4AF37] sm:text-[13px] lg:text-[14px]">'
)

$index = $index.Replace(
'                className="mt-7 max-w-[640px] animate-fade-up text-left font-serif text-[#17110D] text-[54px] sm:text-[72px] lg:text-[88px]"',
'                className="mt-7 max-w-[520px] animate-fade-up text-left font-serif text-white text-[52px] sm:text-[56px] lg:text-[60px]"'
)

$index = $index.Replace('                  fontWeight: 600,','                  fontWeight: 500,')
$index = $index.Replace('                  lineHeight: 0.94,','                  lineHeight: 1.02,')
$index = $index.Replace(
'                    color: "#D4AF37",',
'                    color: "#D4AF37",'
)

$index = $index.Replace(
'              <p className="mt-8 max-w-[90%] animate-fade-up font-sans text-[20px] font-medium leading-[1.8] text-[#3B342F] lg:text-[28px]">',
'              <p className="mt-7 max-w-[92%] animate-fade-up font-sans text-[15px] font-medium leading-[1.7] text-white/84 lg:text-[16px]">'
)

$index = $index.Replace(
'                className="mt-8 animate-fade-up text-left text-[#B89042]"',
'                className="mt-8 animate-fade-up text-left text-[#B89042]"'
)

$index = $index.Replace(
'                  fontSize: "clamp(18px, 2vw, 24px)",',
'                  fontSize: "20px",'
)

$index = $index.Replace(
'              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">',
'              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">'
)

$index = $index.Replace(
'                  className="inline-flex h-[70px] w-full items-center justify-center gap-3 rounded-[18px] px-9 text-[18px] font-medium uppercase tracking-[0.16em] text-[#120c09] shadow-[0_18px_38px_rgba(212,175,55,0.22)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_28px_56px_rgba(212,175,55,0.34)] sm:w-auto sm:text-[22px]"',
'                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#120c09] shadow-[0_10px_24px_rgba(212,175,55,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(212,175,55,0.24)] sm:w-auto sm:text-[12px]"'
)

$index = $index.Replace(
'                  className="inline-flex h-[70px] w-full items-center justify-center gap-3 rounded-[18px] border border-white/70 bg-white/58 px-9 text-[18px] font-medium uppercase tracking-[0.16em] text-[#241913] shadow-[0_12px_36px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/70 hover:shadow-[0_24px_56px_rgba(212,175,55,0.18)] sm:w-auto sm:text-[22px]"',
'                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-white/18 bg-white/[0.02] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto sm:text-[12px]"'
)

Set-Content -Path $indexPath -Value $index
