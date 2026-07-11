import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/SettingsAdmin")),
});
