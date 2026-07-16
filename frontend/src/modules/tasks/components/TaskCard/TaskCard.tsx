import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@/shared/components/ui";
import type { Task } from "../../types";
import { useToggleTaskMutation } from "../../hooks/useToggleTaskMutation";
import { getPriorityVariant } from "../../utils/priority";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const toggle = useToggleTaskMutation();

  return (
    <Card
      size="sm"
      className="cursor-pointer transition-shadow hover:shadow-md"
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
