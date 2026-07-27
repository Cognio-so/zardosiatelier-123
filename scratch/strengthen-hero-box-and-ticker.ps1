$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'                "linear-gradient(135deg, rgba(8, 6, 5, 0.82) 0%, rgba(8, 6, 5, 0.76) 46%, rgba(8, 6, 5, 0.62) 100%)",',
'                "linear-gradient(145deg, rgba(36, 24, 17, 0.96) 0%, rgba(29, 19, 13, 0.95) 45%, rgba(21, 14, 10, 0.94) 100%)",'
)

$content = $content.Replace(
'              border: "1px solid rgba(199, 162, 106, 0.14)",',
'              border: "1px solid rgba(199, 162, 106, 0.18)",'
)

$content = $content.Replace(
'            <div className="px-6 py-6 text-left sm:px-8 sm:py-8 lg:px-10 lg:py-10">',
'            <div className="px-6 py-7 text-left sm:px-8 sm:py-9 lg:px-10 lg:py-10">'
)

$content = $content.Replace(
'        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 py-5 backdrop-blur-md">',
'        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/45 py-5 backdrop-blur-md">'
)

$content = $content.Replace(
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[9px] font-bold uppercase tracking-[0.35em] text-ivory/80">',
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[11px] font-bold uppercase tracking-[0.34em] text-ivory/85 sm:text-[12px]">'
)

Set-Content -Path $path -Value $content
