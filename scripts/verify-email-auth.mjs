import dns from "node:dns/promises";

const domain = process.argv[2] || process.env.MAIL_FROM_DOMAIN || "zardosiatelier.com";
const selector = process.argv[3] || process.env.DKIM_SELECTOR || "google";

async function resolveTxt(name) {
  try {
    const records = await dns.resolveTxt(name);
    return records.map((record) => record.join("")).join(" | ");
  } catch (error) {
    return `ERROR: ${error instanceof Error ? error.message : String(error)}`;
  }
}

const [spf, dmarc, dkim] = await Promise.all([
  resolveTxt(domain),
  resolveTxt(`_dmarc.${domain}`),
  resolveTxt(`${selector}._domainkey.${domain}`),
]);

console.log(`SPF (${domain}): ${spf}`);
console.log(`DMARC (_dmarc.${domain}): ${dmarc}`);
console.log(`DKIM (${selector}._domainkey.${domain}): ${dkim}`);
