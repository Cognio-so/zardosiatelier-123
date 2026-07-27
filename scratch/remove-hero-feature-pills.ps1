$path = "src/routes/index.tsx"
$content = Get-Content -Raw $path

$old = @'
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Crown, label: "Master Craftsmanship" },
                  { icon: Diamond, label: "Luxury Quality" },
                  { icon: Globe, label: "Global Export" },
                  { icon: ShieldCheck, label: "Double Checked" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="hero-feature-pill flex min-h-[72px] items-center gap-3 rounded-[18px] px-4 py-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/28 bg-white/40 text-[#C49A43]">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A4C42]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

'@

$content = $content.Replace($old, "")
Set-Content -Path $path -Value $content
