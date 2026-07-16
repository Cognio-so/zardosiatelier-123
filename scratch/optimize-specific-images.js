import sharp from "sharp";
import fs from "fs";
import path from "path";

const assetsDir = "src/assets";

const targets = [
  { name: "sequin-3.webp", optName: "sequin-3-opt.webp", maxWidth: 800, quality: 75 },
  { name: "zardozi-paisley.webp", optName: "zardozi-paisley-opt.webp", maxWidth: 800, quality: 75 },
  { name: "za-logo.webp", optName: "za-logo-opt.webp", maxWidth: 200, quality: 80 },
  { name: "pearl-work-card.webp", optName: "pearl-work-card-opt.webp", maxWidth: 600, quality: 75 },
  { name: "resham-zari-card.webp", optName: "resham-zari-card-opt.webp", maxWidth: 600, quality: 75 },
  { name: "crystal-1.webp", optName: "crystal-1-opt.webp", maxWidth: 600, quality: 75 }
];

async function main() {
  for (const target of targets) {
    const filePath = path.join(assetsDir, target.name);
    const optPath = path.join(assetsDir, target.optName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping: ${target.name} (file not found)`);
      continue;
    }
    
    const oldSize = (fs.statSync(filePath).size / 1024).toFixed(1);
    console.log(`Optimizing ${target.name} -> ${target.optName} (Original: ${oldSize} KB)`);
    
    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      let pipeline = image;
      if (metadata.width && metadata.width > target.maxWidth) {
        console.log(`  Resizing from ${metadata.width}px to ${target.maxWidth}px`);
        pipeline = pipeline.resize({ width: target.maxWidth, withoutEnlargement: true });
      }
      
      await pipeline
        .webp({ quality: target.quality, effort: 6 })
        .toFile(optPath);
        
      const newSize = (fs.statSync(optPath).size / 1024).toFixed(1);
      console.log(`  Saved! New size: ${newSize} KB`);
    } catch (err) {
      console.error(`  Error:`, err);
    }
  }
}

main();
