$path = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\lib\admin-data.ts"
$text = Get-Content -LiteralPath $path -Raw

$oldImport = @'
import { z } from "zod";
import { hasBlobToken, listBlobs, putBlob } from "./vercel-blob-rest";
'@

$newImport = @'
import { z } from "zod";
import { sendEnquiryNotificationEmail } from "./email.server";
import { hasBlobToken, listBlobs, putBlob } from "./vercel-blob-rest";
'@

if (-not $text.Contains($oldImport.Trim())) {
  throw "Import block not found"
}

$text = $text.Replace($oldImport.Trim(), $newImport.Trim())

$oldBlock = @'
      await writeBlob(KEYS.enquiries, [newEnquiry, ...enquiries]);
      return { success: true, enquiry: newEnquiry };
'@

$newBlock = @'
      await writeBlob(KEYS.enquiries, [newEnquiry, ...enquiries]);
      let notification: { sent: boolean; skipped: boolean; reason?: string };
      try {
        notification = await sendEnquiryNotificationEmail(newEnquiry);
      } catch (error) {
        console.error("enquiry notification email error:", error);
        notification = {
          sent: false,
          skipped: false,
          reason: error instanceof Error ? error.message : String(error),
        };
      }
      return { success: true, enquiry: newEnquiry, notification };
'@

if (-not $text.Contains($oldBlock.Trim())) {
  throw "Target block not found"
}

$text = $text.Replace($oldBlock.Trim(), $newBlock.Trim())
Set-Content -LiteralPath $path -Value $text

$envPath = "C:\Users\PC\Desktop\zardosiatelier-123-main\.env.local"
$envText = Get-Content -LiteralPath $envPath -Raw
$envBlock = @'

# Gmail notification settings for enquiry emails
GMAIL_USER=zardosiatelier@gmail.com
GMAIL_APP_PASSWORD=
NOTIFICATION_EMAIL=aryanthealgohype@gmail.com
MAIL_FROM="Zardosi Atelier <zardosiatelier@gmail.com>"
'@

if (-not $envText.Contains("GMAIL_USER=")) {
  Add-Content -LiteralPath $envPath -Value $envBlock
}
