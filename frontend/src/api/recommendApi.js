export async function getRecommendations() {
  const res = await fetch("http://localhost:5000/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      state: "Karnataka",
      region: "South",
      rainfallType: "Heavy",
      cyclone: false
    })
  });

  return res.json();
}