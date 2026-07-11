import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin-theme") === "dark";
    }
    return false;
  });

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
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("admin-theme", next ? "dark" : "light");
      return next;
    });
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
    <div className={`admin-theme flex h-screen overflow-hidden transition-colors duration-500 ${isDark ? "dark" : "light"}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar onLogout={handleLogout} isDark={isDark} />
      </div>

      {/* Mobile Sidebar (Slide-over Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-72 shrink-0 flex-col overflow-hidden lg:hidden"
            >
              <AdminSidebar 
                onLogout={handleLogout} 
                isDark={isDark} 
                isMobile 
                onClose={() => setMobileOpen(false)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar 
          onLogout={handleLogout} 
          title={pageTitle} 
          isDark={isDark} 
          onToggleTheme={toggleTheme} 
          onToggleMobileMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}