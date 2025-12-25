export function generateExplanation({ crop, context, historicalAvg, predicted }) {
  const reasons = [];

  if (context.Rainfall > 150) {
    reasons.push("High rainfall favors water-intensive crops");
  }

  if (context.Soil_Type === "Loamy") {
    reasons.push("Loamy soil supports good root development");
  }

  if (historicalAvg && predicted > historicalAvg) {
    reasons.push(
      `Current yield is above historical average (${historicalAvg} kg/ha)`
    );
  }

  if (context.Temperature >= 25 && context.Temperature <= 32) {
    reasons.push("Temperature range is optimal for crop growth");
  }

  return reasons;
}
