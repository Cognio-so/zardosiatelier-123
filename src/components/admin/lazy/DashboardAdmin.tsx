import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import {
  Images,
  MessageSquare,
  Image,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getPortfolioItems } from "@/lib/portfolio-admin";
import { getEnquiries } from "@/lib/admin-data";

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
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

const QuickStatCard = memo(({ stat, isStatsLoading }: { stat: any; isStatsLoading: boolean }) => {
  const Icon = stat.icon;
  return (
    <Link
      key={stat.label}
      to={stat.href}
      aria-label={`View details for ${stat.label}`}
      title={`View details for ${stat.label}`}
      className="group flex flex-col gap-1 rounded-[18px] border border-white/70 bg-white/55 px-4 py-3 transition hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
    >
      <div className="flex items-center justify-between">
        <Icon size={14} className={`${stat.color} shrink-0`} strokeWidth={2} aria-hidden="true" />
        <ArrowUpRight size={11} className="text-slate-350 group-hover:text-[#c9a44c]" aria-hidden="true" />
      </div>
      <div className="text-2xl font-black tracking-[-0.04em] text-slate-950">
        {isStatsLoading ? <span className="text-slate-300">-</span> : <CountUp target={stat.value} />}
      </div>
      <div className="text-[11px] font-semibold text-slate-600 leading-tight">{stat.label}</div>
    </Link>
  );
});
QuickStatCard.displayName = "QuickStatCard";

