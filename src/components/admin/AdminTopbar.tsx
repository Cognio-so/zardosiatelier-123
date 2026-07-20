import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ExternalLink, Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getEnquiries } from "@/lib/admin-data";
import { clearSession } from "@/lib/admin-auth";

interface AdminTopbarProps {
  onLogout: () => void;
  title?: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleMobileMenu?: () => void;
}

export function AdminTopbar({ onLogout, title, onToggleMobileMenu }: AdminTopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: enquiries = [] } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => getEnquiries(),
  });

  const unreadEnquiries = enquiries
    .filter((e) => e.status === "new")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const hasNotifications = unreadEnquiries.length > 0;

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffD = Math.floor(diffH / 24);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  return (
    <header className="relative z-20 mx-4 mt-4 flex h-20 shrink-0 items-center gap-4 rounded-[28px] border border-white/70 bg-white/70 px-5 shadow-[0_18px_60px_rgba(31,41,55,0.08)] backdrop-blur-2xl lg:mx-6 lg:px-6">
      {onToggleMobileMenu && (
        <button
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
          title="Open menu"
          className="admin-secondary-btn flex size-10 items-center justify-center lg:hidden"
        >
          <Menu size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h1 className="truncate text-[18px] font-semibold tracking-[-0.03em] text-slate-950">{title}</h1>}
        <p className="mt-1 hidden text-xs font-medium text-slate-400 sm:block">Premium operations cockpit</p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://www.zardosiatelier.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View live website (opens in new tab)"
          title="View live website (opens in new tab)"
          className="admin-secondary-btn hidden items-center gap-2 px-4 py-2.5 text-xs font-bold transition hover:-translate-y-0.5 hover:text-slate-950 sm:flex"
        >
          <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
          <span>View Site</span>
        </a>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-expanded={showNotifications}
            aria-haspopup="true"
            aria-label={`Notifications panel: ${unreadEnquiries.length} new notifications`}
            title={`Notifications panel: ${unreadEnquiries.length} new notifications`}
            className="admin-secondary-btn relative flex size-10 items-center justify-center transition hover:-translate-y-0.5"
          >
            <Bell size={15} strokeWidth={1.8} aria-hidden="true" />
            {hasNotifications && <span className="absolute right-2 top-2 size-2 rounded-full bg-[#c9a44c] ring-2 ring-white" />}
            <span className="sr-only">Notifications</span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="admin-glass absolute right-0 top-full z-20 mt-3 w-80 overflow-hidden p-2"
                  role="dialog"
                  aria-label="Recent notifications"
                >
                  <div className="flex items-center justify-between px-3 py-3">
                    <span className="text-sm font-bold text-slate-950">Notifications</span>
                    {hasNotifications && <span className="admin-badge" aria-label={`${unreadEnquiries.length} new`}>{unreadEnquiries.length} New</span>}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {unreadEnquiries.length > 0 ? (
                      unreadEnquiries.slice(0, 3).map((enq) => (
                        <Link
                          key={enq.id}
                          to="/admin/enquiries"
                          aria-label={`Unread enquiry from ${enq.name}: ${enq.message}`}
                          title={`Unread enquiry from ${enq.name}`}
                          className="block rounded-2xl px-3 py-3 transition hover:bg-white/70"
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <span className="truncate text-sm font-semibold text-slate-950">{enq.name}</span>
                            <span className="shrink-0 text-[10px] font-semibold text-slate-400">{formatDate(enq.createdAt)}</span>
                          </div>
                          <p className="line-clamp-2 text-xs leading-5 text-slate-500">{enq.message}</p>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-10 text-center text-xs font-medium text-slate-400">No new notifications</div>
                    )}
                  </div>
                  <Link
                    to="/admin/enquiries"
                    aria-label="View all enquiries in panel"
                    title="View all enquiries in panel"
                    className="mt-1 block rounded-2xl py-3 text-center text-xs font-bold text-[#c9a44c] transition hover:bg-white/70"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all enquiries
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}