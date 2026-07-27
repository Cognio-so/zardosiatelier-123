$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'          className="absolute inset-0 h-full w-full object-cover opacity-85"',
'          className="absolute inset-0 h-full w-full object-cover opacity-88 saturate-[1.08]"'
)

$content = $content.Replace(
'          className="absolute inset-0 h-full w-full object-cover brightness-[1.08]"',
'          className="absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.05] saturate-[1.08]"'
)

$content = $content.Replace(
'              "linear-gradient(90deg, rgba(10,7,5,0.3) 0%, rgba(10,7,5,0.18) 32%, rgba(10,7,5,0.12) 58%, rgba(10,7,5,0.24) 100%), linear-gradient(180deg, rgba(10,7,5,0.22) 0%, rgba(10,7,5,0.12) 36%, rgba(10,7,5,0.28) 100%)",',
'              "linear-gradient(90deg, rgba(19,12,8,0.16) 0%, rgba(19,12,8,0.08) 35%, rgba(19,12,8,0.06) 62%, rgba(19,12,8,0.16) 100%), linear-gradient(180deg, rgba(19,12,8,0.14) 0%, rgba(19,12,8,0.06) 38%, rgba(19,12,8,0.18) 100%)",'
)

$content = $content.Replace(
'            className="w-full max-w-[690px] animate-fade-in text-left"',
'            className="w-full max-w-[700px] animate-fade-in rounded-[28px] text-left"'
)

$content = $content.Replace(
'                "linear-gradient(145deg, rgba(247, 241, 232, 0.96) 0%, rgba(241, 233, 223, 0.955) 52%, rgba(233, 223, 211, 0.95) 100%)",',
'                "linear-gradient(145deg, rgba(252, 248, 242, 0.97) 0%, rgba(246, 239, 229, 0.965) 50%, rgba(236, 226, 214, 0.96) 100%)",'
)

$content = $content.Replace(
'              border: "1px solid rgba(199, 162, 106, 0.2)",',
'              border: "1px solid rgba(205, 165, 106, 0.28)",'
)

$content = $content.Replace(
'              boxShadow: "none",',
'              boxShadow: "0 24px 70px rgba(86, 55, 24, 0.14), 0 8px 24px rgba(86, 55, 24, 0.08), inset 0 1px 0 rgba(255,255,255,0.45)",'
)

$content = $content.Replace(
'              backdropFilter: "none",',
'              backdropFilter: "blur(10px)",'
)

$content = $content.Replace(
'            <div className="px-6 py-7 text-left sm:px-8 sm:py-9 lg:px-10 lg:py-10">',
'            <div className="px-7 py-8 text-left sm:px-9 sm:py-10 lg:px-11 lg:py-11">'
)

$content = $content.Replace(
'              <p className="animate-fade-up text-left font-sans text-[12px] font-medium uppercase tracking-[0.34em] text-[#C7A26A] sm:text-[13px]">',
'              <div className="flex items-center gap-3"><p className="animate-fade-up text-left font-sans text-[12px] font-medium uppercase tracking-[0.34em] text-[#C7A26A] sm:text-[13px]">'
)

$content = $content.Replace(
'                Haute Couture Embroidery - India',
'                Haute Couture Embroidery - India'
)

$content = $content.Replace(
'              </p>',
'              </p><span className="hidden h-px flex-1 bg-gradient-to-r from-[#D4B06A]/50 to-transparent sm:block" /><span className="hidden text-[#D4B06A] sm:block">+</span></div>',
1
)

$content = $content.Replace(
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[16px] font-normal leading-[1.75] text-[#3F332B] sm:text-[17px] lg:text-[18px]">',
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[15px] font-normal leading-[1.8] text-[#4D3F35] sm:text-[16px] lg:text-[17px]">',
1
)

$content = $content.Replace(
'              <div className="mt-10 flex flex-nowrap items-center gap-3">',
'              <div className="mt-10 flex flex-nowrap items-center gap-2.5">',
1
)

$content = $content.Replace(
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"',
'                  className="inline-flex h-[48px] min-w-[188px] items-center justify-center gap-2 rounded-[10px] border border-[#CDA56A] bg-[#CDA56A] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#120c09] shadow-[0_10px_24px_rgba(205,165,106,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"',
1
)

$content = $content.Replace(
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-[#8F7660]/45 bg-transparent px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#241913] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
'                  className="inline-flex h-[48px] min-w-[188px] items-center justify-center gap-2 rounded-[10px] border border-[#9A8168]/55 bg-white/58 px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#241913] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
1
)

Set-Content -Path $path -Value $content
