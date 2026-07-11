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
  const [isDark, setIsDark] = useState(false);

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

  const toggleTheme = () => {
    setIsDark(false);
    localStorage.setItem("admin-theme", "light");
  };

  const pageTitle = PAGE_TITLES[pathname] ?? "Admin";

  if (!authChecked) {
    return (
      <div className="admin-theme flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#C9A227]" size={24} />
      </div>
    );
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="admin-theme flex h-screen overflow-hidden light">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar onLogout={handleLogout} title={pageTitle} isDark={isDark} onToggleTheme={toggleTheme} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}