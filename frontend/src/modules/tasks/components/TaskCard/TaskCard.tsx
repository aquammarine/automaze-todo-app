import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";
import type { Task } from "../../types";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card size="sm" className="cursor-pointer transition-shadow hover:shadow-md">
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
        <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
          P{task.priority}
        </span>
      </CardContent>
    </Card>
  );
}

export { TaskCard };
