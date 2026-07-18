import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { useCallback } from "react";
import type { Task, TaskFilterParams } from "../../types";
import { useTaskKanban } from "../../hooks/useTaskKanban";
import { getVisibleColumns } from "../../utils/kanban";
import type { KanbanColumn } from "../../utils/kanban";
import { TaskCard, TaskCardOverlay } from "../TaskCard";

interface TaskKanbanProps {
  tasks: Task[];
  completion?: TaskFilterParams["completion"];
  onTaskClick: (task: Task) => void;
}

interface DroppableColumnProps {
  col: KanbanColumn;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

function DroppableColumn({ col, tasks, onTaskClick }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: col.key });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-3 rounded-lg p-2 transition-colors h-full ${isOver ? "bg-muted/50 ring-2 ring-primary/20" : ""}`}
    >
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${col.color}`} />
        <span className="text-sm font-medium">{col.label}</span>
        <span className="text-muted-foreground text-xs">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-2 min-h-32">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-dashed px-4 py-6 text-center text-xs">
            No tasks
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))
        )}
      </div>
    </div>
  );
}

function TaskKanban({ tasks, completion, onTaskClick }: TaskKanbanProps) {
  const { sensors, draggingTask, handleDragStart, handleDragEnd } = useTaskKanban();
  const columns = getVisibleColumns(completion);
  const handleTaskClick = useCallback((task: Task) => onTaskClick(task), [onTaskClick]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`grid gap-4 ${columns.length === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        {columns.map((col) => (
          <DroppableColumn
            key={col.key}
            col={col}
            tasks={tasks.filter(col.filter)}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {draggingTask && (
          <div className="rotate-1">
            <TaskCardOverlay task={draggingTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export { TaskKanban };
