$stylesPath = "src/styles.css"
$styles = Get-Content -Raw $stylesPath

$styles = $styles.Replace('    width: 560px !important;','    width: 640px !important;')
$styles = $styles.Replace('    max-width: 560px !important;','    max-width: 640px !important;')

Set-Content -Path $stylesPath -Value $styles

$indexPath = "src/routes/index.tsx"
$index = Get-Content -Raw $indexPath

$index = $index.Replace(
'            className="hero-glass-card w-full max-w-[620px] text-left lg:max-w-[620px] xl:max-w-[620px]"',
'            className="hero-glass-card w-full max-w-[720px] text-left lg:max-w-[700px] xl:max-w-[720px]"'
)

$index = $index.Replace(
'            <div className="hero-card-inner px-7 py-7 sm:px-8 sm:py-8 lg:px-8 lg:py-8">',
'            <div className="hero-card-inner px-7 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-7">'
)

$index = $index.Replace(
'                className="mt-7 max-w-[520px] animate-fade-up text-left font-serif text-white text-[52px] sm:text-[56px] lg:text-[60px]"',
'                className="mt-5 max-w-[640px] animate-fade-up text-left font-serif text-white text-[48px] sm:text-[52px] lg:text-[56px]"'
)

$index = $index.Replace('                  lineHeight: 1.02,','                  lineHeight: 1.0,')

$index = $index.Replace(
'              <p className="mt-7 max-w-[92%] animate-fade-up font-sans text-[15px] font-medium leading-[1.7] text-white/84 lg:text-[16px]">',
'              <p className="mt-5 max-w-[94%] animate-fade-up font-sans text-[15px] font-medium leading-[1.65] text-white/84 lg:text-[16px]">'
)

$index = $index.Replace(
'              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">',
'              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-3">'
)

$index = $index.Replace(
'                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#120c09] shadow-[0_10px_24px_rgba(212,175,55,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(212,175,55,0.24)] sm:w-auto sm:text-[12px]"',
'                  className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[8px] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#120c09] shadow-[0_10px_24px_rgba(212,175,55,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(212,175,55,0.24)] sm:w-auto sm:min-w-[300px] sm:text-[12px]"'
)

$index = $index.Replace(
'                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-white/18 bg-white/[0.02] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto sm:text-[12px]"',
'                  className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[8px] border border-white/18 bg-white/[0.02] px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto sm:min-w-[300px] sm:text-[12px]"'
)

Set-Content -Path $indexPath -Value $index
