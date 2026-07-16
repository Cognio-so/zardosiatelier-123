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

function slugifyPortfolioTag(tag) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function canonicalTag(tag) {
  return tag;
}

function normalizeItems(items) {
  return items
    .map((item, index) => ({
      id: item.id,
      url: item.url,
      caption: item.caption ?? "",
      tag: canonicalTag(item.tag ?? "Other"),
      categorySlug: item.categorySlug ?? slugifyPortfolioTag(item.tag ?? "Other"),
      uploadedAt: item.uploadedAt,
      order: typeof item.order === "number" ? item.order : index,
      sourcePath: item.sourcePath,
      isDynamic: true,
    }))
    .sort((a, b) => a.order - b.order || a.uploadedAt.localeCompare(b.uploadedAt));
}

async function readMetadata() {
  if (!BLOB_TOKEN || BLOB_TOKEN === "your_vercel_blob_token_here") {
    console.log("No token or default token");
    return [];
  }
  try {
    const { blobs } = await list({ token: BLOB_TOKEN, prefix: METADATA_KEY });
    console.log("Blobs found with prefix:", blobs.map(b => b.pathname));
    const meta = blobs.find((b) => b.pathname === METADATA_KEY);
    if (!meta) {
      console.log("Meta not found");
      return [];
    }
    const res = await fetch(meta.url + `?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) {
      console.log("Fetch failed");
      return [];
    }
    const data = await res.json();
    console.log("Parsed json length:", data.length);
    return normalizeItems(data);
  } catch (err) {
    console.error("Catch block:", err);
    return [];
  }
}

async function main() {
  const items = await readMetadata();
  console.log("Returned items count:", items.length);
}

main();
