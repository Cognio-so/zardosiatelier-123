import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/gallery")({
  component: lazyRouteComponent(() => import("@/components/admin/lazy/GalleryAdmin")),
});