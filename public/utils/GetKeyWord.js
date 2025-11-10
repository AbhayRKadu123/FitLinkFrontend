function getSearchKeyword(exerciseName) {
  const lower = exerciseName.toLowerCase();

  if (lower.includes("chest")) return "chest workout";
  if (lower.includes("tricep")) return "triceps workout";
  if (lower.includes("bicep")) return "biceps curls";
  if (lower.includes("leg")) return "leg workout";
  if (lower.includes("shoulder")) return "shoulder workout";
  if (lower.includes("back")) return "back workout";
  if (lower.includes("push")) return "push workout";
  if (lower.includes("pull")) return "pull workout";
  if (lower.includes("core") || lower.includes("abs")) return "abs workout";

  return "gym workout"; // default fallback
}
// `https://source.unsplash.com/600x400/?${encodeURIComponent(getSearchKeyword(exerciseName))}`

export default getSearchKeyword;