# Email Deliverability Setup

## Required Mailbox

Use a real mailbox on the sending domain:

- `info@zardosiatelier.com`
- or `contact@zardosiatelier.com`

Do not authenticate SMTP with a personal Gmail account if you want SPF and DKIM alignment to pass for `zardosiatelier.com`.

## Required Environment Variables

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@zardosiatelier.com
SMTP_PASS=your_google_app_password
MAIL_FROM_EMAIL=info@zardosiatelier.com
MAIL_FROM_NAME=Zardosi Atelier
BUSINESS_INBOX=info@zardosiatelier.com
REPLY_INBOX=info@zardosiatelier.com
WEBSITE_URL=https://www.zardosiatelier.com
EMAIL_LOGO_URL=https://www.zardosiatelier.com/email-logo.png
COMPANY_NAME=Zardosi Atelier
COMPANY_ADDRESS=Mumbai, Maharashtra, India
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
DKIM_SELECTOR=google
```

## DNS Records

### SPF

If Google Workspace is the sending provider:

```txt
Host: @
Type: TXT
Value: v=spf1 include:_spf.google.com ~all
```

### DKIM

Generate DKIM in Google Admin, then publish the selector record, for example:

```txt
Host: google._domainkey
Type: TXT
Value: v=DKIM1; k=rsa; p=...
```

### DMARC

Recommended starting policy:

```txt
Host: _dmarc
Type: TXT
Value: v=DMARC1; p=quarantine; adkim=s; aspf=s; rua=mailto:dmarc@zardosiatelier.com
```

Move to `p=reject` after you confirm all legitimate mail passes alignment.

## Verification

Run:

```bash
node scripts/verify-email-auth.mjs zardosiatelier.com google
```

You want:

- SPF record present for `zardosiatelier.com`
- DKIM selector published
- DMARC policy present with aligned domain

For production mailbox testing, also send to:

- Gmail
- Outlook
- Yahoo
- Apple Mail

Then confirm headers show SPF `pass`, DKIM `pass`, and DMARC `pass`.
