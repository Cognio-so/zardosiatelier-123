# Contact form delivery and storage

The contact form sends the studio email first. An optional design file is attached to that email. A customer confirmation is attempted afterward; failure to send the confirmation does not turn an already delivered studio email into a failed submission.

Vercel Blob storage is a separate best-effort step. The Blob store currently returns `403: Store is suspended`. While it remains suspended, enquiries and attachments may not appear in the admin panel, and Blob-backed duplicate/rate-limit history is unavailable. The email path can still work if SMTP is configured and reachable. Restore or replace the Blob store before relying on the admin panel for enquiries. Do not interpret a successful form response as proof of admin-panel persistence.

The form accepts files up to 3 MiB. Files are sent as base64 in a server-function request, so a 3 MiB file is about 4 MiB before the rest of the request. Vercel's function request limit is 4.5 MB: https://vercel.com/docs/functions/limitations . Larger design files need a separate direct-upload service or another transfer path.

For preview and production, configure `SMTP_USER` and `SMTP_PASS` (or `GMAIL_USER` and `GMAIL_APP_PASSWORD`). `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `MAIL_FROM_EMAIL`, `BUSINESS_INBOX`, and `REPLY_INBOX` should match the sending mailbox. If the studio email fails, the visitor sees a send error. A successful SMTP submission or local build alone does not prove inbox delivery; verify receipt with a real test email and attachment in the target environment.

On 2026-11-06, Vercel listed encrypted Gmail variables for Preview and Production, but CLI environment pulls returned empty values. Secret-type variables cannot be read back, so this does not establish whether the deployed functions have usable credentials. The local `.env.local` did not supply usable SMTP credentials. Verify the deployed runtime with a real test enquiry and inbox receipt before treating email delivery as operational. No real test email has succeeded yet.
