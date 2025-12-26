import { useEffect, useState } from "react";
import { useLocationContext } from "../context/LocationContext";
import { getRecommendations } from "../api/recommendApi";
import RecommendationCards from "../components/RecommendationCards";
import LocationSelector from "../components/LocationSelector";

function Dashboard() {
  const { location } = useLocationContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!location.state || !location.region) return;

    getRecommendations(location).then((res) => {
      setData(res.recommendations);
    });
  }, [location]);

  return (
    <>
      <h1>📊 Dashboard</h1>

      {/* LOCATION PICKER */}
      <LocationSelector />

      {/* EMPTY STATE */}
      {!location.state || !location.region ? (
        <p>No data available. Please select State and Region.</p>
      ) : (
        <RecommendationCards data={data} />
      )}
    </>
  );
}

export default Dashboard;