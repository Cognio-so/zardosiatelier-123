import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Images,
  MessageSquare,
  Settings,
  Globe,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Users,
  Image,
  Sparkles,
} from "lucide-react";
import { clearSession } from "@/lib/admin-auth";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", to: "/admin/portfolio", icon: Images },
  { label: "Gallery", to: "/admin/gallery", icon: Image },
  { label: "Enquiries", to: "/admin/enquiries", icon: MessageSquare },
  { label: "Homepage CMS", to: "/admin/homepage", icon: Home },
  { label: "SEO", to: "/admin/seo", icon: Globe },
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Admin Users", to: "/admin/users", icon: Users },
];

interface AdminSidebarProps {
  onLogout: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;

  const handleLogout = () => {
    clearSession();
    onLogout();
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 280 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col h-full bg-[#111111] border-r border-[#2a2a2a] overflow-hidden shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[#2a2a2a] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#C9A227] flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-black" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <p className="text-white font-semibold text-sm leading-tight truncate" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Zardosi Atelier
                  </p>
                  <p className="text-[#666] text-[10px] uppercase tracking-widest">
                    Admin Panel
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search (expanded only) */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3 py-3 border-b border-[#2a2a2a]"
            >
              <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2">
                <Search size={13} className="text-[#555] shrink-0" />
                <span className="text-[#444] text-xs">Search...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.to === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 relative transition-all duration-150"
                style={{
                  background: isActive
                    ? "rgba(201, 162, 39, 0.12)"
                    : "transparent",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-[rgba(201,162,39,0.12)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon
                  size={17}
                  className="shrink-0 transition-colors duration-150 relative z-10"
                  style={{ color: isActive ? "#C9A227" : "#555" }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium relative z-10 transition-colors duration-150 truncate"
                      style={{ color: isActive ? "#C9A227" : "#888" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#C9A227] rounded-r-full"
                    layoutId="active-bar"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Logout + Collapse */}
        <div className="px-2 py-3 border-t border-[#2a2a2a] space-y-1">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#666] hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <LogOut size={17} className="shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-[#444] hover:text-[#666] hover:bg-[#1a1a1a] transition-all duration-150"
          >
            {collapsed ? (
              <ChevronRight size={15} />
            ) : (
              <>
                <ChevronLeft size={15} />
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs"
                  >
                    Collapse
                  </motion.span>
                </AnimatePresence>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Logout Confirm Dialog */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 w-80 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <LogOut size={18} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-1">
                Sign out?
              </h3>
              <p className="text-[#666] text-sm mb-6">
                You'll need to re-enter your password to access the admin panel.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm hover:border-[#444] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
