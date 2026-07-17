import { Trash2Icon } from "lucide-react";
import {
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

function TaskCard({ task, onClick }: TaskCardProps) {
  const toggle = useToggleTaskMutation();
  const remove = useDeleteTaskMutation();

  return (
    <Card
      size="sm"
      className="group/card cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start gap-2">
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
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={remove.isPending}
              onClick={() => remove.mutate(task.id)}
              className="text-muted-foreground hover:text-destructive size-6"
            >
              <Trash2Icon className="size-3.5" />
            </Button>
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
}

export { TaskCard };
