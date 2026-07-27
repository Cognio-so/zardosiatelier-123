$navPath = "src/components/site/Navigation.tsx"
$nav = Get-Content -Raw $navPath

$nav = $nav.Replace(
'    bg: "rgba(0,0,0,0)",',
'    bg: "linear-gradient(180deg, rgba(58,34,18,0.78) 0%, rgba(42,24,13,0.72) 56%, rgba(28,16,10,0.58) 100%)",'
)
$nav = $nav.Replace(
'    border: "rgba(255,255,255,0.06)",',
'    border: "rgba(199,162,106,0.16)",'
)
$nav = $nav.Replace(
'  bg: "rgba(18,14,11,0.98)",',
'  bg: "linear-gradient(180deg, rgba(32,18,11,0.96) 0%, rgba(23,14,10,0.97) 100%)",'
)
$nav = $nav.Replace(
'  border: "rgba(212,175,55,0.15)",',
'  border: "rgba(199,162,106,0.18)",'
)
$nav = $nav.Replace(
'        backdropFilter: "blur(18px) saturate(140%)",',
'        backdropFilter: "blur(16px) saturate(145%)",'
)
$nav = $nav.Replace(
'        WebkitBackdropFilter: "blur(18px) saturate(140%)",',
'        WebkitBackdropFilter: "blur(16px) saturate(145%)",'
)
$nav = $nav.Replace(
'            className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.24em] lg:flex xl:text-[13px]"',
'            className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.24em] lg:flex xl:text-[13px]"'
)
$nav = $nav.Replace(
'                  className="transition-all duration-700 hover:!text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4 rounded"',
'                  className="rounded px-1 pb-1 transition-all duration-500 hover:-translate-y-0.5 hover:!text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4"'
)
$nav = $nav.Replace(
'            className="hidden px-7 py-3 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 md:inline-block xl:text-[11px]"',
'            className="hidden rounded-md px-7 py-3 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 md:inline-block xl:text-[11px]"'
)
$nav = $nav.Replace(
'              background: "rgba(255,255,255,0.03)",',
'              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",'
)
$nav = $nav.Replace(
'                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";',
'                (e.currentTarget as HTMLElement).style.background = "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)";'
)
$nav = $nav.Replace(
'            className="mt-4 inline-block border border-gold bg-gold px-5 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-[#120C09]"',
'            className="mt-4 inline-block rounded-md border border-gold bg-gold px-5 py-3 text-center text-[10px] uppercase tracking-[0.28em] text-[#120C09] transition-transform duration-300 hover:-translate-y-0.5"'
)
Set-Content -Path $navPath -Value $nav

$indexPath = "src/routes/index.tsx"
$index = Get-Content -Raw $indexPath

$index = $index.Replace(
'          alt="Hand embroidery craftsmanship header background"',
'          alt="Zardosi Atelier embroidery background"'
)
$index = $index.Replace(
'                A vocabulary of luxury hand-craft.',
'                Handcrafted techniques for couture collections.'
)
$index = $index.Replace(
'            <div className="grid gap-10 border-y border-ink/10 py-14 text-center sm:py-20 md:grid-cols-3">',
'            <div className="grid items-end gap-8 border-y border-ink/10 py-12 text-center sm:py-16 md:grid-cols-3 md:gap-6">'
)
$index = $index.Replace(
'                <div className="font-serif text-[86px] sm:text-[120px] md:text-[150px] font-light leading-none text-[#D4AF37]">',
'                <div className="font-serif text-[62px] sm:text-[84px] md:text-[96px] font-light leading-none text-[#D4AF37]">'
)
$index = $index.Replace(
'                <p className="mt-6 text-[13px] font-bold uppercase leading-relaxed tracking-[0.25em] text-[#A69C98]">',
'                <p className="mt-4 text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#A69C98] sm:text-[12px]">'
)
$index = $index.Replace(
'                <div className="font-serif text-[64px] sm:text-[92px] md:text-[112px] italic font-light leading-none text-[#D4AF37]">',
'                <div className="font-serif text-[48px] sm:text-[62px] md:text-[72px] italic font-light leading-none text-[#D4AF37]">'
)
Set-Content -Path $indexPath -Value $index
