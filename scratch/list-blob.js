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

const token = envVars["BLOB_READ_WRITE_TOKEN"];

async function main() {
  try {
    const { blobs } = await list({ token });
    const jsonBlobs = blobs.filter(b => b.pathname.endsWith(".json"));
    for (const b of jsonBlobs) {
      console.log(`Path: ${b.pathname}`);
      const res = await fetch(b.url);
      const data = await res.json();
      console.log(`  Is Array: ${Array.isArray(data)}`);
      if (Array.isArray(data)) {
        console.log(`  Length: ${data.length}`);
        if (data.length > 0) {
          console.log(`  First item:`, data[0]);
          console.log(`  Last item:`, data[data.length - 1]);
        }
      } else {
        console.log(`  Keys:`, Object.keys(data));
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
