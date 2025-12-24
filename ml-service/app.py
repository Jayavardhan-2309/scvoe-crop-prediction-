from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load model ONCE at startup
model = joblib.load("model.joblib")

app = FastAPI(title="SCVOE Crop Recommendation API")

EXPECTED_COLUMNS = [
    "State",
    "District",
    "Region",
    "Soil_Type",
    "Temperature (°C)",
    "Humidity (%)",
    "Rainfall (mm)",
    "pH",
    "Nitrogen (N)",
    "Phosphorus (P)",
    "Potassium (K)",
    "Organic_Carbon (%)",
    "Electrical_Conductivity (dS/m)",
    "Irrigation_Type",
    "Fertilizer_Used",
    "Pesticide_Used",
    "Soil_Moisture (%)",
    "Altitude (m)",
    "Sunshine_Hours",
    "Wind_Speed (km/h)",
    "Evapotranspiration (mm/day)",
    "Crop"
]


# ---------- INPUT SCHEMA ----------
class CropInput(BaseModel):
    State: str
    District: str
    Region: str
    Soil_Type: str
    Temperature: float
    Humidity: float
    Rainfall: float
    pH: float
    Nitrogen: int
    Phosphorus: int
    Potassium: int
    Organic_Carbon: float
    Electrical_Conductivity: float
    Irrigation_Type: str
    Fertilizer_Used: str
    Pesticide_Used: str
    Soil_Moisture: float
    Altitude: int
    Sunshine_Hours: float
    Wind_Speed: float
    Evapotranspiration: float

# ---------- CROP LIST ----------
CROPS = [
    "Rice", "Wheat", "Maize",
    "Cotton", "Pulses", "Sugarcane", "Millets"
]

COLUMN_MAPPING = {
    "Temperature": "Temperature (°C)",
    "Humidity": "Humidity (%)",
    "Rainfall": "Rainfall (mm)",
    "Organic_Carbon": "Organic_Carbon (%)",
    "Electrical_Conductivity": "Electrical_Conductivity (dS/m)",
    "Soil_Moisture": "Soil_Moisture (%)",
    "Wind_Speed": "Wind_Speed (km/h)",
    "Evapotranspiration": "Evapotranspiration (mm/day)"
}

# ---------- RECOMMENDATION LOGIC ----------
def recommend_crops(input_data: dict, top_n=3):
    results = []

    # Step 1: map API keys → training column names
    mapped_input = {}
    for key, value in input_data.items():
        if key in COLUMN_MAPPING:
            mapped_input[COLUMN_MAPPING[key]] = value
        else:
            mapped_input[key] = value

    for crop in CROPS:
        row = mapped_input.copy()
        row["Crop"] = crop

        # Step 2: ensure ALL expected columns exist
        for col in EXPECTED_COLUMNS:
            if col not in row:
                row[col] = "Unknown" if col in [
                    "State", "District", "Region",
                    "Soil_Type", "Irrigation_Type",
                    "Fertilizer_Used", "Pesticide_Used"
                ] else 0

        # Step 3: build DataFrame in correct order
        df = pd.DataFrame([[row[col] for col in EXPECTED_COLUMNS]],
                          columns=EXPECTED_COLUMNS)

        prediction = model.predict(df)[0]

        results.append({
            "crop": crop,
            "expected_yield": round(float(prediction), 2)
        })

    results.sort(key=lambda x: x["expected_yield"], reverse=True)
    return results[:top_n]


@app.get("/")
def root():
    return {
        "message": "SCVOE Crop Recommendation API is running",
        "docs": "Visit /docs for API documentation"
    }

# ---------- API ENDPOINT ----------
@app.post("/recommend")
def recommend(input_data: CropInput):
    recommendations = recommend_crops(input_data.dict())
    return {
        "recommendations": recommendations
    }
