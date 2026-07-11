import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sun, Moon, User, ExternalLink, ChevronDown } from "lucide-react";
import { clearSession } from "@/lib/admin-auth";

interface AdminTopbarProps {
  onLogout: () => void;
  title?: string;
}

export function AdminTopbar({ onLogout, title }: AdminTopbarProps) {
  const [isDark, setIsDark] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [hasNotifications] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // The admin panel is always dark — this is a placeholder for future light mode
  };

  const handleLogout = () => {
    clearSession();
    onLogout();
  };

  return (
    <header className="h-16 bg-[#111111] border-b border-[#2a2a2a] flex items-center px-6 gap-4 shrink-0 relative z-20">
      {/* Page Title */}
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="text-white font-semibold text-base truncate">
            {title}
          </h1>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* View Site */}
        <a
          href="https://zardosiatelier-123.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a2a2a] text-[#666] hover:text-[#C9A227] hover:border-[#C9A227]/40 transition-all duration-200 text-xs"
        >
          <ExternalLink size={12} />
          <span className="hidden sm:inline">View Site</span>
        </a>

        {/* Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:text-[#C9A227] hover:border-[#C9A227]/40 transition-all duration-200"
          title="Toggle theme"
        >
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:text-[#C9A227] hover:border-[#C9A227]/40 transition-all duration-200">
          <Bell size={14} />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#C9A227] rounded-full" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border border-[#2a2a2a] hover:border-[#C9A227]/40 transition-all duration-200"
          >
            <div className="w-6 h-6 rounded-md bg-[#C9A227] flex items-center justify-center">
              <User size={12} className="text-black" />
            </div>
            <span className="text-[#888] text-xs hidden sm:inline">Admin</span>
            <ChevronDown
              size={12}
              className={`text-[#555] transition-transform duration-200 ${showProfile ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfile(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-20"
                >
                  <div className="px-4 py-3 border-b border-[#2a2a2a]">
                    <p className="text-white text-sm font-medium">Zardosi Admin</p>
                    <p className="text-[#555] text-xs">Super Admin</p>
                  </div>
                  <div className="p-1.5">
                    <a
                      href="/admin/users"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#888] hover:text-white hover:bg-[#222] text-sm transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <User size={13} />
                      Profile & Users
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-sm transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
