import { list } from "@vercel/blob";
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

const BLOB_TOKEN = envVars["BLOB_READ_WRITE_TOKEN"] || "";
const METADATA_KEY = "portfolio-data.json";

async function readMetadata() {
  const { blobs } = await list({ token: BLOB_TOKEN, prefix: METADATA_KEY });
  const meta = blobs.find((b) => b.pathname === METADATA_KEY);
  const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
  const data = await res.json();
  return data;
}

async function main() {
  const items = await readMetadata();
  console.log("Total items:", items.length);
  const grouped = {};
  for (const item of items) {
    const key = item.tag || "Unknown";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item.url);
  }
  for (const tag in grouped) {
    console.log(`Tag: "${tag}" has ${grouped[tag].length} items. First few:`);
    console.log(grouped[tag].slice(0, 3));
  }
}

main();
