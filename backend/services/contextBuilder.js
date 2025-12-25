import { getSeasonByDate } from "./seasonService.js";
import { getClimate } from "./climateService.js";
import { getSoilData } from "./soilService.js";

export function buildContext({ state, region, rainfallType, cyclone, seasonOverride }) {
const season = seasonOverride || getSeasonByDate();
  const climate = getClimate(state, region, season);
  const soil = getSoilData(state, region);

  let rainfall = 50; // default

  if (season === "Rainy") {
    rainfall = rainfallType === "Heavy" ? 220 :
               rainfallType === "Moderate" ? 120 :
               rainfallType === "Drizzle" ? 40 : 20;
  } else if (cyclone === true) {
    rainfall = 180;
  }

  return {
    State: state,
    District: "Auto",
    Region: region,
    Soil_Type: soil.soil,

    Temperature: climate.temp,
    Humidity: climate.humidity,
    Rainfall: rainfall,

    pH: 6.5,
    Nitrogen: soil.N,
    Phosphorus: soil.P,
    Potassium: soil.K,

    Organic_Carbon: 0.8,
    Electrical_Conductivity: 1.2,
    Irrigation_Type: "Rainfed",
    Fertilizer_Used: "Urea",
    Pesticide_Used: "Yes",

    Soil_Moisture: season === "Rainy" ? 30 : 18,
    Altitude: 750,
    Sunshine_Hours: season === "Winter" ? 8 : 6,
    Wind_Speed: cyclone ? 25 : 10,
    Evapotranspiration: season === "Summer" ? 6 : 4.5
  };
}
