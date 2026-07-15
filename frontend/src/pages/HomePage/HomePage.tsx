import { useAuthStore } from "@/shared/stores/auth.store";
import { GuestView } from "./components/GuestView";
import { DashboardView } from "./components/DashboardView";

function HomePage() {
  const user = useAuthStore((state) => state.user);

  return user ? <DashboardView /> : <GuestView />;
}

export { HomePage };
