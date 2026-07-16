import type { Task } from "@/modules/tasks/types";

interface TaskTableProps {
  tasks: Task[];
}

function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Description</th>
            <th className="px-4 py-3 text-left font-medium">Priority</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Created</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-muted-foreground px-4 py-10 text-center"
              >
                No tasks found.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b last:border-0 transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium">{task.title}</td>
                <td className="text-muted-foreground px-4 py-3">
                  {task.description ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span className="bg-muted rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </td>
                <td className="text-muted-foreground px-4 py-3">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { TaskTable };
