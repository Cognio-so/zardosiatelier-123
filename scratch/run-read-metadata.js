import { getPortfolioItems } from "../src/lib/portfolio-admin";
import fs from "fs";

// Manually parse .env.local
const envFile = fs.readFileSync(".env.local", "utf8");
const envVars = {};
for (const line of envFile.split("\n")) {
  if (line.trim().startsWith("#") || !line.includes("=")) continue;
  const [key, ...valueParts] = line.split("=");
  const val = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
  envVars[key.trim()] = val;
}

// Inject env vars to process.env
for (const key in envVars) {
  process.env[key] = envVars[key];
}

async function main() {
  const items = await getPortfolioItems();
  console.log("Returned items count:", items.length);
  const zardoziItems = items.filter(it => it.tag === "Zardozi");
  console.log("Zardozi items count:", zardoziItems.length);
  const tags = [...new Set(items.map(it => it.tag))];
  console.log("Unique tags:", tags);
  const slugs = [...new Set(items.map(it => it.categorySlug))];
  console.log("Unique slugs:", slugs);
}

main();
