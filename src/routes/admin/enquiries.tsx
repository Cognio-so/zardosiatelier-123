import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/enquiries")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/EnquiriesAdmin")),
});
