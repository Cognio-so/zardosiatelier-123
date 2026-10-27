# Email Deliverability Setup

## Required Mailbox

The current setup uses the authenticated Gmail mailbox `zardosiatelier@gmail.com` for low-volume enquiry notifications. For higher volume, use a mailbox on `zardosiatelier.com` so SPF and DKIM can align with the website domain.

## Required Environment Variables

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=zardosiatelier@gmail.com
SMTP_PASS=your_google_app_password
MAIL_FROM_EMAIL=zardosiatelier@gmail.com
MAIL_FROM_NAME=Zardosi Atelier
BUSINESS_INBOX=zardosiatelier@gmail.com
NOTIFICATION_EMAIL=zardosiatelier@gmail.com
REPLY_INBOX=zardosiatelier@gmail.com
WEBSITE_URL=https://www.zardosiatelier.com
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
