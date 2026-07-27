$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'                className="mt-8 max-w-[700px] animate-fade-up text-left text-[#F7F4EF] sm:text-[72px] lg:text-[92px]"',
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-sans text-[#F7F4EF] sm:text-[56px] lg:text-[72px]"'
)

$content = $content.Replace(
@'
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
'@,
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
'@
)

$content = $content.Replace(
'                for the world''s <span style={{ color: "#C7A26A", fontStyle: "italic", textShadow: "none" }}>finest</span>',
'                for the world''s <span style={{ color: "#C7A26A", fontStyle: "normal", fontWeight: 600, textShadow: "none" }}>finest</span>'
)

$content = $content.Replace(
'              <p className="mt-9 max-w-[580px] animate-fade-up text-left font-sans text-[18px] font-light leading-[1.75] text-white/82 sm:text-[20px] lg:text-[22px]">',
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[17px] font-normal leading-[1.7] text-white/82 sm:text-[18px] lg:text-[20px]">'
)

$content = $content.Replace(
'              <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">',
'              <div className="mt-10 flex flex-wrap items-center gap-3">'
)

$content = $content.Replace(
'                  className="inline-flex h-[58px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"',
'                  className="inline-flex h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-6 text-[9px] font-medium uppercase tracking-[0.2em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"'
)

$content = $content.Replace(
'                  className="inline-flex h-[58px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
'                  className="inline-flex h-[48px] min-w-[220px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-6 text-[9px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"'
)

Set-Content -Path $path -Value $content
