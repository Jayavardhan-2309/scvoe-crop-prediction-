export async function getRecommendations(location) {
  const token = localStorage.getItem("token");

  // 🚫 Guard: no state/region → no API call
  if (!location?.state || !location?.region) {
    return null;
  }

  const res = await fetch("http://localhost:5000/api/recommend", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      state: location.state,
      region: location.region,
      rainfallType: location.rainfallType || "Normal",
      cyclone: location.cyclone || false
    })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return res.json();
}
