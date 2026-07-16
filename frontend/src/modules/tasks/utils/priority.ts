export function getPriorityVariant(priority: number) {
  if (priority >= 8) return "priority-high";
  if (priority >= 5) return "priority-medium";
  return "priority-low";
}
