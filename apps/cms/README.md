# Zardosi Atelier EmDash CMS

Cloudflare-hosted EmDash backend for the journal at
`https://www.zardosiatelier.com/blog`.

## Runtime

- Worker/admin: `https://cms.zardosiatelier.com/_emdash/admin`
- Content API: `https://cms.zardosiatelier.com/_emdash/api`
- MCP: `https://cms.zardosiatelier.com/_emdash/api/mcp`
- Database: D1 binding `DB`
- Private media: R2 binding `MEDIA`
- Sessions: Astro-managed KV binding `SESSION`

The public blog remains part of the existing TanStack Start site on Vercel. It
reads EmDash only from server code. Browser-visible images go through the
versioned `zardosi-next-bridge` media route; the R2 bucket itself stays private.

## Local checks

Requires Node.js 22.22 or newer and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm dev
```

Local admin: `http://localhost:4321/_emdash/admin`.

## Production deployment

```bash
pnpm wrangler login
pnpm wrangler secret put EMDASH_ENCRYPTION_KEY
pnpm wrangler secret put REVALIDATE_HMAC_SECRET
pnpm wrangler secret put PREVIEW_HANDOFF_SECRET
pnpm deploy
```

Do not commit these values. `REVALIDATE_HMAC_SECRET` and
`PREVIEW_HANDOFF_SECRET` must also be configured as server-only Vercel variables.
The EmDash encryption key needs a recovery copy in the company password vault.

After first deploy, finish the setup wizard, register the owner passkey, invite
the client as Editor, and create separate published-read and preview-read API
tokens. Then add the tokens to Vercel as `CMS_READ_TOKEN` and
`CMS_PREVIEW_READ_TOKEN`.

See [the operations runbook](../../docs/emdash-cms-operations.md) for acceptance
tests, recovery notes, and the exact handover sequence.

