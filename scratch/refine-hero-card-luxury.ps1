$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$content = $content.Replace(
@'
        <div className="relative z-10 flex min-h-screen items-start px-7 pb-28 pt-20 sm:px-12 sm:pt-24 lg:px-[88px] lg:pt-[96px] xl:px-[104px] xl:pt-[104px]">
          <div
            className="w-full max-w-[720px] animate-fade-in text-left"
            style={{
              background:
                "linear-gradient(135deg, rgba(7, 5, 4, 0.62) 0%, rgba(7, 5, 4, 0.52) 42%, rgba(7, 5, 4, 0.34) 100%)",
              border: "none",
              boxShadow: "none",
              backdropFilter: "none",
            }}
          >
            <div className="px-5 py-5 text-left sm:px-7 sm:py-6 lg:px-8 lg:py-7">
'@,
@'
        <div className="relative z-10 flex min-h-screen items-start px-7 pb-28 pt-20 sm:px-12 sm:pt-24 lg:px-[88px] lg:pt-[96px] xl:px-[104px] xl:pt-[104px]">
          <div
            className="w-full max-w-[690px] animate-fade-in text-left"
            style={{
              background:
                "linear-gradient(135deg, rgba(8, 6, 5, 0.82) 0%, rgba(8, 6, 5, 0.76) 46%, rgba(8, 6, 5, 0.62) 100%)",
              border: "1px solid rgba(199, 162, 106, 0.14)",
              boxShadow: "none",
              backdropFilter: "none",
            }}
          >
            <div className="px-6 py-6 text-left sm:px-8 sm:py-8 lg:px-10 lg:py-10">
'@
)

$content = $content.Replace(
'              <div className="mt-12 flex flex-wrap items-center gap-3 sm:gap-4">',
'              <div className="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">'
)

$content = $content.Replace(
'                  className="inline-flex h-[58px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"',
'                  className="inline-flex h-[58px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] border border-[#CDA56A] bg-[#CDA56A] px-10 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#dfbe82] hover:bg-[#dfbe82]"'
)

$content = $content.Replace(
'                  className="inline-flex h-[58px] items-center justify-center gap-2 rounded-[8px] border border-white/28 bg-transparent px-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"',
'                  className="inline-flex h-[58px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] border border-white/22 bg-white/[0.03] px-10 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CDA56A] hover:bg-[#CDA56A] hover:text-[#120c09]"'
)

Set-Content -Path $path -Value $content
