import fs from "fs";
import path from "path";

const srcDir = path.resolve("src");

function replaceDashesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes("—")) {
      // Replace em-dash "—" with a standard hyphen "-"
      const updatedContent = content.replace(/—/g, "-");
      fs.writeFileSync(filePath, updatedContent, "utf8");
      console.log(`Updated dashes in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if ([".tsx", ".ts", ".css", ".html", ".js"].includes(ext)) {
        replaceDashesInFile(fullPath);
      }
    }
  }
}

console.log("Starting em-dash to hyphen replacement across all source files...");
walkDir(srcDir);
console.log("Replacement complete!");
