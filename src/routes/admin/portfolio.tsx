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
  LayoutGrid,
  List,
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

const TAGS = ["Zardozi", "Sequin", "Crystal & Stone Work", "Pearl Work", "Resham & Zari", "Couture Studies", "Other"];

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

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
        await updatePortfolioItem({ data: { password, id: editingItem.id, caption, tag } });
      } else {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile!);
        });
        await uploadPortfolioImage({ data: { password, filename: imageFile!.name, base64, caption, tag } });
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
    mutationFn: async (item: PortfolioItem) => deletePortfolioItem({ data: { password, id: item.id, url: item.url } }),
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
      for (const item of toDelete) await deletePortfolioItem({ data: { password, id: item.id, url: item.url } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success(`${selectedIds.size} items deleted`);
      setSelectedIds(new Set());
      setBulkDeleteConfirm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

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
    const matchSearch = !search || item.caption.toLowerCase().includes(search.toLowerCase()) || item.tag.toLowerCase().includes(search.toLowerCase());
    const matchTag = filterTag === "All" || item.tag === filterTag;
    return matchSearch && matchTag;
  });

  const allSelected = filteredItems.length > 0 && filteredItems.every((i) => selectedIds.has(i.id));
  function toggleAll() {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(filteredItems.map((i) => i.id)));
  }

  function formatDate(str: string) {
    return new Date(str).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-page-title">Portfolio</h2>
          <p className="admin-page-subtitle">{items.length} items synced from the shared portfolio source.</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button onClick={() => setBulkDeleteConfirm(true)} className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100">
              <Trash2 size={14} className="mr-1.5 inline" /> Delete ({selectedIds.size})
            </button>
          )}
          <button onClick={openAdd} className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>

      <div className="admin-glass p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search items..." className="admin-input w-full py-3 pl-11 pr-4 text-sm" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...TAGS].map((t) => (
              <button key={t} onClick={() => setFilterTag(t)} className={`px-4 py-2.5 text-xs font-bold transition ${filterTag === t ? "admin-pill-active" : "admin-pill hover:bg-white/90"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex rounded-[18px] border border-white/80 bg-white/60 p-1 shadow-sm">
            <button onClick={() => setViewMode("grid")} className={`rounded-2xl p-2.5 transition ${viewMode === "grid" ? "admin-pill-active text-[#1f1306]" : "text-slate-400 hover:text-slate-900"}`} title="Grid view"><LayoutGrid size={16} /></button>
            <button onClick={() => setViewMode("list")} className={`rounded-2xl p-2.5 transition ${viewMode === "list" ? "admin-pill-active text-[#1f1306]" : "text-slate-400 hover:text-slate-900"}`} title="List view"><List size={16} /></button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="admin-glass h-72 animate-pulse" />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-glass flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-white/70 text-slate-300"><ImageIcon size={28} /></div>
          <p className="text-sm font-bold text-slate-600">No items found</p>
          <p className="mt-1 text-xs text-slate-400">{search ? "Try a different search term" : "Add your first portfolio item"}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredItems.map((item, i) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.015, 0.25) }} className="admin-glass admin-glass-hover group overflow-hidden p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-slate-100">
                <img src={item.url} alt={item.caption} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <button onClick={() => toggleSelect(item.id)} className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/75 text-slate-500 backdrop-blur-xl transition hover:text-blue-600">
                  {selectedIds.has(item.id) && <Check size={15} />}
                </button>
                <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
                  <button onClick={() => openEdit(item)} className="flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-blue-600" title="Edit"><Pencil size={15} /></button>
                  <button onClick={() => setDeleteTarget(item)} className="flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-red-500" title="Delete"><Trash2 size={15} /></button>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition group-hover:opacity-100">
                  <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur-xl">{item.tag}</span>
                </div>
              </div>
              <div className="px-2 py-4">
                <h3 className="truncate text-sm font-bold text-slate-950">{item.caption || "No caption"}</h3>
                <p className="mt-1 text-xs font-medium text-slate-400">{formatDate(item.uploadedAt)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="admin-glass overflow-hidden">
          <div className="grid grid-cols-[40px_72px_1fr_160px_130px_96px] items-center gap-4 border-b border-white/70 px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
            <button onClick={toggleAll} className="flex size-5 items-center justify-center rounded-md border border-slate-200 bg-white">{allSelected && <Check size={12} />}</button>
            <div>Image</div><div>Caption</div><div className="hidden sm:block">Tag</div><div className="hidden md:block">Uploaded</div><div>Actions</div>
          </div>
          {filteredItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.01, 0.2) }} className="grid grid-cols-[40px_72px_1fr_160px_130px_96px] items-center gap-4 border-b border-white/60 px-5 py-4 transition hover:bg-white/45">
              <button onClick={() => toggleSelect(item.id)} className="flex size-5 items-center justify-center rounded-md border border-slate-200 bg-white">{selectedIds.has(item.id) && <Check size={12} />}</button>
              <img src={item.url} alt={item.caption} className="size-14 rounded-2xl object-cover shadow-sm" />
              <p className="truncate text-sm font-bold text-slate-800">{item.caption || "No caption"}</p>
              <span className="admin-badge hidden w-fit sm:block">{item.tag}</span>
              <span className="hidden text-xs font-semibold text-slate-400 md:block">{formatDate(item.uploadedAt)}</span>
              <div className="flex gap-1">
                <button onClick={() => openEdit(item)} className="rounded-2xl p-2 text-slate-400 transition hover:bg-white hover:text-blue-600" title="Edit"><Pencil size={15} /></button>
                <button onClick={() => setDeleteTarget(item)} className="rounded-2xl p-2 text-slate-400 transition hover:bg-white hover:text-red-500" title="Delete"><Trash2 size={15} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm" onClick={closeDrawer} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed bottom-4 right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-[28px] border border-white/75 bg-white/82 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/70 px-6 py-5">
                <h3 className="text-lg font-bold text-slate-950">{editingItem ? "Edit Item" : "Add Portfolio Item"}</h3>
                <button onClick={closeDrawer} className="rounded-2xl p-2 text-slate-400 transition hover:bg-white hover:text-slate-950"><X size={17} /></button>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                {!editingItem && (
                  <div>
                    <label className="admin-label mb-2 block">Image <span className="text-red-500">*</span></label>
                    <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFileChange(e.dataTransfer.files[0] ?? null); }} onClick={() => fileInputRef.current?.click()} className={`cursor-pointer rounded-[24px] border-2 border-dashed p-6 text-center transition ${dragOver ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white/60"}`}>
                      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
                      {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto max-h-56 rounded-3xl object-contain" /> : <><Upload size={26} className="mx-auto mb-3 text-slate-300" /><p className="text-sm font-bold text-slate-600">Drag & drop or click to upload</p><p className="mt-1 text-xs text-slate-400">PNG, JPG, WEBP - Max 5MB</p></>}
                    </div>
                  </div>
                )}
                {editingItem && <img src={editingItem.url} alt={editingItem.caption} className="h-56 w-full rounded-[24px] object-cover" />}
                <div><label className="admin-label mb-2 block">Caption</label><input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Gold Zardozi Embroidery on Silk" maxLength={120} className="admin-input w-full px-4 py-3 text-sm" /><p className="mt-1 text-right text-xs text-slate-400">{caption.length}/120</p></div>
                <div><label className="admin-label mb-2 block">Category Tag</label><div className="flex flex-wrap gap-2">{TAGS.map((t) => <button key={t} type="button" onClick={() => setTag(t)} className={`px-3 py-2 text-xs font-bold transition ${tag === t ? "admin-pill-active" : "admin-pill"}`}>{t}</button>)}</div></div>
              </div>
              <div className="flex gap-3 border-t border-white/70 p-5">
                <button onClick={closeDrawer} className="admin-secondary-btn flex-1 py-3 text-sm font-bold">Cancel</button>
                <button onClick={() => uploadMut.mutate()} disabled={uploadMut.isPending || (!editingItem && !imageFile)} className="admin-primary-btn flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold">{uploadMut.isPending ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : editingItem ? "Save Changes" : "Upload"}</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog open={!!deleteTarget} title="Delete Item?" body={`\"${deleteTarget?.caption || "This item"}\" will be permanently removed. This cannot be undone.`} busy={deleteMut.isPending} onCancel={() => setDeleteTarget(null)} onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)} />
      <ConfirmDialog open={bulkDeleteConfirm} title={`Delete ${selectedIds.size} Items?`} body="This will permanently delete all selected items." busy={bulkDeleteMut.isPending} onCancel={() => setBulkDeleteConfirm(false)} onConfirm={() => bulkDeleteMut.mutate()} />
    </div>
  );
}

function ConfirmDialog({ open, title, body, busy, onCancel, onConfirm }: { open: boolean; title: string; body: string; busy: boolean; onCancel: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} className="admin-glass w-full max-w-sm p-6">
            <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-red-50 text-red-500"><AlertTriangle size={19} /></div>
            <h3 className="text-lg font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
            <div className="mt-6 flex gap-3"><button onClick={onCancel} className="admin-secondary-btn flex-1 py-3 text-sm font-bold">Cancel</button><button onClick={onConfirm} disabled={busy} className="flex flex-1 items-center justify-center gap-2 rounded-[18px] border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50">{busy ? <Loader2 size={14} className="animate-spin" /> : "Delete"}</button></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}