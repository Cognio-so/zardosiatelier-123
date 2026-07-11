import sharp from "sharp";
import path from "path";
import fs from "fs";

const assetsDir = path.resolve("src/assets");

async function compressImage(filename, quality = 80) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  const inputPath = path.join(assetsDir, filename);
  const outputPath = path.join(assetsDir, `${basename}.webp`);

  if (!fs.existsSync(inputPath)) {
    console.log(`Skipping: ${filename} does not exist.`);
    return;
  }

  try {
    console.log(`Compressing ${filename} -> ${basename}.webp...`);
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    console.log(`Success: Generated ${basename}.webp (${fs.statSync(outputPath).size} bytes)`);
  } catch (error) {
    console.error(`Error compressing ${filename}:`, error);
  }
}

async function run() {
  // Compress the heavy branding logo (3.06 MB)
  await compressImage("za-logo.png", 85);

  // Compress other heavy landing page cards
  await compressImage("zardozi-paisley.jpeg", 80);
  await compressImage("resham-zari-card.png", 80);
  await compressImage("pearl-work-card.jpg", 80);
  await compressImage("crystal-1.jpeg", 80);
  await compressImage("sequin-3.jpeg", 80);
}

run();
