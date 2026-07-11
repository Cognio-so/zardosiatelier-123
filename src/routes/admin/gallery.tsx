import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Copy,
  Trash2,
  Check,
  AlertTriangle,
  Grid3X3,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { getPortfolioItems, type PortfolioItem } from "@/lib/portfolio-admin";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter((item) => !search || item.caption.toLowerCase().includes(search.toLowerCase()) || item.tag.toLowerCase().includes(search.toLowerCase()));

  function copyUrl(item: PortfolioItem) {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopiedId(item.id);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    if (selected.size === filteredItems.length) setSelected(new Set());
    else setSelected(new Set(filteredItems.map((i) => i.id)));
  }

  const stats = [
    { label: "Total Images", value: items.length, icon: ImageIcon, tone: "gold" },
    { label: "Zardozi", value: items.filter((i) => i.tag === "Zardozi").length, icon: Sparkles, tone: "blue" },
    { label: "Crystal & Stone", value: items.filter((i) => i.tag === "Crystal & Stone Work").length, icon: Grid3X3, tone: "violet" },
    { label: "Selected", value: selected.size, icon: Check, tone: "green" },
  ];

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-page-title">Media Gallery</h2>
          <p className="admin-page-subtitle">{items.length} images mirrored directly from Vercel Blob portfolio storage.</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && <button onClick={selectAll} className="admin-secondary-btn px-4 py-3 text-sm font-bold">Deselect ({selected.size})</button>}
          <a href="/admin/portfolio" className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold"><Upload size={15} /> Upload New</a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="admin-glass admin-glass-hover p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className={`flex size-11 items-center justify-center rounded-2xl ${stat.tone === "gold" ? "admin-gold-icon" : "admin-gradient-icon"}`}><stat.icon size={18} /></div>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Live</span>
            </div>
            <p className="text-3xl font-black tracking-[-0.04em] text-slate-950">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="admin-glass p-4">
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search images by caption or tag..." className="admin-input w-full py-3 pl-11 pr-4 text-sm" />
        </div>
      </div>

      {isLoading ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="admin-glass mb-5 h-72 break-inside-avoid animate-pulse" />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-glass flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-white/70 text-slate-300"><Grid3X3 size={28} /></div>
          <p className="text-sm font-bold text-slate-600">No images found</p>
          <p className="mt-1 text-xs text-slate-400">Upload images from the Portfolio section</p>
        </div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
          {filteredItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.012, 0.26), duration: 0.28 }} className="admin-glass admin-glass-hover group relative mb-5 break-inside-avoid cursor-pointer overflow-hidden p-2" onClick={() => setPreview(item)}>
              <div className="relative overflow-hidden rounded-[22px] bg-slate-100">
                <img src={item.url} alt={item.caption} className="w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <button onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }} className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-500 shadow-lg backdrop-blur-xl transition hover:text-blue-600">
                  {selected.has(item.id) && <Check size={15} />}
                </button>
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-[18px] border border-white/30 bg-white/80 p-3 shadow-lg backdrop-blur-xl">
                    <p className="truncate text-sm font-bold text-slate-950">{item.caption || "No caption"}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9a44c]">{item.tag}</p>
                  </div>
                </div>
                <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button onClick={(e) => { e.stopPropagation(); copyUrl(item); }} className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-blue-600" title="Copy URL">{copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}</button>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-violet-600" title="Open Original"><ExternalLink size={14} /></a>
                  <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }} className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-red-500" title="Delete"><Trash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={() => setPreview(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="admin-glass w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
              <img src={preview.url} alt={preview.caption} className="max-h-[75vh] w-full rounded-[24px] object-contain" />
              <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="font-bold text-slate-950">{preview.caption || "No caption"}</p><p className="mt-1 text-sm font-medium text-slate-400">{preview.tag} - {new Date(preview.uploadedAt).toLocaleDateString("en-IN")}</p></div>
                <div className="flex gap-2"><button onClick={() => copyUrl(preview)} className="admin-primary-btn flex items-center gap-2 px-4 py-3 text-sm font-bold">{copiedId === preview.id ? <Check size={14} /> : <Copy size={14} />} Copy URL</button><button onClick={() => setPreview(null)} className="admin-secondary-btn px-4 py-3 text-sm font-bold">Close</button></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="admin-glass w-full max-w-sm p-6">
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-500"><AlertTriangle size={19} /></div>
              <h3 className="text-lg font-bold text-slate-950">Delete Image?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">Gallery mirrors Portfolio. Delete this image from Portfolio to also remove it from Gallery.</p>
              <div className="mt-6 flex gap-3"><button onClick={() => setDeleteTarget(null)} className="admin-secondary-btn flex-1 py-3 text-sm font-bold">Cancel</button><a href="/admin/portfolio" className="admin-primary-btn flex-1 py-3 text-center text-sm font-bold">Go to Portfolio</a></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}