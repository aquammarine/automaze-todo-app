import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  type DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import type { Task } from "../types";
import { ALL_COLUMNS } from "../utils/kanban";
import { useToggleTaskMutation } from "./useToggleTaskMutation";

export function useTaskKanban() {
  const toggle = useToggleTaskMutation();
  const [draggingTask, setDraggingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setDraggingTask(event.active.data.current?.task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setDraggingTask(null);

    if (!over) return;

    const task = active.data.current?.task as Task;
    const targetColumn = ALL_COLUMNS.find((col) => col.key === over.id);

    if (!task || !targetColumn) return;
    if (task.completed === targetColumn.completed) return;

    toggle.mutate({ id: task.id, completed: targetColumn.completed });
  }

  return { sensors, draggingTask, handleDragStart, handleDragEnd };
}
