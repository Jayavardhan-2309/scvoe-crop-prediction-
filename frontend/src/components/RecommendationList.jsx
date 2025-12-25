function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h2>Recommended Crops</h2>

      {recommendations.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "6px",
            marginBottom: "0.5rem"
          }}
        >
          <strong>{item.crop}</strong>
          <div>Expected Yield: {item.expected_yield} kg/ha</div>
        </div>
      ))}
    </div>
  );
}

export default RecommendationList;
