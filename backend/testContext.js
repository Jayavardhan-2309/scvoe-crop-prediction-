import { buildContext } from "./services/contextBuilder.js";

const test1 = buildContext({
  state: "Karnataka",
  region: "South",
  rainfallType: "Heavy",
  cyclone: false,
  seasonOverride: "Rainy"
});

const test2 = buildContext({
  state: "Karnataka",
  region: "South",
  rainfallType: null,
  cyclone: true
});

console.log("RAINY / HEAVY RAIN:");
console.log(test1);

console.log("\nNON-RAINY / CYCLONE:");
console.log(test2);
