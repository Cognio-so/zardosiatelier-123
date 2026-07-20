import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Save, Loader2, Globe, Eye, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { getSeoEntries, updateSeoEntry, type SeoEntry } from "@/lib/admin-data";
import { loadSession, getStoredPassword } from "@/lib/admin-auth";

const PAGES = ["Home", "Portfolio", "About", "Contact", "Process", "Services"];

function scoreLen(count: number, min: number, max: number) {
  if (count >= min && count <= max) return 100;
  if (count < min) return Math.round((count / min) * 70);
  return Math.max(40, 100 - (count - max) * 3);
}
function statusColor(count: number, min: number, max: number) {
  if (count >= min && count <= max) return "#10b981";
  if (count < min) return "#f59e0b";
  return "#ef4444";
}

const TabButton = memo(({
  page,
  isActive,
  hasEntry,
  onClick,
}: {
  page: string;
  isActive: boolean;
  hasEntry: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      role="tab"
      id={`tab-${page}`}
      aria-selected={isActive}
      aria-controls={`seo-tabpanel-${page}`}
      onClick={onClick}
      aria-label={`Configure SEO settings for ${page} page`}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${isActive ? "admin-pill-active" : "admin-pill hover:bg-white/90"}`}
    >
      <Globe size={14} aria-hidden="true" />
      <span>{page}</span>
      {hasEntry && <span className={`size-1.5 rounded-full ${isActive ? "bg-white" : "bg-emerald-400"}`} aria-label="Saved configuration marker" />}
    </button>
  );
});
TabButton.displayName = "TabButton";

const MiniMetric = memo(({ label, value, ok }: { label: string; value: number; ok: boolean }) => {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-bold text-slate-600">
        <span>{label}</span>
        <span className={ok ? "text-emerald-700" : "text-amber-700"}>{ok ? "Good" : "Needs work"}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
});
MiniMetric.displayName = "MiniMetric";

export default function SeoAdmin() {
  const qc = useQueryClient();
  const password = getStoredPassword();
  const { data: entries = [], isLoading } = useQuery({ queryKey: ["seo"], queryFn: () => getSeoEntries() });
  const [activePage, setActivePage] = useState("Home");
  const [formData, setFormData] = useState<Partial<SeoEntry>>({});
  const [dirty, setDirty] = useState(false);

  const activeEntry = useMemo(() => entries.find((e) => e.page === activePage), [entries, activePage]);

  useEffect(() => {
    if (activeEntry) setFormData({ ...activeEntry });
    else setFormData({ id: activePage.toLowerCase(), page: activePage, metaTitle: `${activePage} - Zardosi Atelier`, metaDescription: "", keywords: "", ogImage: "", robots: "index" });
    setDirty(false);
  }, [activePage, activeEntry]);

  const saveMut = useMutation({
    mutationFn: () => updateSeoEntry({ data: { password, id: formData.id ?? activePage.toLowerCase(), page: activePage, metaTitle: formData.metaTitle ?? "", metaDescription: formData.metaDescription ?? "", keywords: formData.keywords ?? "", ogImage: formData.ogImage ?? "", robots: formData.robots ?? "index" } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["seo"] }); toast.success("SEO settings saved!"); setDirty(false); },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useCallback((key: keyof SeoEntry, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const titleLen = useMemo(() => formData.metaTitle?.length ?? 0, [formData.metaTitle]);
  const descLen = useMemo(() => formData.metaDescription?.length ?? 0, [formData.metaDescription]);
  const titleScore = useMemo(() => scoreLen(titleLen, 40, 60), [titleLen]);
  const descScore = useMemo(() => scoreLen(descLen, 120, 160), [descLen]);
  const score = useMemo(() => Math.round((titleScore + descScore) / 2), [titleScore, descScore]);
  const circumference = useMemo(() => 2 * Math.PI * 46, []);

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="admin-page-title">SEO Management</h2><p className="admin-page-subtitle">Configure meta tags and search engine settings per page.</p></div>
        <button
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending || !dirty}
          aria-label={`Save SEO settings for ${activePage} page`}
          title={`Save SEO settings for ${activePage} page`}
          className="admin-primary-btn flex w-fit items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
        >
          {saveMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} aria-hidden="true" />}
          <span>Save</span>
        </button>
      </div>

      <div className="admin-glass flex flex-wrap gap-2 p-2" role="tablist" aria-label="SEO Page selector tabs">
        {PAGES.map((page) => (
          <TabButton
            key={page}
            page={page}
            isActive={activePage === page}
            hasEntry={entries.some((e) => e.page === page)}
            onClick={() => setActivePage(page)}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          key={activePage}
          id={`seo-tabpanel-${activePage}`}
          role="tabpanel"
          aria-labelledby={`tab-${activePage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="admin-glass space-y-5 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl" aria-hidden="true">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-950">{activePage} Page SEO</h3>
              <p className="text-sm text-slate-600">Write exactly what search engines should see.</p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading SEO tags data">
              {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-[20px] bg-white/50" />)}
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <FieldProgress label="Meta Title" len={titleLen} min={40} max={60} />
                <label htmlFor="meta-title-input" className="sr-only">Meta Title</label>
                <input
                  id="meta-title-input"
                  value={formData.metaTitle ?? ""}
                  onChange={(e) => update("metaTitle", e.target.value)}
                  placeholder={`${activePage} - Zardosi Atelier`}
                  maxLength={70}
                  className="admin-input mt-2 w-full px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  aria-label="Meta title input"
                />
              </div>

              <div>
                <FieldProgress label="Meta Description" len={descLen} min={120} max={160} />
                <label htmlFor="meta-description-input" className="sr-only">Meta Description</label>
                <textarea
                  id="meta-description-input"
                  value={formData.metaDescription ?? ""}
                  onChange={(e) => update("metaDescription", e.target.value)}
                  placeholder="A compelling description of this page..."
                  rows={4}
                  maxLength={180}
                  className="admin-input mt-2 w-full resize-none px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  aria-label="Meta description input"
                />
              </div>

              <div>
                <label htmlFor="keywords-input" className="admin-label mb-2 block">Keywords</label>
                <input
                  id="keywords-input"
                  value={formData.keywords ?? ""}
                  onChange={(e) => update("keywords", e.target.value)}
                  placeholder="zardosi, hand embroidery, couture..."
                  className="admin-input w-full px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  aria-label="Keywords input"
                />
              </div>

              <div>
                <label htmlFor="og-image-input" className="admin-label mb-2 block">OG Image URL</label>
                <input
                  id="og-image-input"
                  value={formData.ogImage ?? ""}
                  onChange={(e) => update("ogImage", e.target.value)}
                  placeholder="https://... (1200x630px recommended)"
                  className="admin-input w-full px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  aria-label="Open Graph image URL"
                />
              </div>

              <div>
                <span className="admin-label mb-2 block">Search Engine Indexing</span>
                <div className="grid grid-cols-2 gap-2" role="group" aria-label="Index toggle control">
                  {(["index", "noindex"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => update("robots", val)}
                      aria-pressed={formData.robots === val}
                      aria-label={`Set search indexing to ${val === "index" ? "Index page" : "No index page"}`}
                      className={`rounded-[20px] px-4 py-3 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${formData.robots === val ? (val === "index" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-red-50 text-red-650 ring-1 ring-red-200") : "admin-secondary-btn"}`}
                    >
                      {val === "index" ? "Index" : "No Index"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.section>

        <div className="space-y-6">
          <section className="admin-glass p-6" aria-label="Google SERP Preview card">
            <div className="mb-5 flex items-center gap-3">
              <Eye size={17} className="text-blue-600" aria-hidden="true" />
              <h3 className="font-bold text-slate-950">Google Search Preview</h3>
            </div>
            <div className="rounded-[24px] border border-white/80 bg-white/72 p-5 shadow-inner">
              <p className="mb-1 text-xs font-medium text-emerald-700">https://zardosiatelier-123.vercel.app{activePage !== "Home" ? `/${activePage.toLowerCase()}` : ""}</p>
              <p className="cursor-pointer text-xl font-semibold leading-tight text-[#1a0dab] hover:underline">{formData.metaTitle || `${activePage} - Zardosi Atelier`}</p>
              <p className="mt-2 text-sm leading-6 text-slate-655">{formData.metaDescription || "A luxury hand embroidery and couture manufacturing atelier..."}</p>
            </div>
          </section>

          <section className="admin-glass p-6" aria-label="SEO Metric Performance Indicator">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="relative size-36">
                <svg viewBox="0 0 120 120" className="size-36 -rotate-90" aria-label={`Google SEO Score is ${score} out of 100`} role="img">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="12" />
                  <circle cx="60" cy="60" r="46" fill="none" stroke="url(#seoGauge)" strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (score / 100) * circumference} />
                  <defs><linearGradient id="seoGauge" x1="0" x2="1"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center"><div className="text-center"><p className="text-3xl font-black text-slate-950">{score}</p><p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Score</p></div></div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-slate-950"><SearchCheck size={17} className="text-violet-600" aria-hidden="true" /> SEO Score</h3>
                <MiniMetric label="Meta Title" value={titleScore} ok={titleLen >= 40 && titleLen <= 60} />
                <MiniMetric label="Meta Description" value={descScore} ok={descLen >= 120 && descLen <= 160} />
              </div>
            </div>
          </section>

          {formData.ogImage && (
            <section className="admin-glass p-6" aria-label="Social Share Open Graph preview">
              <h3 className="mb-3 font-bold text-slate-950">OG Image Preview</h3>
              <img src={formData.ogImage} alt={`Social sharing open graph card preview image for ${activePage}`} className="aspect-[1200/630] w-full rounded-[24px] object-cover" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldProgress({ label, len, min, max }: { label: string; len: number; min: number; max: number }) {
  const pct = Math.min((len / max) * 100, 100);
  const color = statusColor(len, min, max);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="admin-label">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{len}/{max}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
