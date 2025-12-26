function WhyCard({ crop }) {
  return (
    <div style={styles.card}>
      <h3>
        🌾 {crop.crop} — <span style={confidenceStyle(crop.confidence)}>{crop.confidence}</span>
      </h3>

      <ul>
        {crop.why.map((reason, i) => (
          <li key={i}>✔ {reason}</li>
        ))}
      </ul>
    </div>
  );
}

function confidenceStyle(confidence) {
  return {
    color:
      confidence === "High"
        ? "green"
        : confidence === "Medium"
        ? "orange"
        : "red"
  };
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  }
};

export default WhyCard;