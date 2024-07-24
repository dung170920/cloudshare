// generate-icon-types.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Adjust the path to your JSON file
const jsonPath = path.resolve(__dirname, "src/assets/icons.json");

// Read and parse the JSON data
const iconsData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// Define the types based on your JSON structure
type IconSetItem = {
  properties: {
    name: string;
  };
};

type IconSet = {
  icons: IconSetItem[];
};

const iconSet = iconsData as IconSet;
const iconNames = iconSet.icons.map((icon) => icon.properties.name);

// Generate TypeScript type definition
const typeDefinition = `export type IconName = ${iconNames.map((name) => `"${name}"`).join(" | ")};`;

// Write the type definition to a file
const outputPath = path.resolve(__dirname, "src/types/icon-types.d.ts");
fs.writeFileSync(outputPath, typeDefinition);

console.log("TypeScript types generated successfully!");
