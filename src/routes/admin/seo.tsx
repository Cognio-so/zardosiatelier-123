import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Eye, SearchCheck } from "lucide-react";
import { toast } from "sonner";
import { getSeoEntries, updateSeoEntry, type SeoEntry } from "@/lib/admin-data";
import { loadSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/seo")({ component: SeoAdmin });

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

function SeoAdmin() {
  const qc = useQueryClient();
  const session = loadSession();
  const password = session ? atob(session.token).split("|")[0] : "";
  const { data: entries = [], isLoading } = useQuery({ queryKey: ["seo"], queryFn: () => getSeoEntries() });
  const [activePage, setActivePage] = useState("Home");
  const [formData, setFormData] = useState<Partial<SeoEntry>>({});
  const [dirty, setDirty] = useState(false);
  const activeEntry = entries.find((e) => e.page === activePage);

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

  function update(key: keyof SeoEntry, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  const titleLen = formData.metaTitle?.length ?? 0;
  const descLen = formData.metaDescription?.length ?? 0;
  const titleScore = scoreLen(titleLen, 40, 60);
  const descScore = scoreLen(descLen, 120, 160);
  const score = Math.round((titleScore + descScore) / 2);
  const circumference = 2 * Math.PI * 46;

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="admin-page-title">SEO Management</h2><p className="admin-page-subtitle">Configure meta tags and search engine settings per page.</p></div>
        <button onClick={() => saveMut.mutate()} disabled={saveMut.isPending || !dirty} className="admin-primary-btn flex w-fit items-center gap-2 px-5 py-3 text-sm font-bold">{saveMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save</button>
      </div>

      <div className="admin-glass flex flex-wrap gap-2 p-2">
        {PAGES.map((page) => {
          const active = activePage === page;
          const hasEntry = entries.some((e) => e.page === page);
          return <button key={page} onClick={() => setActivePage(page)} className={`flex items-center gap-2 px-4 py-3 text-sm font-bold transition ${active ? "admin-pill-active" : "admin-pill hover:bg-white/90"}`}><Globe size={14} />{page}{hasEntry && <span className={`size-1.5 rounded-full ${active ? "bg-white" : "bg-emerald-400"}`} />}</button>;
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <motion.div key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="admin-glass space-y-5 p-6">
          <div className="flex items-center gap-3"><div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl"><Globe size={18} /></div><div><h3 className="text-lg font-bold text-slate-950">{activePage} Page SEO</h3><p className="text-sm text-slate-500">Write exactly what search engines should see.</p></div></div>
          {isLoading ? <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-[20px] bg-white/50" />)}</div> : <>
            <FieldProgress label="Meta Title" len={titleLen} min={40} max={60} />
            <input value={formData.metaTitle ?? ""} onChange={(e) => update("metaTitle", e.target.value)} placeholder={`${activePage} - Zardosi Atelier`} maxLength={70} className="admin-input w-full px-4 py-3 text-sm" />
            <FieldProgress label="Meta Description" len={descLen} min={120} max={160} />
            <textarea value={formData.metaDescription ?? ""} onChange={(e) => update("metaDescription", e.target.value)} placeholder="A compelling description of this page..." rows={4} maxLength={180} className="admin-input w-full resize-none px-4 py-3 text-sm" />
            <label className="block"><span className="admin-label mb-2 block">Keywords</span><input value={formData.keywords ?? ""} onChange={(e) => update("keywords", e.target.value)} placeholder="zardosi, hand embroidery, couture..." className="admin-input w-full px-4 py-3 text-sm" /></label>
            <label className="block"><span className="admin-label mb-2 block">OG Image URL</span><input value={formData.ogImage ?? ""} onChange={(e) => update("ogImage", e.target.value)} placeholder="https://... (1200x630px recommended)" className="admin-input w-full px-4 py-3 text-sm" /></label>
            <div><span className="admin-label mb-2 block">Search Engine Indexing</span><div className="grid grid-cols-2 gap-2">{(["index", "noindex"] as const).map((val) => <button key={val} type="button" onClick={() => update("robots", val)} className={`rounded-[20px] px-4 py-3 text-sm font-bold transition ${formData.robots === val ? (val === "index" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" : "bg-red-50 text-red-600 ring-1 ring-red-200") : "admin-secondary-btn"}`}>{val === "index" ? "Index" : "No Index"}</button>)}</div></div>
          </>}
        </motion.div>

        <div className="space-y-6">
          <div className="admin-glass p-6">
            <div className="mb-5 flex items-center gap-3"><Eye size={17} className="text-blue-600" /><h3 className="font-bold text-slate-950">Google Search Preview</h3></div>
            <div className="rounded-[24px] border border-white/80 bg-white/72 p-5 shadow-inner">
              <p className="mb-1 text-xs font-medium text-emerald-700">https://zardosiatelier-123.vercel.app{activePage !== "Home" ? `/${activePage.toLowerCase()}` : ""}</p>
              <p className="cursor-pointer text-xl font-semibold leading-tight text-[#1a0dab] hover:underline">{formData.metaTitle || `${activePage} - Zardosi Atelier`}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{formData.metaDescription || "A luxury hand embroidery and couture manufacturing atelier..."}</p>
            </div>
          </div>

          <div className="admin-glass p-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="relative size-36">
                <svg viewBox="0 0 120 120" className="size-36 -rotate-90">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="12" />
                  <circle cx="60" cy="60" r="46" fill="none" stroke="url(#seoGauge)" strokeWidth="12" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (score / 100) * circumference} />
                  <defs><linearGradient id="seoGauge" x1="0" x2="1"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center"><div className="text-center"><p className="text-3xl font-black text-slate-950">{score}</p><p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Score</p></div></div>
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-slate-950"><SearchCheck size={17} className="text-violet-600" /> SEO Score</h3>
                <MiniMetric label="Meta Title" value={titleScore} ok={titleLen >= 40 && titleLen <= 60} />
                <MiniMetric label="Meta Description" value={descScore} ok={descLen >= 120 && descLen <= 160} />
              </div>
            </div>
          </div>

          {formData.ogImage && <div className="admin-glass p-6"><h3 className="mb-3 font-bold text-slate-950">OG Image Preview</h3><img src={formData.ogImage} alt="OG Preview" className="aspect-[1200/630] w-full rounded-[24px] object-cover" /></div>}
        </div>
      </div>
    </div>
  );
}

function FieldProgress({ label, len, min, max }: { label: string; len: number; min: number; max: number }) {
  const pct = Math.min((len / max) * 100, 100);
  const color = statusColor(len, min, max);
  return <div><div className="mb-2 flex items-center justify-between"><span className="admin-label">{label}</span><span className="text-xs font-bold" style={{ color }}>{len}/{max}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200/70"><div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} /></div></div>;
}
function MiniMetric({ label, value, ok }: { label: string; value: number; ok: boolean }) {
  return <div><div className="mb-1 flex justify-between text-xs font-bold text-slate-500"><span>{label}</span><span className={ok ? "text-emerald-600" : "text-amber-600"}>{ok ? "Good" : "Needs work"}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-200/70"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width: `${value}%` }} /></div></div>;
}