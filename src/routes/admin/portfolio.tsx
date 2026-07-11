import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Search,
  Check,
  Loader2,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import {
  getPortfolioItems,
  uploadPortfolioImage,
  updatePortfolioItem,
  deletePortfolioItem,
  type PortfolioItem,
} from "@/lib/portfolio-admin";
import { loadSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/portfolio")({
  component: PortfolioAdmin,
});

const TAGS = ["Zardozi", "Sequin", "Crystal Stone", "Pearl Work", "Resham Zari", "Aari", "Other"];

function PortfolioAdmin() {
  const qc = useQueryClient();
  const session = loadSession();
  const password = session ? atob(session.token).split("|")[0] : "";

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
  });

  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // Form state
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMut = useMutation({
    mutationFn: async () => {
      if (!imageFile && !editingItem) throw new Error("No image selected");
      if (editingItem) {
        // Edit only caption/tag
        await updatePortfolioItem({
          data: {
            password: process.env.ADMIN_PASSWORD ?? "zardosi@admin2024",
            id: editingItem.id,
            caption,
            tag,
          },
        });
      } else {
        // Upload new
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile!);
        });
        await uploadPortfolioImage({
          data: {
            password: process.env.ADMIN_PASSWORD ?? "zardosi@admin2024",
            filename: imageFile!.name,
            base64,
            caption,
            tag,
          },
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success(editingItem ? "Item updated!" : "Image uploaded!");
      closeDrawer();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMut = useMutation({
    mutationFn: async (item: PortfolioItem) => {
      await deletePortfolioItem({
        data: {
          password: process.env.ADMIN_PASSWORD ?? "zardosi@admin2024",
          id: item.id,
          url: item.url,
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Item deleted");
      setDeleteTarget(null);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const bulkDeleteMut = useMutation({
    mutationFn: async () => {
      const toDelete = items.filter((i) => selectedIds.has(i.id));
      for (const item of toDelete) {
        await deletePortfolioItem({
          data: {
            password: process.env.ADMIN_PASSWORD ?? "zardosi@admin2024",
            id: item.id,
            url: item.url,
          },
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success(`${selectedIds.size} items deleted`);
      setSelectedIds(new Set());
      setBulkDeleteConfirm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  void password; // suppress unused warning

  function openAdd() {
    setEditingItem(null);
    setCaption("");
    setTag(TAGS[0]);
    setImageFile(null);
    setImagePreview(null);
    setDrawerOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditingItem(item);
    setCaption(item.caption);
    setTag(item.tag);
    setImageFile(null);
    setImagePreview(item.url);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
  }

  function handleFileChange(file: File | null) {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filteredItems = items.filter((item) => {
    const matchSearch =
      !search ||
      item.caption.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());
    const matchTag = filterTag === "All" || item.tag === filterTag;
    return matchSearch && matchTag;
  });

  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every((i) => selectedIds.has(i.id));

  function toggleAll() {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredItems.map((i) => i.id)));
  }

  function formatDate(str: string) {
    return new Date(str).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Portfolio
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            {items.length} item{items.length !== 1 ? "s" : ""} · Dynamic uploads
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={13} />
              Delete ({selectedIds.size})
            </button>
          )}
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] transition-colors shadow-[0_4px_16px_rgba(201,162,39,0.3)]"
          >
            <Plus size={15} />
            Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-[#111] border border-[#222] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...TAGS].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTag(t)}
              className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
              style={{
                background: filterTag === t ? "rgba(201,162,39,0.15)" : "#111",
                color: filterTag === t ? "#C9A227" : "#555",
                border: filterTag === t ? "1px solid rgba(201,162,39,0.3)" : "1px solid #1e1e1e",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#1a1a1a] text-[#444] text-xs uppercase tracking-wider">
          <div className="w-5">
            <button
              onClick={toggleAll}
              className="w-4 h-4 rounded border border-[#333] flex items-center justify-center hover:border-[#C9A227] transition-colors"
              style={{ background: allSelected ? "#C9A227" : "transparent" }}
            >
              {allSelected && <Check size={10} className="text-black" />}
            </button>
          </div>
          <div className="w-12">Image</div>
          <div className="flex-1">Caption</div>
          <div className="w-28 hidden sm:block">Tag</div>
          <div className="w-28 hidden md:block">Uploaded</div>
          <div className="w-20">Actions</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[#0f0f0f] animate-pulse">
              <div className="w-5 h-4 bg-[#1a1a1a] rounded" />
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg" />
              <div className="flex-1 h-3 bg-[#1a1a1a] rounded" />
              <div className="w-20 h-3 bg-[#1a1a1a] rounded hidden sm:block" />
              <div className="w-20 h-3 bg-[#1a1a1a] rounded hidden md:block" />
              <div className="w-20 h-7 bg-[#1a1a1a] rounded" />
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-4">
              <ImageIcon size={24} className="text-[#333]" />
            </div>
            <p className="text-[#444] text-sm font-medium mb-1">No items found</p>
            <p className="text-[#333] text-xs mb-5">
              {search ? "Try a different search term" : "Add your first portfolio item"}
            </p>
            <button
              onClick={openAdd}
              className="px-4 py-2 rounded-xl bg-[#C9A227] text-black text-xs font-semibold hover:bg-[#B8911E] transition-colors"
            >
              <Plus size={12} className="inline mr-1.5" />
              Add Item
            </button>
          </div>
        ) : (
          filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 px-5 py-3.5 border-b border-[#0f0f0f] hover:bg-[#0d0d0d] transition-colors"
            >
              <div className="w-5">
                <button
                  onClick={() => toggleSelect(item.id)}
                  className="w-4 h-4 rounded border border-[#333] flex items-center justify-center hover:border-[#C9A227] transition-colors"
                  style={{ background: selectedIds.has(item.id) ? "#C9A227" : "transparent" }}
                >
                  {selectedIds.has(item.id) && <Check size={10} className="text-black" />}
                </button>
              </div>
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1a1a1a] shrink-0">
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{item.caption || <span className="text-[#333]">No caption</span>}</p>
              </div>
              <div className="w-28 hidden sm:block">
                <span className="px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[#666] text-xs">
                  {item.tag}
                </span>
              </div>
              <div className="w-28 hidden md:block text-[#444] text-xs">
                {formatDate(item.uploadedAt)}
              </div>
              <div className="w-20 flex items-center gap-1">
                <button
                  onClick={() => openEdit(item)}
                  className="p-1.5 rounded-lg text-[#444] hover:text-[#C9A227] hover:bg-[#C9A227]/10 transition-all"
                  title="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-1.5 rounded-lg text-[#444] hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Slide-Over Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closeDrawer}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111111] border-l border-[#2a2a2a] flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
                <h3 className="text-white font-semibold text-base">
                  {editingItem ? "Edit Item" : "Add Portfolio Item"}
                </h3>
                <button
                  onClick={closeDrawer}
                  className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white hover:border-[#333] transition-all"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Image Upload / Preview */}
                {!editingItem && (
                  <div>
                    <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                      Image <span className="text-red-400">*</span>
                    </label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFileChange(e.dataTransfer.files[0] ?? null);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className="relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200"
                      style={{
                        borderColor: dragOver ? "#C9A227" : imagePreview ? "#C9A227/40" : "#2a2a2a",
                        background: dragOver ? "rgba(201,162,39,0.05)" : "transparent",
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                      />
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-52 mx-auto rounded-lg object-contain"
                        />
                      ) : (
                        <>
                          <Upload size={24} className="mx-auto text-[#333] mb-3" />
                          <p className="text-[#555] text-sm">
                            Drag & drop or click to upload
                          </p>
                          <p className="text-[#333] text-xs mt-1">
                            PNG, JPG, WEBP · Max 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {editingItem && (
                  <div>
                    <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                      Preview
                    </label>
                    <img
                      src={editingItem.url}
                      alt={editingItem.caption}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Caption */}
                <div>
                  <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                    Caption
                  </label>
                  <input
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Gold Zardozi Embroidery on Silk"
                    maxLength={120}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                  />
                  <p className="text-[#333] text-xs mt-1 text-right">
                    {caption.length}/120
                  </p>
                </div>

                {/* Tag */}
                <div>
                  <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                    Category Tag
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTag(t)}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150"
                        style={{
                          background: tag === t ? "rgba(201,162,39,0.15)" : "#0a0a0a",
                          color: tag === t ? "#C9A227" : "#555",
                          border: tag === t ? "1px solid rgba(201,162,39,0.4)" : "1px solid #222",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-5 py-4 border-t border-[#1a1a1a] flex gap-3">
                <button
                  onClick={closeDrawer}
                  className="flex-1 py-3 rounded-xl border border-[#2a2a2a] text-[#666] text-sm hover:border-[#333] hover:text-[#888] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => uploadMut.mutate()}
                  disabled={uploadMut.isPending || (!editingItem && !imageFile)}
                  className="flex-1 py-3 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {uploadMut.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : editingItem ? (
                    "Save Changes"
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>
            </motion.div>
          </>
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
              <h3 className="text-white font-semibold text-base mb-2">Delete Item?</h3>
              <p className="text-[#555] text-sm mb-5">
                "{deleteTarget.caption || "This item"}" will be permanently removed. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm hover:border-[#444] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMut.mutate(deleteTarget)}
                  disabled={deleteMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  {deleteMut.isPending ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Delete Confirm */}
      <AnimatePresence>
        {bulkDeleteConfirm && (
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
                <Trash2 size={18} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                Delete {selectedIds.size} Items?
              </h3>
              <p className="text-[#555] text-sm mb-5">
                This will permanently delete all selected items.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBulkDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm hover:border-[#444] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => bulkDeleteMut.mutate()}
                  disabled={bulkDeleteMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  {bulkDeleteMut.isPending ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    "Delete All"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
