$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$old = @'
          <div
            className="w-full max-w-[720px] animate-fade-in text-left"
            style={{
              background: "rgba(0, 0, 0, 0.25)",
              border: "none",
              boxShadow: "none",
              backdropFilter: "none",
            }}
          >
'@

$new = @'
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
'@

$content = $content.Replace($old, $new)

$content = $content.Replace(
  '            <div className="px-0 py-0 text-left">',
  '            <div className="px-5 py-5 text-left sm:px-7 sm:py-6 lg:px-8 lg:py-7">'
)

Set-Content -Path $path -Value $content
