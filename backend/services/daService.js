import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const histPath = path.join(__dirname, "../data/da/historicalYield.json");
const historical = JSON.parse(fs.readFileSync(histPath, "utf-8"));

export function getHistoricalYield(state, region, season, crop) {
  return historical?.[state]?.[region]?.[season]?.[crop] || null;
}