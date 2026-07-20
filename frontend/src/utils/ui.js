export function getCategoryStyle(category) {
  switch (category) {
    case "Work":
      return "bg-blue-500/90 text-white";
    case "Personal":
      return "bg-green-500/90 text-white";
    case "Study":
      return "bg-purple-500/90 text-white";
    default:
      return "bg-app-text-secondary-dark/90 text-white";
  }
}