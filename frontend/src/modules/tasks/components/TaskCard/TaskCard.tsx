import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import type { Task } from "../../types";
import { getPriorityVariant } from "../../utils/priority";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      size="sm"
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
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
