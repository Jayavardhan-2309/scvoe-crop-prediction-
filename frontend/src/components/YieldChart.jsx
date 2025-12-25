import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

function YieldChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const chartData = data.map(d => ({
    crop: d.crop,
    predicted: Number(d.expected_yield),
    historical: d.historical_avg_yield
      ? Number(d.historical_avg_yield)
      : 0
  }));

  return (
    <div style={{ height: 320 }}>
      <h3>📊 Yield Comparison</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="predicted" fill="#66bb6a" />
          <Bar dataKey="historical" fill="#90a4ae" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YieldChart;
