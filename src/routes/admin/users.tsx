import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/UsersAdmin")),
});
