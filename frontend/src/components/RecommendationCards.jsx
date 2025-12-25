function RecommendationCards({ data }) {
  return (
    <div style={styles.grid}>
      {data.map((r) => (
        <div key={r.crop} style={styles.card}>
          <h3>{r.crop}</h3>
          <p><b>Expected Yield:</b> {r.expected_yield}</p>
          <p><b>Confidence:</b> {r.confidence}</p>

          <ul>
            {r.why.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem"
  },
  card: {
    background: "white",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }
};

export default RecommendationCards;
