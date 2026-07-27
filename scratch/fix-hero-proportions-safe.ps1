$indexPath = "src/routes/index.tsx"
$index = Get-Content -Raw $indexPath

$index = $index -replace 'pt-20 sm:px-10 sm:pt-24 lg:px-\[84px\] lg:pt-\[92px\] xl:px-\[102px\] xl:pt-\[100px\]', 'pt-28 sm:px-10 sm:pt-32 lg:px-[84px] lg:pt-[112px] xl:px-[102px] xl:pt-[116px]'
$index = $index -replace 'hero-glass-card w-full max-w-\[[0-9]+px\] text-left lg:max-w-\[[0-9]+px\] xl:max-w-\[[0-9]+px\]', 'hero-glass-card w-full max-w-[780px] text-left lg:max-w-[740px] xl:max-w-[780px]'
$index = $index -replace 'hero-card-inner px-7 py-6 sm:px-8 sm:py-7 lg:px-9 lg:py-7', 'hero-card-inner px-7 py-6 sm:px-9 sm:py-8 lg:px-10 lg:py-8'
$index = $index -replace 'hero-card-inner px-7 py-7 sm:px-8 sm:py-8 lg:px-8 lg:py-8', 'hero-card-inner px-7 py-6 sm:px-9 sm:py-8 lg:px-10 lg:py-8'
$index = $index -replace 'max-w-\[[0-9]+px\] animate-fade-up text-left font-serif text-white text-\[[0-9]+px\] sm:text-\[[0-9]+px\] lg:text-\[[0-9]+px\]', 'max-w-[680px] animate-fade-up text-left font-serif text-white text-[42px] sm:text-[48px] lg:text-[54px] xl:text-[58px]'
$index = $index -replace 'lineHeight: 1\.0,', 'lineHeight: 0.98,'
$index = $index -replace 'lineHeight: 1\.02,', 'lineHeight: 0.98,'
$index = $index -replace 'mt-5 max-w-\[94%\] animate-fade-up font-sans text-\[15px\] font-medium leading-\[1\.65\] text-white/84 lg:text-\[16px\]', 'mt-5 max-w-[96%] animate-fade-up font-sans text-[15px] font-medium leading-[1.6] text-white/84 lg:text-[16px]'
$index = $index -replace 'mt-7 max-w-\[92%\] animate-fade-up font-sans text-\[15px\] font-medium leading-\[1\.7\] text-white/84 lg:text-\[16px\]', 'mt-5 max-w-[96%] animate-fade-up font-sans text-[15px] font-medium leading-[1.6] text-white/84 lg:text-[16px]'
$index = $index -replace 'sm:min-w-\[300px\]', 'sm:min-w-[260px]'

Set-Content -Path $indexPath -Value $index

$stylesPath = "src/styles.css"
$styles = Get-Content -Raw $stylesPath

$styles = $styles -replace 'width: 640px !important;', 'width: 700px !important;'
$styles = $styles -replace 'max-width: 640px !important;', 'max-width: 700px !important;'
$styles = $styles -replace 'margin-left: 44px !important;', 'margin-left: 32px !important;'
$styles = $styles -replace 'width: 90% !important;', 'width: min(92%, 760px) !important;'
$styles = $styles -replace 'max-width: 90% !important;', 'max-width: min(92%, 760px) !important;'
$styles = $styles -replace 'width: calc\(100% - 32px\) !important;', 'width: calc(100% - 24px) !important;'
$styles = $styles -replace 'max-width: calc\(100% - 32px\) !important;', 'max-width: calc(100% - 24px) !important;'
$styles = $styles -replace 'margin-left: 16px !important;', 'margin-left: 12px !important;'
$styles = $styles -replace 'margin-right: 16px !important;', 'margin-right: 12px !important;'

Set-Content -Path $stylesPath -Value $styles
