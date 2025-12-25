import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const climatePath = path.join(__dirname, "../data/climate.json");
const climate = JSON.parse(fs.readFileSync(climatePath, "utf-8"));

export function getClimate(state, region, season) {
  return climate?.[state]?.[region]?.[season] || {
    temp: 28,
    humidity: 60
  };
}
