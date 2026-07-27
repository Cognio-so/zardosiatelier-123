$path = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\routes\index.tsx"
$text = Get-Content -LiteralPath $path -Raw

$old = @'
        {/* Content Area with Glass Panel */}
        <div className="absolute inset-y-0 left-0 z-0 w-full max-w-[860px] backdrop-blur-[24px]" style={{ background: "linear-gradient(90deg, rgba(12,9,7,0.52) 0%, rgba(12,9,7,0.34) 62%, rgba(12,9,7,0.08) 100%)" }} />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pt-32">
          <div
            className="w-full max-w-[800px] border border-white/8 px-8 py-10 backdrop-blur-[18px] sm:px-12 sm:py-12 lg:px-16 lg:py-16 animate-fade-in"
            style={{
              background: "linear-gradient(135deg, rgba(16,12,10,0.34) 0%, rgba(16,12,10,0.20) 100%)",
            }}
          >
            <div>
'@

$new = @'
        {/* Content Area with anchored left veil */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-full max-w-[980px] backdrop-blur-[22px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,6,5,0.88) 0%, rgba(13,10,8,0.72) 38%, rgba(18,12,9,0.48) 68%, rgba(18,12,9,0.08) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[52vw] min-w-[320px] max-w-[760px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,8,6,0.9) 0%, rgba(11,8,6,0.76) 44%, rgba(11,8,6,0.36) 82%, rgba(11,8,6,0) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pt-32">
          <div
            className="relative w-full max-w-[800px] overflow-hidden border border-white/7 px-8 py-10 backdrop-blur-[14px] sm:px-12 sm:py-12 lg:px-16 lg:py-16 animate-fade-in"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,13,10,0.58) 0%, rgba(17,13,10,0.42) 54%, rgba(17,13,10,0.28) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 -left-24 w-[58%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,6,5,0.52) 0%, rgba(8,6,5,0.24) 58%, rgba(8,6,5,0) 100%)",
              }}
            />
            <div>
'@

if (-not $text.Contains($old.Trim())) {
  throw "Target hero block not found"
}

$text = $text.Replace($old.Trim(), $new.Trim())
Set-Content -LiteralPath $path -Value $text
