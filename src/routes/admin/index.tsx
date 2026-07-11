import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Images,
  MessageSquare,
  Image,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio-admin";
import { getEnquiries } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{count}</>;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.19, 1, 0.22, 1] as any },
  }),
};

function AdminDashboard() {
  const { data: portfolio = [], isLoading: loadingPortfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const { data: enquiries = [], isLoading: loadingEnquiries } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => getEnquiries(),
  });

  const newEnquiries = enquiries.filter((e) => e.status === "new").length;
  const resolvedEnquiries = enquiries.filter((e) => e.status === "resolved").length;

  const stats = [
    {
      label: "Portfolio Items",
      value: portfolio.length,
      icon: Images,
      href: "/admin/portfolio",
      color: "#C9A227",
      bg: "rgba(201,162,39,0.1)",
      trend: "+3 this month",
    },
    {
      label: "Total Enquiries",
      value: enquiries.length,
      icon: MessageSquare,
      href: "/admin/enquiries",
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.1)",
      trend: `${newEnquiries} unread`,
    },
    {
      label: "New Enquiries",
      value: newEnquiries,
      icon: AlertCircle,
      href: "/admin/enquiries",
      color: "#f87171",
      bg: "rgba(248,113,113,0.1)",
      trend: "Needs attention",
    },
    {
      label: "Resolved",
      value: resolvedEnquiries,
      icon: CheckCircle2,
      href: "/admin/enquiries",
      color: "#4ade80",
      bg: "rgba(74,222,128,0.1)",
      trend: "All time",
    },
  ];

  const recentEnquiries = [...enquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentPortfolio = [...portfolio]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 4);

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
    <div className="p-6 lg:p-8 space-y-8 min-h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-white text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Good morning ✦
        </h2>
        <p className="text-[#555] text-sm mt-1">
          Here's what's happening at Zardosi Atelier
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to={stat.href}
              className="block bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#2a2a2a] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: stat.bg }}
                >
                  <stat.icon size={17} style={{ color: stat.color }} />
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-[#333] group-hover:text-[#555] transition-colors"
                />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {loadingPortfolio || loadingEnquiries ? (
                  <span className="text-[#333]">—</span>
                ) : (
                  <CountUp target={stat.value} />
                )}
              </div>
              <div className="text-[#555] text-xs font-medium">{stat.label}</div>
              <div className="mt-2 flex items-center gap-1.5">
                <TrendingUp size={11} style={{ color: stat.color }} />
                <span className="text-[10px]" style={{ color: stat.color }}>
                  {stat.trend}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Enquiries + Portfolio */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 bg-[#111111] border border-[#1e1e1e] rounded-2xl"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e1e1e]">
            <div className="flex items-center gap-2">
              <MessageSquare size={15} className="text-[#C9A227]" />
              <span className="text-white font-medium text-sm">Recent Enquiries</span>
              {newEnquiries > 0 && (
                <span className="px-1.5 py-0.5 bg-[#C9A227]/20 text-[#C9A227] text-[10px] rounded-md font-medium">
                  {newEnquiries} new
                </span>
              )}
            </div>
            <Link
              to="/admin/enquiries"
              className="text-[#555] hover:text-[#C9A227] text-xs flex items-center gap-1 transition-colors"
            >
              View all <ArrowUpRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-[#1a1a1a]">
            {loadingEnquiries ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="px-5 py-4 animate-pulse">
                  <div className="h-3 bg-[#1a1a1a] rounded w-1/3 mb-2" />
                  <div className="h-2 bg-[#1a1a1a] rounded w-2/3" />
                </div>
              ))
            ) : recentEnquiries.length === 0 ? (
              <div className="px-5 py-10 text-center text-[#333] text-sm">
                No enquiries yet
              </div>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="px-5 py-4 hover:bg-[#0d0d0d] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-sm font-medium truncate">
                          {enq.name}
                        </span>
                        {enq.status === "new" && (
                          <span className="px-1.5 py-0.5 bg-[#C9A227]/15 text-[#C9A227] text-[9px] uppercase tracking-wider rounded font-medium shrink-0">
                            New
                          </span>
                        )}
                        {enq.status === "resolved" && (
                          <span className="px-1.5 py-0.5 bg-green-500/15 text-green-400 text-[9px] uppercase tracking-wider rounded font-medium shrink-0">
                            Resolved
                          </span>
                        )}
                      </div>
                      <p className="text-[#444] text-xs truncate">{enq.message}</p>
                      <p className="text-[#333] text-[11px] mt-1">{enq.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#333] shrink-0">
                      <Clock size={10} />
                      <span className="text-[10px]">{formatDate(enq.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions + Recent Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-5"
        >
          {/* Quick Actions */}
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5">
            <h3 className="text-white font-medium text-sm mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Add Portfolio Item", href: "/admin/portfolio", icon: Images },
                { label: "Manage Gallery", href: "/admin/gallery", icon: Image },
                { label: "View Enquiries", href: "/admin/enquiries", icon: MessageSquare },
                { label: "Site Settings", href: "/admin/settings", icon: null },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#C9A227]/30 hover:bg-[#C9A227]/5 transition-all duration-200 group"
                >
                  {action.icon && (
                    <action.icon size={14} className="text-[#444] group-hover:text-[#C9A227] transition-colors" />
                  )}
                  <span className="text-[#666] group-hover:text-white text-xs font-medium transition-colors">
                    {action.label}
                  </span>
                  <ArrowUpRight size={11} className="ml-auto text-[#333] group-hover:text-[#C9A227] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Portfolio */}
          {recentPortfolio.length > 0 && (
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm">Recent Uploads</h3>
                <Link
                  to="/admin/portfolio"
                  className="text-[#555] hover:text-[#C9A227] text-xs transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {recentPortfolio.map((item) => (
                  <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
