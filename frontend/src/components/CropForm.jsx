import { useState } from "react";

function CropForm({ setRecommendations, setError }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Temperature: "",
    Humidity: "",
    Rainfall: "",
    pH: "",
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Soil_Moisture: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      State: "Karnataka",
      District: "Mysuru",
      Region: "South",
      Soil_Type: "Loamy",

      Temperature: Number(form.Temperature),
      Humidity: Number(form.Humidity),
      Rainfall: Number(form.Rainfall),
      pH: Number(form.pH),
      Nitrogen: Number(form.Nitrogen),
      Phosphorus: Number(form.Phosphorus),
      Potassium: Number(form.Potassium),
      Soil_Moisture: Number(form.Soil_Moisture),

      Organic_Carbon: 0.8,
      Electrical_Conductivity: 1.2,
      Irrigation_Type: "Canal",
      Fertilizer_Used: "Urea",
      Pesticide_Used: "Yes",
      Altitude: 750,
      Sunshine_Hours: 7.5,
      Wind_Speed: 12,
      Evapotranspiration: 4.5
    };

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setRecommendations(data.recommendations);

    } catch (err) {
      setError("Failed to get recommendations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <h3>Enter Soil & Weather Data</h3>

      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "0.5rem" }}>
          <label>{key}</label><br />
          <input
            type="number"
            name={key}
            value={form[key]}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>
    </form>
  );
}

export default CropForm;
