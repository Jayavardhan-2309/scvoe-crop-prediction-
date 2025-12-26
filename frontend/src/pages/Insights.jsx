import { useEffect, useState } from "react";
import { useLocationContext } from "../context/LocationContext";
import { getRecommendations } from "../api/recommendApi";
import YieldChart from "../components/YieldChart";
import ContextSummary from "../components/ContextSummary";
import WhyCard from "../components/WhyCard";

function Insights() {
  const { location } = useLocationContext();
  const [data, setData] = useState([]);
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (!location.state || !location.region) return;

    getRecommendations(location).then((res) => {
      setData(res.recommendations);
      setContext(res.context_used);
    });
  }, [location]);

  if (!location.state || !location.region) {
    return <p>Please select State and Region to view insights.</p>;
  }

  return (
    <div>
      <h1>🧠 Insights</h1>

      <ContextSummary context={context} />

      <h2>📊 Yield Comparison</h2>
      <YieldChart data={data} />

      <h2>🔍 Why These Crops?</h2>
      {data.map((crop) => (
        <WhyCard key={crop.crop} crop={crop} />
      ))}
    </div>
  );
}

export default Insights;
