import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { loadSession } from "@/lib/admin-auth";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/portfolio": "Portfolio",
  "/admin/gallery": "Gallery",
  "/admin/enquiries": "Enquiries",
  "/admin/homepage": "Homepage CMS",
  "/admin/seo": "SEO Management",
  "/admin/settings": "Settings",
  "/admin/users": "Admin Users",
};

function AdminLayout() {
  const navigate = useNavigate();
  const router = useRouterState();
  const pathname = router.location.pathname;
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const session = loadSession();
    if (!session) {
      navigate({ to: "/admin-login" });
    } else {
      setIsAuthed(true);
    }
    setAuthChecked(true);
  }, [navigate]);

  const handleLogout = () => {
    setIsAuthed(false);
    navigate({ to: "/admin-login" });
  };

  const pageTitle = PAGE_TITLES[pathname] ?? "Admin";

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="text-[#C9A227] animate-spin" size={24} />
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar onLogout={handleLogout} title={pageTitle} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
