$siteShell = Get-Content 'src/components/site/SiteShell.tsx' -Raw
$siteShell = $siteShell.Replace('import { FloatingWhatsApp } from "./FloatingWhatsApp";' + [Environment]::NewLine, '')
$siteShell = $siteShell.Replace('      <Footer />' + [Environment]::NewLine + '      <FloatingWhatsApp />' + [Environment]::NewLine, '      <Footer />' + [Environment]::NewLine)
Set-Content 'src/components/site/SiteShell.tsx' $siteShell

$footer = Get-Content 'src/components/site/Footer.tsx' -Raw
$footer = $footer.Replace('{settings?.whatsappNumber && <li>WhatsApp: {settings.whatsappNumber}</li>}', '{settings?.phone && <li>Phone: {settings.phone}</li>}')
Set-Content 'src/components/site/Footer.tsx' $footer

$contact = Get-Content 'src/routes/contact.tsx' -Raw
$contact = $contact.Replace('const email = settings?.email ?? "atelier@zardosiatelier.com";', 'const email = settings?.email ?? "zardosiatelier@gmail.com";')
$contact = $contact.Replace('const whatsappNumber = settings?.whatsappNumber ?? "+91 88260 23527";', 'const phoneNumber = settings?.phone ?? "8826023527";')
$contact = $contact.Replace('const whatsappHref = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;', 'const phoneHref = `tel:${phoneNumber.replace(/\D/g, "")}`;')
$contact = $contact.Replace('<p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">WhatsApp</p>', '<p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Phone</p>')
$contact = $contact.Replace('href={whatsappHref}' + [Environment]::NewLine + '                  target="_blank"' + [Environment]::NewLine + '                  rel="noopener noreferrer"' + [Environment]::NewLine + '                  className="mt-2 inline-block font-serif text-xl gold-link"', 'href={phoneHref}' + [Environment]::NewLine + '                  className="mt-2 inline-block font-serif text-xl gold-link"')
$contact = $contact.Replace('{whatsappNumber}', '{phoneNumber}')
Set-Content 'src/routes/contact.tsx' $contact

$index = Get-Content 'src/routes/index.tsx' -Raw
$index = $index.Replace('const whatsappDigits = (settings?.whatsappNumber ?? "+91 88260 23527").replace(/\D/g, "");', 'const phoneDigits = (settings?.phone ?? "8826023527").replace(/\D/g, "");')
$index = $index.Replace('href={`https://wa.me/${whatsappDigits}`}', 'href={`tel:${phoneDigits}`}')
$index = $index.Replace('WhatsApp the Atelier', 'Call the Atelier')
$index = $index.Replace('const whatsappNumber = settings?.whatsappNumber ?? "+91 88260 23527";', 'const phoneNumber = settings?.phone ?? "8826023527";')
$index = $index.Replace('const whatsappDigits = whatsappNumber.replace(/\D/g, "");', 'const phoneDigits = phoneNumber.replace(/\D/g, "");')
$index = $index.Replace('const email = settings?.email ?? "atelier@zardosiatelier.com";', 'const email = settings?.email ?? "zardosiatelier@gmail.com";')
$index = $index.Replace('href={`https://wa.me/${whatsappDigits}?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project.`}', 'href={`tel:${phoneDigits}`}')
$index = $index.Replace('WhatsApp {whatsappNumber}', 'Call {phoneNumber}')
Set-Content 'src/routes/index.tsx' $index

$adminData = Get-Content 'src/lib/admin-data.ts' -Raw
$adminData = $adminData.Replace('  whatsappNumber: "+91 9876543210",', '  whatsappNumber: "",')
$adminData = $adminData.Replace('  email: "hello@zardosiatelier.com",', '  email: "zardosiatelier@gmail.com",')
$adminData = $adminData.Replace('  phone: "+91 9876543210",', '  phone: "8826023527",')
Set-Content 'src/lib/admin-data.ts' $adminData
