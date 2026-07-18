import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui";
import { GripVerticalIcon } from "lucide-react";
import type { Task } from "../../types";
import { getPriorityVariant } from "../../utils/priority";

interface TaskCardOverlayProps {
  task: Task;
}

function TaskCardOverlay({ task }: TaskCardOverlayProps) {
  return (
    <Card size="sm" className="shadow-xl cursor-grabbing">
      <CardHeader>
        <div className="flex items-start gap-2">
          <GripVerticalIcon className="size-4 mt-0.5 shrink-0 text-muted-foreground" />
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

export { TaskCardOverlay };
