$contact = Get-Content 'src/routes/contact.tsx' -Raw
$contact = $contact.Replace('href={whatsappHref}', 'href={phoneHref}')
$contact = $contact.Replace('                  target="_blank"' + [Environment]::NewLine, '')
$contact = $contact.Replace('                  rel="noopener noreferrer"' + [Environment]::NewLine, '')
Set-Content 'src/routes/contact.tsx' $contact

$index = Get-Content 'src/routes/index.tsx' -Raw
$index = $index.Replace('                  target="_blank"' + [Environment]::NewLine, '')
$index = $index.Replace('                  rel="noopener noreferrer"' + [Environment]::NewLine, '')
$index = $index.Replace('                target="_blank"' + [Environment]::NewLine, '')
$index = $index.Replace('                rel="noopener noreferrer"' + [Environment]::NewLine, '')
Set-Content 'src/routes/index.tsx' $index
