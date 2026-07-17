$siteShell = Get-Content 'src/components/site/SiteShell.tsx' -Raw
$siteShell = $siteShell -replace 'import \{ FloatingWhatsApp \} from "\./FloatingWhatsApp";\r?\n', ''
$siteShell = $siteShell -replace '\r?\n\s*<FloatingWhatsApp />', ''
Set-Content 'src/components/site/SiteShell.tsx' $siteShell

$contact = Get-Content 'src/routes/contact.tsx' -Raw
$contact = $contact.Replace('href={whatsappHref}' + [Environment]::NewLine + '                  target="_blank"' + [Environment]::NewLine + '                  rel="noopener noreferrer"', 'href={phoneHref}')
Set-Content 'src/routes/contact.tsx' $contact

$index = Get-Content 'src/routes/index.tsx' -Raw
$index = $index.Replace('href={`tel:${phoneDigits}`}' + [Environment]::NewLine + '                  target="_blank"' + [Environment]::NewLine + '                  rel="noopener noreferrer"', 'href={`tel:${phoneDigits}`}')
$index = $index.Replace('href={`tel:${phoneDigits}`}' + [Environment]::NewLine + '                target="_blank"' + [Environment]::NewLine + '                rel="noopener noreferrer"', 'href={`tel:${phoneDigits}`}')
Set-Content 'src/routes/index.tsx' $index
