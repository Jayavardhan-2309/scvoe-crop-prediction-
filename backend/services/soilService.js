import fs from "fs";
import path from "path";

const soilPath = path.resolve("data/soil.json");
const soil = JSON.parse(fs.readFileSync(soilPath, "utf-8"));

export function getSoilData(state, region) {
  return soil?.[state]?.[region] || {
    soil: "Loamy",
    N: 80,
    P: 35,
    K: 40
  };
}
