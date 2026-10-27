# EmDash CMS operations — Zardosi Atelier

## Architecture

Public website Vercel par hi rahegi. `/blog`, `/blog/:slug`, metadata aur sitemap
TanStack Start server render karta hai. EmDash ka Worker
`cms.zardosiatelier.com` par admin, authenticated REST API, preview handoff,
publish notifications aur public-safe image gateway deta hai.

Cloudflare resources isolated hain:

| Resource | Production name |
|---|---|
| Worker | `zardosiatelier-cms-prod` |
| D1 | `zardosiatelier-cms-db-prod` |
| Private R2 | `zardosiatelier-cms-media-prod` |
| Admin | `https://cms.zardosiatelier.com/_emdash/admin` |
| Blog | `https://www.zardosiatelier.com/blog` |

CMS host ko middleware `noindex, nofollow, noarchive` deta hai. R2 public access
enable mat karo. Website tokens browser bundle ya `VITE_` variable mein kabhi
mat daalo.

## Secret inventory

Cloudflare Worker secrets:

- `EMDASH_ENCRYPTION_KEY`
- `REVALIDATE_HMAC_SECRET`
- `PREVIEW_HANDOFF_SECRET`

Vercel server variables:

- `CMS_ORIGIN=https://cms.zardosiatelier.com`
- `CMS_READ_TOKEN` — Subscriber/published-read only
- `CMS_PREVIEW_READ_TOKEN` — draft read allowed, write/publish denied
- `REVALIDATE_HMAC_SECRET` — Worker value ke identical
- `PREVIEW_HANDOFF_SECRET` — Worker value ke identical

Webhook aur preview ke secrets different hone chahiye. Production values ko
Git, chat, screenshots ya client-side JavaScript mein share mat karo.

## First launch sequence

1. Cloudflare account mein Wrangler authorize karo.
2. Three independent secrets generate karke company vault mein save karo.
3. Worker secrets set karo aur `apps/cms` deploy karo. First deploy named D1/R2
   resources aur Astro `SESSION` binding provision karega.
4. `cms.zardosiatelier.com` response aur TLS verify karo.
5. Admin wizard complete karo; owner ke normal aur backup passkeys register karo.
6. Client ko Editor invite karo. Infrastructure/settings rights mat do.
7. Published-reader aur preview-reader identities/tokens banao.
8. Required five Vercel variables add karo and website production redeploy karo.
9. `/blog-admin` redirect, public blog, preview and publish workflow verify karo.

## Acceptance test

- Editor login → New Post → image upload → Save Draft works.
- Saved unpublished post signed preview mein dikhe; public slug par 404 rahe.
- Wrong post ID, expired handoff and missing preview cookie deny hon.
- Publish ke baad `/blog`, article, homepage references and sitemap fresh hon.
- Worker-to-Vercel webhook temporarily fail karke outbox retry verify karo.
- Unpublish/delete public page remove kare; repeated webhook harmless rahe.
- Incognito and crawler request cover image load kare without token/cookie.
- Arbitrary R2 key, bucket listing and backup path accessible na hon.
- CMS outage existing cached article ko empty content ya false 404 se replace na
  kare.
- Scheduled future post Worker cron ke through publish ho.

## Backup and recovery

- D1 Time Travel recovery point plus periodic offsite export maintain karo.
- R2 media and `EMDASH_ENCRYPTION_KEY` separately back up karo.
- Monthly isolated restore rehearsal mein matching app version use karo.
- Restored outbox events duplicate ho sakte hain; receiver intentionally
  idempotent hai.
- Code rollback database migration rollback nahi hai. Release version, schema
  state and recovery point ek saath record karo.

## Cost policy

Architecture ek Worker, ek D1 database, ek private R2 bucket aur required
session KV tak limited hai. Low traffic free-tier allowances ke andar zero
platform cost possible hai, guaranteed unlimited free service nahi. Usage and
current Cloudflare/Vercel quotas monthly review karo. Dynamic image transforms
public frontend ke path mein intentionally add nahi kiye gaye.

Official references: [Cloudflare deployment](https://docs.emdashcms.com/deployment/cloudflare/),
[REST API](https://docs.emdashcms.com/reference/rest-api/),
[preview](https://docs.emdashcms.com/guides/preview/),
[authentication](https://docs.emdashcms.com/guides/authentication/), and
[backups](https://docs.emdashcms.com/guides/backups/).
