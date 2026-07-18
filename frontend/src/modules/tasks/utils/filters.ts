import type { TaskFilterParams } from "../types";

export function getActiveTab(completion: TaskFilterParams["completion"]): "all" | "undone" | "done" {
  if (completion === "undone") return "undone";
  if (completion === "done") return "done";
  return "all";
}
