$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'                "linear-gradient(145deg, rgba(28, 18, 12, 0.985) 0%, rgba(24, 15, 10, 0.98) 48%, rgba(18, 11, 8, 0.975) 100%)",',
'                "linear-gradient(145deg, rgba(247, 241, 232, 0.96) 0%, rgba(241, 233, 223, 0.955) 52%, rgba(233, 223, 211, 0.95) 100%)",'
)

$content = $content.Replace(
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-serif text-[#F7F4EF] sm:text-[54px] lg:text-[68px]"',
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-serif text-[#1B130E] sm:text-[54px] lg:text-[68px]"'
)

$content = $content.Replace(
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[16px] font-normal leading-[1.75] text-white/82 sm:text-[17px] lg:text-[18px]">',
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[16px] font-normal leading-[1.75] text-[#3F332B] sm:text-[17px] lg:text-[18px]">'
)

$content = $content.Replace(
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
'                  className="inline-flex h-[46px] min-w-[198px] items-center justify-center gap-2 rounded-[8px] border border-[#8F7660]/45 bg-transparent px-5 text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#241913] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"'
)

Set-Content -Path $path -Value $content
