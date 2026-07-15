import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

const features = [
  {
    icon: CheckCircle,
    title: "Track your tasks",
    description:
      "Create, organize, and complete tasks with ease. Stay on top of everything that matters.",
  },
  {
    icon: Clock,
    title: "Never miss a deadline",
    description:
      "Set due dates and get a clear overview of what needs your attention today.",
  },
  {
    icon: Zap,
    title: "Stay productive",
    description:
      "Focus on what's important. To-Do Application keeps the clutter out and the momentum going.",
  },
];

function GuestView() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium">
          Simple. Focused. Productive.
        </div>
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight">
          Manage your tasks without the chaos
        </h1>
        <p className="text-muted-foreground max-w-lg text-lg">
          To-Do Application helps you organize your work, hit your deadlines,
          and stay focused on what actually moves things forward.
        </p>
        <div className="flex gap-3">
          <Button size="lg">
            <Link to="/register" className="flex items-center gap-2">
              Get started free <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold">Why To-Do Application?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="pb-2">
                <div className="bg-primary/10 mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-5" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export { GuestView };
