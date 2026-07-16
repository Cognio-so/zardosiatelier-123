import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo, useCallback, memo } from "react";
import { List as VirtualList } from "react-window";
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
  List as ListIcon,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  getPortfolioItems,
  uploadPortfolioImage,
  updatePortfolioItem,
  deletePortfolioItem,
  seedDefaultPortfolio,
  type PortfolioItem,
} from "@/lib/portfolio-admin";
import { loadSession } from "@/lib/admin-auth";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const TAGS = [
  "Zardozi",
  "Sequin",
  "Crystal & Stone Work",
  "Pearl Work",
  "Resham & Zari",
  "Couture Studies",
  "Other",
];

// Memoized individual grid item card to prevent redundant rerenders
const GridItemCard = memo(
  ({
    item,
    isSelected,
    onToggleSelect,
    onEdit,
    onDelete,
    formattedDate,
  }: {
    item: PortfolioItem;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
    onEdit: (item: PortfolioItem) => void;
    onDelete: (item: PortfolioItem) => void;
    formattedDate: string;
  }) => {
    return (
      <article
        className="admin-glass admin-glass-hover group overflow-hidden p-3 h-[410px] flex flex-col justify-between"
        aria-label={`Portfolio design: ${item.caption || "No caption"}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-slate-100 flex-1">
          <img
            src={item.url}
            alt={item.caption || `${item.tag} luxury hand embroidery couture design`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent opacity-0 transition group-hover:opacity-100" />
          <button
            onClick={() => onToggleSelect(item.id)}
            aria-pressed={isSelected}
            aria-label={
              isSelected
                ? `Deselect item ${item.caption || "No caption"}`
                : `Select item ${item.caption || "No caption"}`
            }
            title="Select item"
            className="absolute left-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/80 bg-white/75 text-slate-500 backdrop-blur-xl transition hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            {isSelected ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <div className="size-3 rounded-full border border-slate-350" />
            )}
          </button>
          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
            <button
              onClick={() => onEdit(item)}
              aria-label={`Edit details for ${item.caption || "No caption"}`}
              className="flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              title="Edit"
            >
              <Pencil size={15} aria-hidden="true" />
            </button>
            <button
              onClick={() => onDelete(item)}
              aria-label={`Delete item: ${item.caption || "No caption"}`}
              className="flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-600 shadow-lg backdrop-blur-xl transition hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              title="Delete"
            >
              <Trash2 size={15} aria-hidden="true" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition group-hover:opacity-100">
            <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700 backdrop-blur-xl">
              {item.tag}
            </span>
          </div>
        </div>
        <div className="px-2 pt-3 pb-1 shrink-0">
          <h3 className="truncate text-sm font-bold text-slate-950">
            {item.caption || "No caption"}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-400">{formattedDate}</p>
        </div>
      </article>
    );
  },
);
GridItemCard.displayName = "GridItemCard";

// Memoized table/list row to prevent redundant rendering
const ListItemRow = memo(
  ({
    item,
    isSelected,
    onToggleSelect,
    onEdit,
    onDelete,
    formattedDate,
  }: {
    item: PortfolioItem;
    isSelected: boolean;
    onToggleSelect: (id: string) => void;
    onEdit: (item: PortfolioItem) => void;
    onDelete: (item: PortfolioItem) => void;
    formattedDate: string;
  }) => {
    return (
      <article
        role="row"
        className="grid grid-cols-[40px_72px_1fr_160px_130px_96px] items-center gap-4 px-5 py-2.5 transition hover:bg-white/45 h-[72px]"
      >
        <div className="flex items-center">
          <button
            onClick={() => onToggleSelect(item.id)}
            aria-pressed={isSelected}
            aria-label={`Select item: ${item.caption || "No caption"}`}
            className={`flex size-5 items-center justify-center rounded-md border focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${isSelected ? "border-blue-500 bg-blue-600 text-white" : "border-slate-300 bg-white/60"}`}
          >
            {isSelected && <Check size={12} aria-hidden="true" />}
          </button>
        </div>
        <img
          src={item.url}
          alt={item.caption || `${item.tag} work`}
          className="size-12 rounded-xl object-cover shadow-sm"
          loading="lazy"
          decoding="async"
        />
        <p className="truncate text-sm font-bold text-slate-800">{item.caption || "No caption"}</p>
        <span className="admin-badge hidden w-fit sm:block">{item.tag}</span>
        <span className="hidden text-xs font-semibold text-slate-500 md:block">
          {formattedDate}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(item)}
            aria-label={`Edit ${item.caption || "No caption"}`}
            title="Edit"
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(item)}
            aria-label={`Delete ${item.caption || "No caption"}`}
            title="Delete"
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  },
);
ListItemRow.displayName = "ListItemRow";

export default function PortfolioAdmin() {
  const qc = useQueryClient();
  const session = loadSession();
  const password = session ? atob(session.token).split("|")[0] : "";
  const windowWidth = useWindowWidth();

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
  const [seedConfirm, setSeedConfirm] = useState(false);

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
        await uploadPortfolioImage({
          data: { password, filename: imageFile!.name, base64, caption, tag },
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
    mutationFn: async (item: PortfolioItem) =>
      deletePortfolioItem({ data: { password, id: item.id, url: item.url } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Item deleted");
      setDeleteTarget(null);
      if (activeEnquiryIdRef.current === deleteTarget?.id) {
        // cleanup references if any
      }
    },
    onError: (err: Error) => toast.error(err.message),
  });
  const activeEnquiryIdRef = useRef<string | null>(null);

  const bulkDeleteMut = useMutation({
    mutationFn: async () => {
      const toDelete = items.filter((i) => selectedIds.has(i.id));
      for (const item of toDelete)
        await deletePortfolioItem({ data: { password, id: item.id, url: item.url } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success(`${selectedIds.size} items deleted`);
      setSelectedIds(new Set());
      setBulkDeleteConfirm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const seedMut = useMutation({
    mutationFn: async () => seedDefaultPortfolio({ data: { password } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Default designs seeded successfully!");
      setSeedConfirm(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openAdd = useCallback(() => {
    setEditingItem(null);
    setCaption("");
    setTag(TAGS[0]);
    setImageFile(null);
    setImagePreview(null);
    setDrawerOpen(true);
  }, []);

  const openEdit = useCallback((item: PortfolioItem) => {
    setEditingItem(item);
    setCaption(item.caption);
    setTag(item.tag);
    setImageFile(null);
    setImagePreview(item.url);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
  }, []);

  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Memoized filter and search calculations outside render loops
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((item) => {
      const matchSearch =
        !q || item.caption.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q);
      const matchTag = filterTag === "All" || item.tag === filterTag;
      return matchSearch && matchTag;
    });
  }, [items, search, filterTag]);

  const allSelected = useMemo(() => {
    return filteredItems.length > 0 && filteredItems.every((i) => selectedIds.has(i.id));
  }, [filteredItems, selectedIds]);

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
    }
  }, [allSelected, filteredItems]);

  const formatDate = useCallback((str: string) => {
    return new Date(str).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  // Pre-calculate date string maps to prevent raw formatting on every virtual render
  const formattedDatesMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const item of filteredItems) {
      map[item.id] = formatDate(item.uploadedAt);
    }
    return map;
  }, [filteredItems, formatDate]);

  // Determine grid column size based on responsive width breakpoints
  const gridColumns = useMemo(() => {
    if (windowWidth >= 1536) return 4;
    if (windowWidth >= 1280) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  }, [windowWidth]);

  // Chunk grid row list data for virtualization
  const virtualGridRows = useMemo(() => {
    const chunks: PortfolioItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += gridColumns) {
      chunks.push(filteredItems.slice(i, i + gridColumns));
    }
    return chunks;
  }, [filteredItems, gridColumns]);

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-page-title">Portfolio</h2>
          <p className="admin-page-subtitle">
            {items.length} items synced from the shared portfolio source.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              aria-label={`Delete ${selectedIds.size} selected items`}
              title={`Delete ${selectedIds.size} selected items`}
              className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Trash2 size={14} className="mr-1.5 inline" aria-hidden="true" />
              <span>Delete ({selectedIds.size})</span>
            </button>
          )}
          <button
            onClick={() => setSeedConfirm(true)}
            className="rounded-[18px] border border-gold/45 bg-white/60 px-5 py-3 text-sm font-bold text-[#c9a44c] hover:bg-gold/10 transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] flex items-center gap-2"
            title="Seed default showcase items"
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>Seed Defaults</span>
          </button>
          <button
            onClick={openAdd}
            aria-label="Add new portfolio item"
            title="Add new portfolio item"
            className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <Plus size={16} aria-hidden="true" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="admin-glass p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <label htmlFor="portfolio-search-field" className="sr-only">
              Search portfolio items
            </label>
            <input
              id="portfolio-search-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="admin-input w-full py-3 pl-11 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              aria-label="Search portfolio items"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter items by category">
            {["All", ...TAGS].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                aria-pressed={filterTag === t}
                aria-label={`Filter by category: ${t}`}
                title={`Filter by category: ${t}`}
                className={`px-4 py-2.5 text-xs font-bold transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${filterTag === t ? "admin-pill-active" : "admin-pill hover:bg-white/90"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            className="flex rounded-[18px] border border-white/80 bg-white/60 p-1 shadow-sm"
            role="group"
            aria-label="Layout view mode"
          >
            <button
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={`rounded-2xl p-2.5 transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${viewMode === "grid" ? "admin-pill-active text-[#1f1306]" : "text-slate-400 hover:text-slate-900"}`}
              aria-label="Switch to grid view"
              title="Grid view"
            >
              <LayoutGrid size={16} aria-hidden="true" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className={`rounded-2xl p-2.5 transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${viewMode === "list" ? "admin-pill-active text-[#1f1306]" : "text-slate-400 hover:text-slate-900"}`}
              aria-label="Switch to list view"
              title="List view"
            >
              <ListIcon size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-busy="true"
          aria-label="Loading portfolio items"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="admin-glass h-72 animate-pulse" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-glass flex flex-col items-center justify-center px-6 py-20 text-center">
          <div
            className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-white/70 text-slate-300"
            aria-hidden="true"
          >
            <ImageIcon size={28} />
          </div>
          <p className="text-sm font-bold text-slate-650">No items found</p>
          <p className="mt-1 text-xs text-slate-500">
            {search ? "Try a different search term" : "Add your first portfolio item"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="w-full overflow-hidden">
          <VirtualList
            rowCount={virtualGridRows.length}
            rowHeight={430}
            style={{ height: "680px" }}
            className="scrollbar-thin"
            rowProps={{}}
            rowComponent={({ index, style }) => {
              const rowItems = virtualGridRows[index] ?? [];
              return (
                <div style={style} className={`grid gap-5 grid-cols-${gridColumns} pb-5`}>
                  {rowItems.map((item) => (
                    <GridItemCard
                      key={item.id}
                      item={item}
                      isSelected={selectedIds.has(item.id)}
                      onToggleSelect={toggleSelect}
                      onEdit={openEdit}
                      onDelete={setDeleteTarget}
                      formattedDate={formattedDatesMap[item.id] ?? ""}
                    />
                  ))}
                </div>
              );
            }}
          />
        </div>
      ) : (
        <section className="admin-glass overflow-hidden" aria-label="Portfolio items table view">
          <div className="grid grid-cols-[40px_72px_1fr_160px_130px_96px] items-center gap-4 border-b border-white/70 px-5 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
            <button
              onClick={toggleAll}
              aria-pressed={allSelected}
              aria-label="Select all items in list"
              title="Select all items in list"
              className="flex size-5 items-center justify-center rounded-md border border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            >
              {allSelected && <Check size={12} aria-hidden="true" />}
            </button>
            <div>Image</div>
            <div>Caption</div>
            <div className="hidden sm:block">Tag</div>
            <div className="hidden md:block">Uploaded</div>
            <div>Actions</div>
          </div>
          <VirtualList
            rowCount={filteredItems.length}
            rowHeight={72}
            style={{ height: "600px" }}
            rowProps={{}}
            rowComponent={({ index, style }) => {
              const item = filteredItems[index];
              if (!item) return null;
              return (
                <div style={style}>
                  <ListItemRow
                    item={item}
                    isSelected={selectedIds.has(item.id)}
                    onToggleSelect={toggleSelect}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                    formattedDate={formattedDatesMap[item.id] ?? ""}
                  />
                </div>
              );
            }}
          />
        </section>
      )}

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
              onClick={closeDrawer}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-4 right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-[28px] border border-white/75 bg-white/82 shadow-2xl backdrop-blur-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              <div className="flex items-center justify-between border-b border-white/70 px-6 py-5">
                <h3 id="drawer-title" className="text-lg font-bold text-slate-950">
                  {editingItem ? "Edit Item" : "Add Portfolio Item"}
                </h3>
                <button
                  onClick={closeDrawer}
                  aria-label="Close drawer"
                  title="Close drawer"
                  className="rounded-2xl p-2 text-slate-450 transition hover:bg-white hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                {!editingItem && (
                  <div>
                    <label htmlFor="file-upload-input" className="admin-label mb-2 block">
                      Image <span className="text-red-500">*</span>
                    </label>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFileChange(e.dataTransfer.files[0] ?? null);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer rounded-[24px] border-2 border-dashed p-6 text-center transition focus-within:ring-2 focus-within:ring-[#c9a44c] ${dragOver ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white/60"}`}
                    >
                      <input
                        id="file-upload-input"
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                      />
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Image upload preview"
                          className="mx-auto max-h-56 rounded-3xl object-contain"
                        />
                      ) : (
                        <>
                          <Upload
                            size={26}
                            className="mx-auto mb-3 text-slate-300"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-bold text-slate-655">
                            Drag & drop or click to upload
                          </p>
                          <p className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP - Max 5MB</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {editingItem && (
                  <div>
                    <span className="admin-label mb-2 block">Current Image</span>
                    <img
                      src={editingItem.url}
                      alt={editingItem.caption || "Current portfolio embroidery item design"}
                      className="h-56 w-full rounded-[24px] object-cover"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="portfolio-caption-input" className="admin-label mb-2 block">
                    Caption
                  </label>
                  <input
                    id="portfolio-caption-input"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Gold Zardozi Embroidery on Silk"
                    maxLength={120}
                    className="admin-input w-full px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                    aria-label="Design caption"
                  />
                  <p className="mt-1 text-right text-xs text-slate-500">{caption.length}/120</p>
                </div>
                <div>
                  <span className="admin-label mb-2 block">Category Tag</span>
                  <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-label="Select category tag"
                  >
                    {TAGS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTag(t)}
                        aria-pressed={tag === t}
                        aria-label={`Select tag: ${t}`}
                        className={`px-3 py-2 text-xs font-bold transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${tag === t ? "admin-pill-active" : "admin-pill"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 border-t border-white/70 p-5">
                <button
                  onClick={closeDrawer}
                  className="admin-secondary-btn flex-1 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => uploadMut.mutate()}
                  disabled={uploadMut.isPending || (!editingItem && !imageFile)}
                  className="admin-primary-btn flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                >
                  {uploadMut.isPending ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Saving...
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

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Item?"
        body={`"${deleteTarget?.caption || "This item"}" will be permanently removed. This cannot be undone.`}
        busy={deleteMut.isPending}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)}
      />
      <ConfirmDialog
        open={bulkDeleteConfirm}
        title={`Delete ${selectedIds.size} Items?`}
        body="This will permanently delete all selected items."
        busy={bulkDeleteMut.isPending}
        onCancel={() => setBulkDeleteConfirm(false)}
        onConfirm={() => bulkDeleteMut.mutate()}
      />
      <ConfirmDialog
        open={seedConfirm}
        title="Seed Default Designs?"
        body="This will populate the portfolio with the 6 default Zardosi Atelier designs. If you already have uploaded items, they will be preserved, but duplicates might be created if seeded multiple times. Do you want to proceed?"
        busy={seedMut.isPending}
        onCancel={() => setSeedConfirm(false)}
        onConfirm={() => seedMut.mutate()}
        confirmText="Seed Designs"
        confirmColor="gold"
        iconType="sparkles"
      />
    </div>
  );
}

function ConfirmDialog({
  open,
  title,
  body,
  busy,
  onCancel,
  onConfirm,
  confirmText = "Delete",
  confirmColor = "red",
  iconType = "warning",
}: {
  open: boolean;
  title: string;
  body: string;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  confirmColor?: "red" | "gold";
  iconType?: "warning" | "sparkles";
}) {
  const isRed = confirmColor === "red";
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            className="admin-glass w-full max-w-sm p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-desc"
          >
            <div
              className={`mb-4 flex size-11 items-center justify-center rounded-2xl ${isRed ? "bg-red-50 text-red-500" : "bg-amber-50 text-[#c9a44c]"}`}
              aria-hidden="true"
            >
              {iconType === "sparkles" ? <Sparkles size={19} /> : <AlertTriangle size={19} />}
            </div>
            <h3 id="confirm-dialog-title" className="text-lg font-bold text-slate-950">
              {title}
            </h3>
            <p id="confirm-dialog-desc" className="mt-2 text-sm leading-6 text-slate-600">
              {body}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="admin-secondary-btn flex-1 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={busy}
                className={`flex flex-1 items-center justify-center gap-2 rounded-[18px] border py-3 text-sm font-bold transition disabled:opacity-50 ${isRed ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-500" : "border-[#c9a44c]/30 bg-amber-55 text-[#c9a44c] hover:bg-amber-100 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"}`}
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
