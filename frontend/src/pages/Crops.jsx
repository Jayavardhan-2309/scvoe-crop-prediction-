import { useEffect, useState } from "react";
import { getRecommendations } from "../api/recommendApi";
import { useLocationContext } from "../context/LocationContext";

function Crops() {
  const [data, setData] = useState([]);

  const { location } = useLocationContext();

  useEffect(() => {
    getRecommendations(location).then((res) => {
      if (!res) return; // no state/region selected
      setData(res.recommendations);
    });
  }, [location]);


  return (
    <div>
      <h2>🌾 Crops</h2>
      <p>Compare all crops based on yield and confidence</p>

      <table style={styles.table}>
        <thead>
        <tr>
          <th style={styles.th}>Crop</th>
          <th style={styles.th}>Expected Yield (kg/ha)</th>
          <th style={styles.th}>Historical Avg</th>
          <th style={styles.th}>Confidence</th>
        </tr>
      </thead>

      <tbody>
        {data.map((crop) => (
          <tr
            key={crop.crop}
            style={{ cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f8f4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            <td style={styles.td}>{crop.crop}</td>
            <td style={styles.td}>{crop.expected_yield}</td>
            <td style={styles.td}>{crop.historical_avg_yield ?? "N/A"}</td>
            <td style={{ ...styles.td, ...confidenceStyle(crop.confidence) }}>
              {crop.confidence}
            </td>
          </tr>
        ))}
      </tbody>

      </table>

    </div>
  );
}

function confidenceStyle(level) {
  if (level === "High") return { color: "green", fontWeight: "bold" };
  if (level === "Medium") return { color: "orange" };
  return { color: "red" };
}

const styles = {
  table: {
    width: "100%",
    marginTop: "1.5rem",
    borderCollapse: "collapse",
    background: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  th: {
    padding: "12px",
    background: "#e8f5e9",
    textAlign: "left",
    fontWeight: "600",
    borderBottom: "2px solid #c8e6c9"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eeeeee"
  }
};


export default Crops;
