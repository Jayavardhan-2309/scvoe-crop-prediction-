export function getSeasonByDate(date = new Date()) {
  const month = date.getMonth() + 1;

  if (month >= 6 && month <= 9) return "Rainy";
  if (month >= 10 && month <= 2) return "Winter";
  return "Summer";
}
