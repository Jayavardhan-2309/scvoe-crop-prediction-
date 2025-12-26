function RecommendationCards({ data }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      {data.map((item) => (
        <div
          key={item.crop}
          style={{
            padding: "1rem",
            background: "#f5f5f5",
            borderRadius: "8px",
            width: "250px"
          }}
        >
          <h3>{item.crop}</h3>
          <p><b>Expected Yield:</b> {item.expected_yield} kg/ha</p>
          <p><b>Confidence:</b> {item.confidence}</p>

          <ul>
            {item.why.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecommendationCards;