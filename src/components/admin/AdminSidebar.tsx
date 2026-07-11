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
  ChevronDown,
  Home,
  Users,
  Image,
  User,
  LogOut,
} from "lucide-react";
import zaLogo from "@/assets/za-logo.png";
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
  onLogout?: () => void;
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;

  const filteredItems = NAV_ITEMS.filter((item) =>
    search === "" || item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    clearSession();
    if (typeof window !== "undefined") {
      localStorage.removeItem("za_admin_pass");
    }
    onLogout?.();
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 96 : 292 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative m-4 mr-0 flex h-[calc(100vh-2rem)] shrink-0 flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/70 shadow-[0_24px_80px_rgba(31,41,55,0.10)] backdrop-blur-2xl"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Logo Header */}
      <div className="flex h-24 items-center px-5 shrink-0">
        <div className="flex min-w-0 items-center gap-3">
          {/* Logo container — bigger size for HD clarity */}
          <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-inner">
            <img
              src={zaLogo}
              alt="ZA Monogram"
              className="absolute h-auto w-[145px] max-w-none no-preview"
              style={{
                top: "-10px",
                left: "-43px",
                filter: "drop-shadow(0 4px 12px rgba(16,24,40,0.12))",
              }}
            />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="min-w-0"
              >
                <p className="truncate text-[18px] font-bold tracking-[-0.02em] text-slate-950">
                  Zardosi Atelier
                </p>
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.30em] text-slate-400">
                  Admin Panel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search (expanded only) — functional */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pb-4">
            <div className="admin-input flex items-center gap-2 px-4 py-3">
              <Search size={15} className="shrink-0 text-slate-400" strokeWidth={1.8} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-xs font-medium text-slate-700 placeholder-slate-400 outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600">
                  ×
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 overflow-y-auto px-3 py-1">
        {filteredItems.map((item) => {
          const isActive = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group relative mb-1 flex items-center gap-3 rounded-[20px] px-4 py-3 text-sm font-semibold transition-all duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#f3d98b] to-[#c9a44c] shadow-[0_14px_32px_rgba(201,164,76,0.22)]"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 rounded-[20px] opacity-0 transition-opacity group-hover:opacity-100 bg-white/70" />
              )}
              <Icon
                size={18}
                className={`relative z-10 shrink-0 transition-colors ${
                  isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-950"
                }`}
                strokeWidth={1.8}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`relative z-10 truncate tracking-[-0.01em] ${
                      isActive ? "text-slate-950" : "text-slate-600 group-hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
        {/* No results state */}
        {filteredItems.length === 0 && !collapsed && (
          <p className="px-4 py-3 text-xs text-slate-400">No results for "{search}"</p>
        )}
      </nav>

      {/* Bottom Section: Admin Profile + Collapse */}
      <div className="relative border-t border-white/70 p-3 space-y-2">
        <AnimatePresence>
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-3 right-3 z-20 mb-2 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl p-2"
              >
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-xs font-bold text-slate-900">Zardosi Admin</p>
                  <p className="text-[10px] font-medium text-slate-400">Super Admin</p>
                </div>
                <Link
                  to="/admin/users"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                >
                  <Users size={13} />
                  Profile & Users
                </Link>
                <button
                  onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Admin profile card button */}
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`group flex w-full items-center gap-3 rounded-[20px] border border-slate-200 bg-white/95 px-3 py-3 transition-all duration-200 hover:bg-white hover:border-slate-300 shadow-[0_8px_30px_rgba(201,164,76,0.06)] hover:shadow-[0_8px_30px_rgba(201,164,76,0.12)] ${showProfileMenu ? 'border-slate-300 bg-white' : ''}`}
        >
          <div className="admin-gold-icon flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm">
            <User size={16} strokeWidth={1.8} />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-bold text-slate-800">Zardosi Admin</p>
              <p className="text-[11px] font-medium text-slate-400">Super Admin</p>
            </div>
          )}
          {!collapsed && (
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
          )}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-3 rounded-[18px] px-4 py-2.5 text-slate-400 transition-all hover:bg-white/70 hover:text-slate-700"
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span className="text-xs font-semibold">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}