import fs from "fs";
import path from "path";
import sharp from "sharp";

const assetsDir = path.resolve("src/assets");

async function optimizeImages() {
  console.log("Starting image optimization under:", assetsDir);
  const files = fs.readdirSync(assetsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
      const inputPath = path.join(assetsDir, file);
      const outputName = path.basename(file, ext) + ".webp";
      const outputPath = path.join(assetsDir, outputName);

      // Check if optimized webp already exists and is newer than source
      if (fs.existsSync(outputPath)) {
        const inputStat = fs.statSync(inputPath);
        const outputStat = fs.statSync(outputPath);
        if (outputStat.mtime > inputStat.mtime) {
          console.log(`Skipping ${file} - already optimized`);
          continue;
        }
      }

      console.log(`Optimizing ${file} -> ${outputName}`);
      try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        let pipeline = image;
        // Resize if it exceeds 1400px width
        if (metadata.width && metadata.width > 1400) {
          console.log(`  Resizing width from ${metadata.width}px to 1400px`);
          pipeline = pipeline.resize({ width: 1400, withoutEnlargement: true });
        }

        await pipeline
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);

        const oldSize = (fs.statSync(inputPath).size / 1024).toFixed(1);
        const newSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
        console.log(`  Done! Size reduced from ${oldSize}KB to ${newSize}KB`);
      } catch (err) {
        console.error(`  Error processing ${file}:`, err);
      }
    }
  }
  console.log("Image optimization complete!");
}

optimizeImages();
