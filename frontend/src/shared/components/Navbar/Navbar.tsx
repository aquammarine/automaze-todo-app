import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useLogoutMutation } from "@/modules/auth/hooks/useLogoutMutation";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogoutMutation();

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <span className="text-primary-foreground text-xs font-bold">A</span>
          </div>
          <span className="font-semibold">Automaze</span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">{user.email}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={logout.isPending}
              onClick={() => logout.mutate()}
            >
              {logout.isPending ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export { Navbar };
