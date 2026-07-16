import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui";

const columns = [
  {
    title: "To do",
    color: "bg-muted-foreground",
    tasks: [
      { title: "Set up CI/CD pipeline", tag: "DevOps" },
      { title: "Write API documentation", tag: "Docs" },
      { title: "Update dependencies", tag: "Maintenance" },
      { title: "Add dark mode toggle", tag: "UI" },
    ],
  },
  {
    title: "In progress",
    color: "bg-primary",
    tasks: [
      { title: "Implement task filtering", tag: "Feature" },
      { title: "Write unit tests for auth", tag: "Testing" },
      { title: "Design onboarding flow", tag: "UI" },
    ],
  },
  {
    title: "Done",
    color: "bg-emerald-500",
    tasks: [
      { title: "Fix auth refresh bug", tag: "Bug" },
      { title: "Register & login pages", tag: "Feature" },
      { title: "Setup axios interceptors", tag: "Infrastructure" },
    ],
  },
];

function TaskBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column) => (
        <div key={column.title} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${column.color}`} />
            <span className="text-sm font-medium">{column.title}</span>
            <span className="text-muted-foreground text-xs">
              {column.tasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {column.tasks.map((task) => (
              <Card
                key={task.title}
                className="cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium leading-snug">
                    {task.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {task.tag}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { TaskBoard };
