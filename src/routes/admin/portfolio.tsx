import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/portfolio")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/PortfolioAdmin")),
});