import { rmSync } from "node:fs";
import { join } from "node:path";

rmSync(join(process.cwd(), ".vercel", "output"), {
  force: true,
  recursive: true,
});
