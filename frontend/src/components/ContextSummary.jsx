function ContextSummary({ context }) {
  if (!context) return null; // 🛑 IMPORTANT

  return (
    <div style={styles.box}>
      <h3>📌 Context Summary</h3>
      <p><b>State:</b> {context.State}</p>
      <p><b>Region:</b> {context.Region}</p>
      <p><b>Soil:</b> {context.Soil_Type}</p>
      <p><b>Temperature:</b> {context.Temperature} °C</p>
      <p><b>Humidity:</b> {context.Humidity} %</p>
      <p><b>Rainfall:</b> {context.Rainfall} mm</p>
    </div>
  );
}



function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "2rem"
  },
  card: {
    padding: "1rem",
    background: "#f1f8f4",
    borderRadius: "8px"
  },
  box: {
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }
};

export default ContextSummary;