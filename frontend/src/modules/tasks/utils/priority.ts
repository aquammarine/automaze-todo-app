export type PriorityColor = "emerald" | "amber" | "rose";

export const PRIORITY_GROUPS: {
  label: string;
  priorities: number[];
  color: PriorityColor;
}[] = [
  { label: "Low",    priorities: [1, 2, 3],    color: "emerald" },
  { label: "Medium", priorities: [4, 5, 6, 7], color: "amber"   },
  { label: "High",   priorities: [8, 9, 10],   color: "rose"    },
];

export const PRIORITY_COLOR_CLASSES: Record<
  PriorityColor,
  { selected: string; idle: string; activeLabel: string }
> = {
  emerald: {
    selected: "bg-emerald-500 text-white border-emerald-500 shadow-sm",
    idle: "border-emerald-200 text-emerald-400 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700",
    activeLabel: "text-emerald-600",
  },
  amber: {
    selected: "bg-amber-500 text-white border-amber-500 shadow-sm",
    idle: "border-amber-200 text-amber-400 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700",
    activeLabel: "text-amber-600",
  },
  rose: {
    selected: "bg-rose-500 text-white border-rose-500 shadow-sm",
    idle: "border-rose-200 text-rose-400 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700",
    activeLabel: "text-rose-600",
  },
};

export function getPriorityGroup(priority: number) {
  return PRIORITY_GROUPS.find((g) => g.priorities.includes(priority));
}

export function getPriorityVariant(priority: number) {
  if (priority >= 8) return "priority-high";
  if (priority >= 4) return "priority-medium";
  return "priority-low";
}
