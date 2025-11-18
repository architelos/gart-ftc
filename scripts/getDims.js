const ASSET_PATH = "src/data/assets";
const DIMS_PATH = "src/data/dims.json";

// ----------

import { writeFileSync, globSync } from "fs";
import { imageSizeFromFile } from "image-size/fromFile";

const assets = globSync(`${ASSET_PATH}/**/*.{png,jpg,jpeg,webp,avif}`);
const dims = {};

for (let file of assets) {
  file = file.replace(/\\/g, "/");

  const { width, height } = await imageSizeFromFile(file);
  const key = file.replace(/^.*assets\//, "");

  dims[key] = { w: width, h: height };
  console.log(`- saved dims (w ${width} h ${height}) for ${file}`);
}

console.log();
writeFileSync(DIMS_PATH, JSON.stringify(dims, null, 2));

console.log("done!\n");
