import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function YieldChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = data.map(d => ({
    crop: d.crop,
    yield: d.expected_yield
  }));

  return (
    <BarChart
      width={700}
      height={300}
      data={chartData}
      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
    >
      <XAxis dataKey="crop" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="yield" fill="#2e7d32" />
    </BarChart>
  );
}

export default YieldChart;
