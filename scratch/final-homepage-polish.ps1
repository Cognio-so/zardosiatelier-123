$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'                Handcrafted techniques for couture collections.',
'                A vocabulary of luxury hand-craft.'
)

$content = $content.Replace(
'                "linear-gradient(145deg, rgba(36, 24, 17, 0.96) 0%, rgba(29, 19, 13, 0.95) 45%, rgba(21, 14, 10, 0.94) 100%)",',
'                "linear-gradient(145deg, rgba(28, 18, 12, 0.985) 0%, rgba(24, 15, 10, 0.98) 48%, rgba(18, 11, 8, 0.975) 100%)",'
)

$content = $content.Replace(
'              border: "1px solid rgba(199, 162, 106, 0.18)",',
'              border: "1px solid rgba(199, 162, 106, 0.2)",'
)

$content = $content.Replace(
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-sans text-[#F7F4EF] sm:text-[56px] lg:text-[72px]"',
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-serif text-[#F7F4EF] sm:text-[54px] lg:text-[68px]"'
)

$content = $content.Replace(
@'
                style={{
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: "-1.4px",
                  textShadow: "none",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  animationDuration: "0.8s",
                  animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
'@,
@'
                style={{
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: "-1px",
                  textShadow: "none",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  animationDuration: "0.8s",
                  animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
                }}
'@
)

$content = $content.Replace(
'                for the world''s <span style={{ color: "#C7A26A", fontStyle: "normal", fontWeight: 600, textShadow: "none" }}>finest</span>',
'                for the world''s <span style={{ color: "#C7A26A", fontStyle: "italic", fontWeight: 400, textShadow: "none" }}>finest</span>'
)

$content = $content.Replace(
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[17px] font-normal leading-[1.7] text-white/82 sm:text-[18px] lg:text-[20px]">',
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[16px] font-normal leading-[1.75] text-white/82 sm:text-[17px] lg:text-[18px]">'
)

$content = $content.Replace(
'              <div className="mt-10 flex flex-wrap items-center gap-3">',
'              <div className="mt-10 flex flex-nowrap items-center gap-3">'
)

$content = $content.Replace(
'                  className="inline-flex h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-6 text-[9px] font-medium uppercase tracking-[0.2em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"',
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"'
)

$content = $content.Replace(
'                  className="inline-flex h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-6 text-[9px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"'
)

$content = $content.Replace(
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[11px] font-bold uppercase tracking-[0.34em] text-ivory/85 sm:text-[12px]">',
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[12px] font-bold uppercase tracking-[0.34em] text-ivory/85 sm:text-[13px]">'
)

$content = $content.Replace(
'                <div className="font-serif text-[62px] sm:text-[84px] md:text-[96px] font-light leading-none text-[#D4AF37]">',
'                <div className="font-serif text-[52px] sm:text-[68px] md:text-[78px] font-light leading-none text-[#D4AF37]">'
)

$content = $content.Replace(
'                <div className="font-serif text-[48px] sm:text-[62px] md:text-[72px] italic font-light leading-none text-[#D4AF37]">',
'                <div className="font-serif text-[38px] sm:text-[48px] md:text-[56px] italic font-light leading-none text-[#D4AF37]">'
)

Set-Content -Path $path -Value $content
