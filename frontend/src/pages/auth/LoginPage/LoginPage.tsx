import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/components/ui";
import { LoginForm } from "@/modules/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <Card className="ring-0 shadow-xl shadow-slate-200/80 dark:shadow-slate-950/80">
        <div className="items-center pb-2 px-8 pt-4">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1.5 text-sm transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <CardContent className="px-8 py-6">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

export { LoginPage };
