import { Link } from "@tanstack/react-router";
import { ListTodoIcon, LogOutIcon, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useLogoutMutation } from "@/modules/auth/hooks/useLogoutMutation";

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogoutMutation();

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border/40">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ListTodoIcon className="size-5" />
          <span className="font-semibold">ToDo</span>
        </Link>

        {user && (
          <nav className="flex items-center gap-1">
            <Link
              to="/tasks"
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              activeProps={{
                className:
                  "text-foreground bg-accent rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              }}
            >
              Tasks
            </Link>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
              >
                <Avatar>
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={logout.isPending}
                  onClick={() => logout.mutate()}
                >
                  <LogOutIcon />
                  {logout.isPending ? "Signing out..." : "Sign out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm">
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { Navbar };
