import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Eye } from "lucide-react";
import { toast } from "sonner";
import { getSeoEntries, updateSeoEntry, type SeoEntry } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/seo")({
  component: SeoAdmin,
});

const PASS = "zardosi@admin2024";

const PAGES = ["Home", "Portfolio", "About", "Contact", "Process", "Services"];

function charCountColor(count: number, min: number, max: number) {
  if (count < min) return "#f87171";
  if (count > max) return "#f87171";
  return "#4ade80";
}

function SeoAdmin() {
  const qc = useQueryClient();
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["seo"],
    queryFn: () => getSeoEntries(),
  });

  const [activePage, setActivePage] = useState("Home");
  const [formData, setFormData] = useState<Partial<SeoEntry>>({});
  const [dirty, setDirty] = useState(false);

  const activeEntry = entries.find((e) => e.page === activePage);

  useEffect(() => {
    if (activeEntry) {
      setFormData({ ...activeEntry });
    } else {
      setFormData({
        id: activePage.toLowerCase(),
        page: activePage,
        metaTitle: `${activePage} — Zardosi Atelier`,
        metaDescription: "",
        keywords: "",
        ogImage: "",
        robots: "index",
      });
    }
    setDirty(false);
  }, [activePage, activeEntry]);

  const saveMut = useMutation({
    mutationFn: () =>
      updateSeoEntry({
        data: {
          password: PASS,
          id: formData.id ?? activePage.toLowerCase(),
          page: activePage,
          metaTitle: formData.metaTitle ?? "",
          metaDescription: formData.metaDescription ?? "",
          keywords: formData.keywords ?? "",
          ogImage: formData.ogImage ?? "",
          robots: formData.robots ?? "index",
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seo"] });
      toast.success("SEO settings saved!");
      setDirty(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function update(key: keyof SeoEntry, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  const titleLen = formData.metaTitle?.length ?? 0;
  const descLen = formData.metaDescription?.length ?? 0;

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            SEO Management
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            Configure meta tags and search engine settings per page
          </p>
        </div>
        <button
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending || !dirty}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(201,162,39,0.3)]"
        >
          {saveMut.isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          Save
        </button>
      </div>

      {/* Page Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {PAGES.map((page) => {
          const hasEntry = entries.some((e) => e.page === page);
          return (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
              style={{
                background: activePage === page ? "rgba(201,162,39,0.15)" : "#111",
                color: activePage === page ? "#C9A227" : "#555",
                border: activePage === page ? "1px solid rgba(201,162,39,0.3)" : "1px solid #1e1e1e",
              }}
            >
              <Globe size={12} />
              {page}
              {hasEntry && (
                <span className="w-1 h-1 rounded-full bg-green-400/60" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6 space-y-5"
        >
          <h3 className="text-white font-semibold text-base flex items-center gap-2">
            <Globe size={16} className="text-[#C9A227]" />
            {activePage} Page SEO
          </h3>

          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                  <div className="h-2 bg-[#1a1a1a] rounded w-24 mb-2" />
                  <div className="h-10 bg-[#1a1a1a] rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#666] text-xs uppercase tracking-wider">
                    Meta Title
                  </label>
                  <span
                    className="text-xs font-mono"
                    style={{ color: charCountColor(titleLen, 40, 60) }}
                  >
                    {titleLen}/60
                  </span>
                </div>
                <input
                  value={formData.metaTitle ?? ""}
                  onChange={(e) => update("metaTitle", e.target.value)}
                  placeholder={`${activePage} — Zardosi Atelier`}
                  maxLength={70}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                />
                <p className="text-[#333] text-xs mt-1">Optimal: 40–60 characters</p>
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#666] text-xs uppercase tracking-wider">
                    Meta Description
                  </label>
                  <span
                    className="text-xs font-mono"
                    style={{ color: charCountColor(descLen, 120, 160) }}
                  >
                    {descLen}/160
                  </span>
                </div>
                <textarea
                  value={formData.metaDescription ?? ""}
                  onChange={(e) => update("metaDescription", e.target.value)}
                  placeholder="A compelling description of this page..."
                  rows={3}
                  maxLength={180}
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors resize-none"
                />
                <p className="text-[#333] text-xs mt-1">Optimal: 120–160 characters</p>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                  Keywords
                </label>
                <input
                  value={formData.keywords ?? ""}
                  onChange={(e) => update("keywords", e.target.value)}
                  placeholder="zardosi, hand embroidery, couture..."
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                />
                <p className="text-[#333] text-xs mt-1">Comma-separated keywords</p>
              </div>

              {/* OG Image */}
              <div>
                <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                  OG Image URL
                </label>
                <input
                  value={formData.ogImage ?? ""}
                  onChange={(e) => update("ogImage", e.target.value)}
                  placeholder="https://... (1200×630px recommended)"
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                />
              </div>

              {/* Robots */}
              <div>
                <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                  Search Engine Indexing
                </label>
                <div className="flex gap-2">
                  {(["index", "noindex"] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => update("robots", val)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border"
                      style={{
                        background:
                          formData.robots === val
                            ? val === "index"
                              ? "rgba(74,222,128,0.1)"
                              : "rgba(248,113,113,0.1)"
                            : "transparent",
                        color:
                          formData.robots === val
                            ? val === "index"
                              ? "#4ade80"
                              : "#f87171"
                            : "#444",
                        borderColor:
                          formData.robots === val
                            ? val === "index"
                              ? "rgba(74,222,128,0.3)"
                              : "rgba(248,113,113,0.3)"
                            : "#2a2a2a",
                      }}
                    >
                      {val === "index" ? "✓ Index (recommended)" : "✕ No Index"}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Google Preview Card */}
        <div className="space-y-5">
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={15} className="text-[#C9A227]" />
              <h3 className="text-white font-medium text-sm">Google Search Preview</h3>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs text-green-700 mb-0.5">
                https://zardosiatelier-123.vercel.app
                {activePage !== "Home" ? `/${activePage.toLowerCase()}` : ""}
              </p>
              <p
                className="text-blue-700 font-medium text-lg leading-tight hover:underline cursor-pointer"
                style={{ maxWidth: "560px" }}
              >
                {formData.metaTitle || `${activePage} — Zardosi Atelier`}
              </p>
              <p className="text-[#444] text-sm mt-1 leading-relaxed" style={{ maxWidth: "560px" }}>
                {formData.metaDescription ||
                  "A luxury hand embroidery and couture manufacturing atelier..."}
              </p>
            </div>
          </div>

          {/* OG Image Preview */}
          {formData.ogImage && (
            <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5">
              <h3 className="text-white font-medium text-sm mb-3">OG Image Preview</h3>
              <img
                src={formData.ogImage}
                alt="OG Preview"
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: "1200/630" }}
              />
            </div>
          )}

          {/* Character Count Guide */}
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-5">
            <h3 className="text-white font-medium text-sm mb-3">SEO Score</h3>
            <div className="space-y-3">
              {[
                {
                  label: "Meta Title",
                  len: titleLen,
                  min: 40,
                  max: 60,
                },
                {
                  label: "Meta Description",
                  len: descLen,
                  min: 120,
                  max: 160,
                },
              ].map((item) => {
                const pct = Math.min((item.len / item.max) * 100, 100);
                const ok = item.len >= item.min && item.len <= item.max;
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[#555] text-xs">{item.label}</span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: ok ? "#4ade80" : "#f87171" }}
                      >
                        {ok ? "✓ Good" : item.len < item.min ? "Too short" : "Too long"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          background: ok ? "#4ade80" : "#f87171",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
