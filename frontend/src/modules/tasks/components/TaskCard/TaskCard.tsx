import { AlertTriangleIcon, GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { memo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@/shared/components/ui";
import type { Task } from "../../types";
import { useToggleTaskMutation } from "../../hooks/useToggleTaskMutation";
import { useDeleteTaskMutation } from "../../hooks/useDeleteTaskMutation";
import { getPriorityVariant } from "../../utils/priority";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard = memo(function TaskCard({ task, onClick }: TaskCardProps) {
  const toggle = useToggleTaskMutation();
  const remove = useDeleteTaskMutation();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    opacity: isDragging ? 0 : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      size="sm"
      className="group/card cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-2">
          <div
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="mt-0.5 cursor-grab active:cursor-grabbing text-muted-foreground shrink-0 touch-none"
          >
            <GripVerticalIcon className="size-4" />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) =>
                toggle.mutate({ id: task.id, completed: !!checked })
              }
              className="mt-0.5 shrink-0"
            />
          </div>
          <CardTitle>{task.title}</CardTitle>
          <div
            className="ml-auto opacity-0 group-hover/card:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground hover:text-destructive size-6"
                  >
                    <Trash2Icon className="size-3.5" />
                  </Button>
                }
              />
              <AlertDialogContent size="sm">
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="text-destructive size-5 shrink-0" />
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  "{task.title}" will be permanently deleted.
                </AlertDialogDescription>
                <div className="flex justify-end gap-2">
                  <AlertDialogCancel size="sm">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    size="sm"
                    disabled={remove.isPending}
                    onClick={() => remove.mutate(task.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        {task.description ? (
          <span className="text-muted-foreground line-clamp-1 text-xs">
            {task.description}
          </span>
        ) : (
          <span />
        )}
        <Badge variant={getPriorityVariant(task.priority)}>
          P{task.priority}
        </Badge>
      </CardContent>
    </Card>
  );
});

export { TaskCard };
