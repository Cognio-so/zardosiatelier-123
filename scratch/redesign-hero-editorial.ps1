$indexPath = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\routes\index.tsx"
$indexText = Get-Content -LiteralPath $indexPath -Raw

$oldBlock = @'
        {/* Cinematic Dark Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Content Area with anchored left veil */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-full max-w-[980px] backdrop-blur-[22px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,6,5,0.88) 0%, rgba(13,10,8,0.72) 38%, rgba(18,12,9,0.48) 68%, rgba(18,12,9,0.08) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[52vw] min-w-[320px] max-w-[760px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,8,6,0.9) 0%, rgba(11,8,6,0.76) 44%, rgba(11,8,6,0.36) 82%, rgba(11,8,6,0) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pt-32">
          <div
            className="relative w-full max-w-[800px] overflow-hidden border border-white/7 px-8 py-10 backdrop-blur-[14px] sm:px-12 sm:py-12 lg:px-16 lg:py-16 animate-fade-in"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,13,10,0.58) 0%, rgba(17,13,10,0.42) 54%, rgba(17,13,10,0.28) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 -left-24 w-[58%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,6,5,0.52) 0%, rgba(8,6,5,0.24) 58%, rgba(8,6,5,0) 100%)",
              }}
            />
            <div>
              <p className="animate-fade-up font-sans text-[13px] font-medium uppercase tracking-[0.42em] text-[#C7A26A]/88 sm:text-[14px]">
                Haute Couture Embroidery - India
              </p>
              <h1
                className="mt-7 max-w-[820px] animate-fade-up font-serif text-[46px] font-normal leading-[0.9] tracking-[-0.055em] text-[#F7F4EF] sm:text-[64px] md:text-[80px] xl:text-[96px]"
                style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "0 1px 18px rgba(0, 0, 0, 0.18)", animationDuration: "0.8s", animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
              >
                Hand embroidery
                <br />
                for the world's <span className="font-normal italic text-[#C7A26A]">finest</span>
                <br />
                labels.
              </h1>
              <p className="mt-10 max-w-[620px] animate-fade-up font-sans text-[19px] font-light leading-[1.8] text-[#DDD8D2]/90 sm:text-[21px] lg:text-[22px]">
                We craft and export luxury embroidered pieces for couture houses, designers and
                premium brands. Every stitch is finished by master karigars and checked twice
                before it ships.
              </p>
              <p className="mt-9 animate-fade-up font-serif text-[18px] italic font-normal leading-[1.6] text-[#C7A26A]/92 sm:text-[20px]">
                Patches / Bags / Headbands / Gowns / Bespoke commissions
              </p>
              <div className="mt-12 flex flex-nowrap items-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#CDA56A] bg-[#CDA56A] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] shadow-[0_10px_30px_rgba(205,165,106,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(205,165,106,0.28)] sm:px-7"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Start With a Sample</span>
                </Link>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/20 bg-white/6 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:px-6"
                >
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Call the Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>
'@

$newBlock = @'
        {/* Editorial readability overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,7,5,0.3) 0%, rgba(10,7,5,0.18) 32%, rgba(10,7,5,0.12) 58%, rgba(10,7,5,0.24) 100%), linear-gradient(180deg, rgba(10,7,5,0.22) 0%, rgba(10,7,5,0.12) 36%, rgba(10,7,5,0.28) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-start px-7 pb-28 pt-20 sm:px-12 sm:pt-24 lg:px-[88px] lg:pt-[96px] xl:px-[104px] xl:pt-[104px]">
          <div
            className="w-full max-w-[720px] animate-fade-in text-left"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "none",
              boxShadow: "none",
              backdropFilter: "none",
            }}
          >
            <div className="px-0 py-0 text-left">
              <p className="animate-fade-up text-left font-sans text-[12px] font-medium uppercase tracking-[0.34em] text-[#C7A26A] sm:text-[13px]">
                Haute Couture Embroidery - India
              </p>
              <h1
                className="mt-8 max-w-[700px] animate-fade-up text-left text-[#F7F4EF] sm:text-[72px] lg:text-[92px]"
                style={{
                  fontFamily: '"Instrument Serif", "Times New Roman", serif',
                  fontWeight: 400,
                  lineHeight: 0.92,
                  letterSpacing: "-2px",
                  textShadow: "none",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  animationDuration: "0.8s",
                  animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
              >
                Hand embroidery
                <br />
                for the world's <span style={{ color: "#C7A26A", fontStyle: "italic", textShadow: "none" }}>finest</span>
                <br />
                labels.
              </h1>
              <p className="mt-9 max-w-[580px] animate-fade-up text-left font-sans text-[18px] font-light leading-[1.75] text-white/82 sm:text-[20px] lg:text-[22px]">
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
              <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex h-[58px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Start With a Sample</span>
                </Link>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex h-[58px] items-center justify-center gap-2 rounded-[8px] border border-white/28 bg-transparent px-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"
                >
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Call the Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>
'@

if (-not $indexText.Contains($oldBlock.Trim())) {
  throw "Hero block not found"
}

$indexText = $indexText.Replace($oldBlock.Trim(), $newBlock.Trim())
$indexText = $indexText.Replace('className="absolute inset-0 h-full w-full object-cover opacity-70"', 'className="absolute inset-0 h-full w-full object-cover opacity-85"')
$indexText = $indexText.Replace('className="absolute inset-0 h-full w-full object-cover"', 'className="absolute inset-0 h-full w-full object-cover brightness-[1.08]"')
Set-Content -LiteralPath $indexPath -Value $indexText

$rootPath = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\routes\__root.tsx"
$rootText = Get-Content -LiteralPath $rootPath -Raw
$oldFont = '        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap",'
$newFont = '        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",'
if ($rootText.Contains($oldFont)) {
  $rootText = $rootText.Replace($oldFont, $newFont)
}
Set-Content -LiteralPath $rootPath -Value $rootText
