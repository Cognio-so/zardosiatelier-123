$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
'          <div
            className="w-full max-w-[700px] animate-fade-in rounded-[28px] text-left"',
'          <div
            className="w-full max-w-[760px] animate-fade-in rounded-[28px] text-left"'
)

$content = $content.Replace(
'            <div className="px-7 py-8 text-left sm:px-9 sm:py-10 lg:px-11 lg:py-11">',
'            <div className="px-7 py-8 text-left sm:px-9 sm:py-10 lg:px-10 lg:py-10">'
)

$content = $content.Replace(
'                className="mt-8 max-w-[680px] animate-fade-up text-left font-serif text-[#1B130E] sm:text-[54px] lg:text-[68px]"',
'                className="mt-7 max-w-[640px] animate-fade-up text-left font-serif text-[#1B130E] sm:text-[48px] lg:text-[58px]"'
)

$content = $content.Replace(
'                  lineHeight: 1.04,',
'                  lineHeight: 1.08,'
)

$content = $content.Replace(
'                  letterSpacing: "-1px",',
'                  letterSpacing: "-0.6px",'
)

$content = $content.Replace(
'              <p className="mt-8 max-w-[560px] animate-fade-up text-left font-sans text-[15px] font-normal leading-[1.8] text-[#4D3F35] sm:text-[16px] lg:text-[17px]">',
'              <p className="mt-7 max-w-[560px] animate-fade-up text-left font-sans text-[15px] font-normal leading-[1.8] text-[#4D3F35] sm:text-[16px] lg:text-[17px]">'
)

$content = $content.Replace(
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[12px] font-bold uppercase tracking-[0.34em] text-ivory/85 sm:text-[13px]">',
'          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[13px] font-bold uppercase tracking-[0.34em] text-ivory/90 sm:text-[14px] lg:text-[15px]">'
)

Set-Content -Path $path -Value $content
