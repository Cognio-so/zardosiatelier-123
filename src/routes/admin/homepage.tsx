import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/homepage")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/HomepageAdmin")),
});