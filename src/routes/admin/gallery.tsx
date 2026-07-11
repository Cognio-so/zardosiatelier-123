import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Copy,
  Trash2,
  Loader2,
  Check,
  AlertTriangle,
  Grid3X3,
  ExternalLink,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { list, del } from "@vercel/blob";

// We'll use the portfolio items as the "gallery" since they share Vercel Blob
import { getPortfolioItems, type PortfolioItem } from "@/lib/portfolio-admin";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

function GalleryAdmin() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = items.filter(
    (item) =>
      !search ||
      item.caption.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase())
  );

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
    if (selected.size === filteredItems.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredItems.map((i) => i.id)));
    }
  }

  function formatSize(bytes?: number) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Media Gallery
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            {items.length} image{items.length !== 1 ? "s" : ""} in Vercel Blob
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button
              onClick={selectAll}
              className="px-3 py-2 rounded-xl border border-[#2a2a2a] text-[#666] text-sm hover:border-[#333] transition-colors"
            >
              Deselect ({selected.size})
            </button>
          )}
          <a
            href="/admin/portfolio"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] transition-colors shadow-[0_4px_16px_rgba(201,162,39,0.3)]"
          >
            <Upload size={14} />
            Upload New
          </a>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Images", value: items.length },
          { label: "Zardozi", value: items.filter((i) => i.tag === "Zardozi").length },
          { label: "Crystal Stone", value: items.filter((i) => i.tag === "Crystal Stone").length },
          { label: "Selected", value: selected.size },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-3"
          >
            <p className="text-white font-bold text-2xl">{stat.value}</p>
            <p className="text-[#444] text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search images..."
          className="w-full bg-[#111] border border-[#222] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
        />
      </div>

      {/* Masonry Grid */}
      {isLoading ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid rounded-xl bg-[#1a1a1a] animate-pulse"
              style={{ height: `${150 + (i % 3) * 80}px` }}
            />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Grid3X3 size={28} className="text-[#333]" />
          </div>
          <p className="text-[#444] text-sm font-medium mb-1">No images found</p>
          <p className="text-[#333] text-xs">Upload images from the Portfolio section</p>
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="break-inside-avoid mb-3 relative group rounded-xl overflow-hidden bg-[#1a1a1a] cursor-pointer"
              onClick={() => setPreview(item)}
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

              {/* Select checkbox */}
              <div
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
              >
                <div
                  className="w-5 h-5 rounded border border-white/50 flex items-center justify-center"
                  style={{ background: selected.has(item.id) ? "#C9A227" : "rgba(0,0,0,0.5)" }}
                >
                  {selected.has(item.id) && <Check size={10} className="text-black" />}
                </div>
              </div>

              {/* Actions */}
              <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); copyUrl(item); }}
                  className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C9A227] hover:text-black transition-all"
                  title="Copy URL"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-500 transition-all"
                  title="Open Original"
                >
                  <ExternalLink size={12} />
                </a>
                <button
                  onClick={(e) => { e.stopPropagation(); setDeleteTarget(item); }}
                  className="w-7 h-7 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-all"
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Tag badge */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[#C9A227] text-[9px] font-medium uppercase tracking-wide">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={preview.url}
                alt={preview.caption}
                className="w-full max-h-[75vh] object-contain rounded-2xl"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{preview.caption || "No caption"}</p>
                  <p className="text-[#555] text-sm mt-0.5">
                    {preview.tag} · {new Date(preview.uploadedAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyUrl(preview)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-medium hover:bg-[#B8911E] transition-colors"
                  >
                    {copiedId === preview.id ? <Check size={13} /> : <Copy size={13} />}
                    Copy URL
                  </button>
                  <button
                    onClick={() => setPreview(null)}
                    className="px-3 py-2 rounded-xl border border-[#333] text-[#666] text-sm hover:border-[#444] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 w-80"
            >
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">Delete Image?</h3>
              <p className="text-[#555] text-sm mb-5">
                This image will be permanently removed from Vercel Blob storage.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm hover:border-[#444] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Navigate to portfolio to delete — gallery items come from portfolio
                    toast.info("Delete from Portfolio page to also remove from gallery");
                    setDeleteTarget(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-colors"
                >
                  Go to Portfolio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
