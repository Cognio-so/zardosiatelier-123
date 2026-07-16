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
  X,
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
  isDark?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ onLogout, isDark: _isDark, isMobile = false, onClose }: AdminSidebarProps) {
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
      animate={isMobile ? { width: 280 } : { width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`relative flex shrink-0 flex-col overflow-hidden border border-white/70 bg-white/70 shadow-[0_16px_45px_rgba(31,41,55,0.08)] backdrop-blur-2xl transition-all ${
        isMobile 
          ? "h-full rounded-r-[20px] m-0 border-y-0 border-l-0" 
          : "m-4 mr-0 h-[calc(100vh-2rem)] rounded-[20px]"
      }`}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Logo Header */}
      <div className={`flex h-20 items-center shrink-0 transition-all duration-300 ${collapsed ? "justify-center px-0" : "px-4 justify-between"}`}>
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Logo container */}
          <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/80 bg-white/70 shadow-inner transition-all duration-300 ${collapsed ? "size-11" : "size-14"}`}>
            <img
              src={zaLogo}
              alt="Zardosi Atelier Monogram Logo"
              className="absolute h-auto max-w-none no-preview transition-all duration-300"
              style={collapsed ? {
                width: "90px",
                top: "-5px",
                left: "-25px",
                filter: "drop-shadow(0 4px 8px rgba(16,24,40,0.1))",
              } : {
                width: "128px",
                top: "-8px",
                left: "-38px",
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
                <p className="truncate text-[15px] font-bold tracking-[-0.02em] text-slate-950">
                  Zardosi Atelier
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Admin Panel
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            title="Close menu"
            className="rounded-2xl p-2 text-slate-500 hover:bg-white/70 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <X size={15} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Search (expanded only) */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-3 pb-3">
            <div className="admin-input flex items-center gap-2 px-3 py-2">
              <Search size={13} className="shrink-0 text-slate-400" strokeWidth={1.8} aria-hidden="true" />
              <label htmlFor="sidebar-search" className="sr-only">Search navigation items</label>
              <input
                id="sidebar-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-[11px] font-medium text-slate-700 placeholder-slate-400 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                  aria-label="Clear search query"
                  title="Clear search query"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5" aria-label="Sidebar navigation">
        {filteredItems.map((item) => {
          const isActive = item.to === "/admin" ? pathname === "/admin" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
              aria-label={item.label}
              title={item.label}
              className={`group relative flex items-center transition-all duration-200 ${
                collapsed 
                  ? "h-10 w-10 justify-center rounded-[12px] mx-auto" 
                  : "h-9.5 gap-2.5 rounded-[12px] px-3 mx-1 text-sm font-semibold"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-[#f3d98b] to-[#c9a44c] shadow-[0_6px_16px_rgba(201,164,76,0.15)]"
                  transition={{ type: "spring", bounce: 0.18, duration: 0.4 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 rounded-[12px] opacity-0 transition-opacity group-hover:opacity-100 bg-white/70" />
              )}
              <Icon
                size={15}
                className={`relative z-10 shrink-0 transition-colors ${
                  isActive ? "text-slate-950" : "text-slate-500 group-hover:text-slate-950"
                }`}
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`relative z-10 truncate tracking-[-0.01em] ${
                      isActive ? "text-slate-950" : "text-slate-650 group-hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
        {filteredItems.length === 0 && !collapsed && (
          <p className="px-3 py-2 text-[11px] text-slate-400">No results for "{search}"</p>
        )}
      </nav>

      {/* Bottom Section: Admin Profile + Collapse */}
      <div className="relative border-t border-white/70 p-2.5 space-y-1.5 flex flex-col items-center">
        <AnimatePresence>
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute z-20 mb-2 overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-2xl p-1.5 ${
                  collapsed 
                    ? "left-full bottom-3 ml-2 w-44" 
                    : "bottom-full left-2 right-2"
                }`}
                role="menu"
                aria-label="Profile actions"
              >
                <div className="border-b border-slate-100 px-2 py-1">
                  <p className="text-[11px] font-bold text-slate-900">Zardosi Admin</p>
                  <p className="text-[9px] font-medium text-slate-400">Super Admin</p>
                </div>
                <Link
                  to="/admin/users"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-55 hover:text-slate-950"
                  role="menuitem"
                >
                  <Users size={11} aria-hidden="true" />
                  Profile & Users
                </Link>
                <button
                  onClick={() => { setShowProfileMenu(false); handleLogout(); }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-semibold text-red-600 transition hover:bg-red-50"
                  role="menuitem"
                >
                  <LogOut size={11} aria-hidden="true" />
                  Sign Out
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Admin profile card button */}
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          aria-haspopup="menu"
          aria-expanded={showProfileMenu}
          aria-label="Profile menu options"
          title="Profile menu options"
          className={`group flex items-center transition-all duration-200 border border-slate-200 bg-white shadow-[0_4px_12px_rgba(201,164,76,0.03)] hover:bg-slate-55/90 ${
            collapsed 
              ? "h-10 w-10 justify-center rounded-[12px]" 
              : "w-full gap-2 rounded-[12px] px-2 py-1.5 hover:border-slate-350"
          } ${showProfileMenu ? 'border-slate-300 bg-white' : ''}`}
        >
          <div className="admin-gold-icon flex size-7 shrink-0 items-center justify-center rounded-lg shadow-sm">
            <User size={13} strokeWidth={1.8} aria-hidden="true" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-xs font-bold text-slate-800">Zardosi Admin</p>
              <p className="text-[9px] font-medium text-slate-400">Super Admin</p>
            </div>
          )}
          {!collapsed && (
            <ChevronDown size={11} className={`text-slate-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
          )}
        </button>


      </div>
    </motion.aside>
  );
}