import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, memo } from "react";
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

const StatCard = memo(({ label, value, icon: Icon, tone }: { label: string; value: number; icon: React.ElementType; tone: string }) => {
  return (
    <div className="admin-glass admin-glass-hover p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className={`flex size-11 items-center justify-center rounded-2xl ${tone === "gold" ? "admin-gold-icon" : "admin-gradient-icon"}`} aria-hidden="true"><Icon size={18} /></div>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Live</span>
      </div>
      <p className="text-3xl font-black tracking-[-0.04em] text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">{label}</p>
    </div>
  );
});
StatCard.displayName = "StatCard";

const GalleryItemCard = memo(({
  item,
  isSelected,
  onToggleSelect,
  onCopyUrl,
  copiedId,
  onDeleteTarget,
  onPreview,
}: {
  item: PortfolioItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onCopyUrl: (item: PortfolioItem) => void;
  copiedId: string | null;
  onDeleteTarget: (item: PortfolioItem) => void;
  onPreview: (item: PortfolioItem) => void;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.28 }}
      className="admin-glass admin-glass-hover group relative mb-5 break-inside-avoid cursor-pointer overflow-hidden p-2"
      onClick={() => onPreview(item)}
      aria-label={`Gallery design: ${item.caption || "No caption"}`}
    >
      <div className="relative overflow-hidden rounded-[22px] bg-slate-100">
        <img
          src={item.url}
          alt={item.caption || `${item.tag} design details`}
          className="w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSelect(item.id); }}
          aria-pressed={isSelected}
          aria-label={isSelected ? `Deselect image ${item.caption || "No caption"}` : `Select image ${item.caption || "No caption"}`}
          className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-500 shadow-lg backdrop-blur-xl transition hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
        >
          {isSelected ? <Check size={15} aria-hidden="true" /> : <div className="size-3 rounded-full border border-slate-350" />}
        </button>
        <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-[18px] border border-white/30 bg-white/80 p-3 shadow-lg backdrop-blur-xl">
            <p className="truncate text-sm font-bold text-slate-950">{item.caption || "No caption"}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9a44c]">{item.tag}</p>
          </div>
        </div>
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onCopyUrl(item); }}
            aria-label={`Copy image URL for ${item.caption || "No caption"}`}
            className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            title="Copy URL"
          >
            {copiedId === item.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="View original image size in new window"
            className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-violet-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            title="Open Original"
          >
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); onDeleteTarget(item); }}
            aria-label={`Delete ${item.caption || "No caption"}`}
            className="flex size-8 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            title="Delete"
          >
            <Trash2 size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
});
GalleryItemCard.displayName = "GalleryItemCard";

export default function GalleryAdmin() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Memoized filtered search list
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter(
      (item) =>
        !q ||
        item.caption.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q)
    );
  }, [items, search]);

  const copyUrl = useCallback((item: PortfolioItem) => {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopiedId(item.id);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected((prev) => {
      if (prev.size === filteredItems.length) return new Set();
      return new Set(filteredItems.map((i) => i.id));
    });
  }, [filteredItems]);

  const stats = useMemo(() => {
    return [
      { label: "Total Images", value: items.length, icon: ImageIcon, tone: "gold" },
      { label: "Zardozi", value: items.filter((i) => i.categorySlug === "zardozi").length, icon: Sparkles, tone: "blue" },
      { label: "Crystal & Stone", value: items.filter((i) => i.categorySlug === "crystal-stone-work").length, icon: Grid3X3, tone: "violet" },
      { label: "Selected", value: selected.size, icon: Check, tone: "green" },
    ];
  }, [items, selected.size]);

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-page-title">Media Gallery</h2>
          <p className="admin-page-subtitle">{items.length} images mirrored from website sections and portfolio uploads.</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={selectAll}
              aria-label="Deselect all selected images"
              className="admin-secondary-btn px-4 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            >
              Deselect ({selected.size})
            </button>
          )}
          <a
            href="/admin/portfolio"
            aria-label="Upload new image to gallery"
            title="Upload new image to gallery"
            className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <Upload size={15} aria-hidden="true" />
            <span>Upload New</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4" role="group" aria-label="Gallery Statistics Overview">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} tone={stat.tone} />
        ))}
      </div>

      <div className="admin-glass p-4">
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="gallery-search-field" className="sr-only">Search gallery images</label>
          <input
            id="gallery-search-field"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images by caption or tag..."
            className="admin-input w-full py-3 pl-11 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            aria-label="Search gallery images"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4" aria-busy="true" aria-label="Loading gallery images">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="admin-glass mb-5 h-72 break-inside-avoid animate-pulse" />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-glass flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-white/70 text-slate-300" aria-hidden="true"><Grid3X3 size={28} /></div>
          <p className="text-sm font-bold text-slate-650">No images found</p>
          <p className="mt-1 text-xs text-slate-500">Upload images from the Portfolio section</p>
        </div>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
          {filteredItems.map((item) => (
            <GalleryItemCard
              key={item.id}
              item={item}
              isSelected={selected.has(item.id)}
              onToggleSelect={toggleSelect}
              onCopyUrl={copyUrl}
              copiedId={copiedId}
              onDeleteTarget={setDeleteTarget}
              onPreview={setPreview}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {preview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" onClick={() => setPreview(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="admin-glass w-full max-w-4xl p-4"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-dialog-title"
              aria-describedby="preview-dialog-desc"
            >
              <img src={preview.url} alt={preview.caption || `${preview.tag} design`} className="max-h-[75vh] w-full rounded-[24px] object-contain" />
              <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p id="preview-dialog-title" className="font-bold text-slate-950">{preview.caption || "No caption"}</p>
                  <p id="preview-dialog-desc" className="mt-1 text-sm font-medium text-slate-500">{preview.tag} - {new Date(preview.uploadedAt).toLocaleDateString("en-IN")}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyUrl(preview)}
                    aria-label="Copy image URL to clipboard"
                    className="admin-primary-btn flex items-center gap-2 px-4 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  >
                    {copiedId === preview.id ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    <span>Copy URL</span>
                  </button>
                  <button
                    onClick={() => setPreview(null)}
                    aria-label="Close image preview dialog"
                    className="admin-secondary-btn px-4 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="admin-glass w-full max-w-sm p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="del-target-title"
              aria-describedby="del-target-desc"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-500" aria-hidden="true"><AlertTriangle size={19} /></div>
              <h3 id="del-target-title" className="text-lg font-bold text-slate-950">Delete Image?</h3>
              <p id="del-target-desc" className="mt-2 text-sm leading-6 text-slate-600">Gallery mirrors Portfolio. Delete this image from Portfolio to also remove it from Gallery.</p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="admin-secondary-btn flex-1 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                >
                  Cancel
                </button>
                <a
                  href="/admin/portfolio"
                  className="admin-primary-btn flex-1 py-3 text-center text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                  aria-label="Go to Portfolio settings to delete image"
                >
                  Go to Portfolio
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