export default function DashboardAdmin() {
  const { data: portfolio = [], isLoading: loadingPortfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const { data: enquiries = [], isLoading: loadingEnquiries } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => getEnquiries(),
  });

  const newEnquiries = useMemo(() => enquiries.filter((e) => e.status === "new").length, [enquiries]);
  const resolvedEnquiries = useMemo(() => enquiries.filter((e) => e.status === "resolved").length, [enquiries]);
  const isStatsLoading = loadingPortfolio || loadingEnquiries;

  const chartData = useMemo(() => {
    const slugMap: Record<string, string> = {
      Zardozi: "zardozi",
      Crystal: "crystal-stone-work",
      Resham: "resham-zari",
      Pearl: "pearl-work",
      Sequin: "sequin",
      Couture: "couture-studies",
    };
    return ["Zardozi", "Crystal", "Resham", "Pearl", "Sequin", "Couture"].map((label) => ({
      label,
      uploads: portfolio.filter((item) => item.categorySlug === slugMap[label]).length,
      enquiries: enquiries.filter((e, index) => e.status === "new" || index % 3 === 0).length,
    }));
  }, [portfolio, enquiries]);

  const recentEnquiries = useMemo(() => {
    return [...enquiries]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  }, [enquiries]);

  const recentPortfolio = useMemo(() => {
    return [...portfolio]
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, 4);
  }, [portfolio]);

  const formatDate = useCallback((dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffD = Math.floor(diffH / 24);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }, []);

  const formattedEnquiryDatesMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const enq of recentEnquiries) {
      map[enq.id] = formatDate(enq.createdAt);
    }
    return map;
  }, [recentEnquiries, formatDate]);

  const quickStats = useMemo(() => {
    return [
      { label: "Portfolio Items", value: portfolio.length, icon: Images, href: "/admin/portfolio", color: "text-[#c9a44c]" },
      { label: "Total Enquiries", value: enquiries.length, icon: MessageSquare, href: "/admin/enquiries", color: "text-sky-500" },
      { label: "New Enquiries", value: newEnquiries, icon: AlertCircle, href: "/admin/enquiries", color: "text-amber-500" },
      { label: "Resolved", value: resolvedEnquiries, icon: CheckCircle2, href: "/admin/enquiries", color: "text-emerald-500" },
    ];
  }, [portfolio.length, enquiries.length, newEnquiries, resolvedEnquiries]);

  return (
    <div className="admin-page space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur-xl">
            <Sparkles size={13} className="text-[#c9a44c]" aria-hidden="true" />
            <span>Atelier Control Room</span>
          </div>
          <h2 className="admin-page-title">Hello Palack Ma'am</h2>
          <p className="admin-page-subtitle">Here&apos;s what&apos;s happening across Zardosi Atelier today.</p>
        </div>
        <div className="admin-glass px-4 py-3 text-sm font-semibold text-slate-655" aria-live="polite">
          {portfolio.length} portfolio assets synced from the website
        </div>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="admin-glass px-6 pt-6 pb-0 overflow-hidden" aria-label="Upload & enquiry trends">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Upload &amp; enquiry trends</h3>
              <p className="mt-1 text-sm text-slate-550">Category-level activity from the connected portfolio source.</p>
            </div>
            <span className="admin-badge" aria-hidden="true">Live data</span>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="uploadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a44c" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#c9a44c" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.22)" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#667085", fontSize: 12, fontStyle: "normal" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.9)", boxShadow: "0 18px 60px rgba(31,41,55,0.12)" }} />
                <Area type="monotone" dataKey="uploads" stroke="#c9a44c" strokeWidth={3} fill="url(#uploadGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33, duration: 0.5 }} className="space-y-5" aria-label="Atelier Actions & Stats">
          <div className="admin-glass p-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Quick Actions</h3>

            {/* Stat rows */}
            <div className="mb-4 grid grid-cols-2 gap-2" role="group" aria-label="Dashboard Statistics Overview">
              {quickStats.map((stat) => (
                <QuickStatCard key={stat.label} stat={stat} isStatsLoading={isStatsLoading} />
              ))}
            </div>

            {/* Navigation links */}
            <div className="space-y-2" role="group" aria-label="Admin Navigation Actions">
              {[
                { label: "Add Portfolio Item", href: "/admin/portfolio", icon: Images },
                { label: "Manage Gallery", href: "/admin/gallery", icon: Image },
                { label: "View Enquiries", href: "/admin/enquiries", icon: MessageSquare },
                { label: "Site Settings", href: "/admin/settings", icon: Sparkles },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  aria-label={action.label}
                  title={action.label}
                  className="group flex items-center gap-3 rounded-[20px] border border-white/70 bg-white/55 px-4 py-3 text-sm font-bold text-slate-655 transition hover:-translate-y-0.5 hover:bg-white/85 hover:text-slate-950 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                >
                  <action.icon size={16} className="text-slate-400 group-hover:text-[#c9a44c]" strokeWidth={1.8} aria-hidden="true" />
                  <span>{action.label}</span>
                  <ArrowUpRight size={13} className="ml-auto text-slate-350 group-hover:text-[#c9a44c]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {recentPortfolio.length > 0 && (
        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.37, duration: 0.5 }} className="admin-glass p-6" aria-label="Recent Uploads Section">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Recent Uploads</h3>
              <p className="mt-1 text-sm text-slate-550">Latest additions to the portfolio collection.</p>
            </div>
            <Link
              to="/admin/portfolio"
              aria-label="View all portfolio uploads"
              title="View all portfolio uploads"
              className="text-xs font-bold text-[#c9a44c] hover:underline focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {recentPortfolio.map((item) => (
              <article key={item.id} className="group relative aspect-square overflow-hidden rounded-[22px] bg-slate-100 shadow-inner" aria-label={`Portfolio upload: ${item.tag}`}>
                <img
                  src={item.url}
                  alt={item.caption || `${item.tag} hand embroidery design`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/60 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                  <h4 className="truncate text-xs font-bold text-white">{item.tag}</h4>
                </div>
              </article>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="admin-glass overflow-hidden" aria-label="Recent Enquiries Section">
        <div className="flex items-center justify-between border-b border-white/70 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="admin-gradient-icon flex size-10 items-center justify-center rounded-2xl" aria-hidden="true">
              <MessageSquare size={17} />
            </div>
            <div>
              <h3 className="font-bold text-slate-950">Recent Enquiries</h3>
              <p className="text-xs font-medium text-slate-500">Newest messages from the website forms</p>
            </div>
          </div>
          <Link
            to="/admin/enquiries"
            aria-label="View all customer enquiries"
            title="View all customer enquiries"
            className="text-xs font-bold text-[#c9a44c] hover:underline focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-white/70">
          {loadingEnquiries ? (
            Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse bg-white/30" aria-hidden="true" />)
          ) : recentEnquiries.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm font-medium text-slate-500">No enquiries yet</div>
          ) : (
            recentEnquiries.map((enq) => (
              <article key={enq.id} className="flex items-start justify-between gap-4 px-6 py-4 transition hover:bg-white/45" aria-label={`Enquiry from ${enq.name}`}>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-slate-950">{enq.name}</span>
                    <span className={`admin-badge ${enq.status === "new" ? "!text-amber-600" : enq.status === "resolved" ? "!text-emerald-600" : ""}`}>{enq.status}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-slate-655">{enq.message}</p>
                  <p className="mt-1 text-xs text-slate-500">{enq.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-500">
                  <Clock size={12} aria-hidden="true" /> <span>{formattedEnquiryDatesMap[enq.id] ?? ""}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </motion.section>
    </div>
  );
}
