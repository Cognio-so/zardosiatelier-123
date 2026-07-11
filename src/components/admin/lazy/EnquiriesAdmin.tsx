import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback, memo, useRef } from "react";
import { MessageSquare, Search, X, Check, Clock, CheckCircle2, AlertCircle, Download, Trash2, AlertTriangle, Loader2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { loadSession } from "@/lib/admin-auth";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, bulkDeleteEnquiries, type Enquiry } from "@/lib/admin-data";

const STATUS_CONFIG = {
  new: { label: "New", color: "text-[#c9a44c]", bg: "bg-[#c9a44c]/15", icon: AlertCircle },
  read: { label: "Read", color: "text-blue-650", bg: "bg-blue-50/70", icon: MessageSquare },
  resolved: { label: "Resolved", color: "text-emerald-700", bg: "bg-emerald-50/70", icon: CheckCircle2 },
};

const StatCard = memo(({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="admin-glass p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="admin-label">{label}</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
        </div>
        <div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl" aria-hidden="true">
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  );
});
StatCard.displayName = "StatCard";

const EnquiryItemRow = memo(({
  enq,
  isSelected,
  onToggleSelect,
  onOpenDetail,
  onDeleteTarget,
  formattedDate,
}: {
  enq: Enquiry;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onOpenDetail: (enq: Enquiry) => void;
  onDeleteTarget: (enq: Enquiry) => void;
  formattedDate: string;
}) => {
  const cfg = STATUS_CONFIG[enq.status];
  const StatusIcon = cfg.icon;
  return (
    <article
      role="row"
      tabIndex={0}
      onClick={() => onOpenDetail(enq)}
      className="grid cursor-pointer grid-cols-[32px_1fr_140px_116px_110px] gap-4 px-5 py-4 transition hover:bg-white/55 max-lg:grid-cols-[32px_1fr_116px] focus-visible:bg-white/65 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c9a44c]"
      aria-label={`Enquiry from ${enq.name}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="flex items-center">
        <button
          onClick={() => onToggleSelect(enq.id)}
          aria-pressed={isSelected}
          aria-label={`Select enquiry from ${enq.name}`}
          className={`flex size-5 items-center justify-center rounded-md border focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${isSelected ? "border-blue-500 bg-blue-600 text-white" : "border-slate-350 bg-white/60"}`}
        >
          {isSelected && <Check size={12} aria-hidden="true" />}
        </button>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-black text-slate-950">{enq.name}</p>
          {enq.status === "new" && <span className="size-2 rounded-full bg-[#c9a44c]" aria-label="New unread status marker" />}
        </div>
        <p className="truncate text-xs font-medium text-slate-600">{enq.message}</p>
      </div>
      <div className="min-w-0 max-lg:hidden">
        <p className="truncate text-xs font-bold text-slate-655">{enq.email}</p>
        {enq.phone && <p className="truncate text-[11px] text-slate-500">{enq.phone}</p>}
      </div>
      <div className="flex items-center">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${cfg.bg} ${cfg.color}`}>
          <StatusIcon size={11} aria-hidden="true" />
          <span>{cfg.label}</span>
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 max-lg:hidden">
        <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><Clock size={11} aria-hidden="true" />{formattedDate}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onDeleteTarget(enq); }}
          aria-label={`Delete enquiry from ${enq.name}`}
          title="Delete enquiry"
          className="rounded-xl p-1.5 text-slate-405 transition hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
});
EnquiryItemRow.displayName = "EnquiryItemRow";

export default function EnquiriesAdmin() {
  const qc = useQueryClient();
  const session = loadSession();
  const password = session ? atob(session.token).split("|")[0] : "";
  const { data: enquiries = [], isLoading } = useQuery({ queryKey: ["enquiries"], queryFn: () => getEnquiries() });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "resolved">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const updateMut = useMutation({ mutationFn: (vars: { id: string; status: Enquiry["status"] }) => updateEnquiryStatus({ data: { password, ...vars } }), onSuccess: () => { qc.invalidateQueries({ queryKey: ["enquiries"] }); toast.success("Status updated"); }, onError: (e: Error) => toast.error(e.message) });
  const deleteMut = useMutation({ mutationFn: (id: string) => deleteEnquiry({ data: { password, id } }), onSuccess: () => { qc.invalidateQueries({ queryKey: ["enquiries"] }); toast.success("Enquiry deleted"); setDeleteTarget(null); if (activeEnquiry?.id === deleteTarget?.id) setActiveEnquiry(null); }, onError: (e: Error) => toast.error(e.message) });
  const bulkDeleteMut = useMutation({ mutationFn: () => bulkDeleteEnquiries({ data: { password, ids: Array.from(selectedIds) } }), onSuccess: () => { qc.invalidateQueries({ queryKey: ["enquiries"] }); toast.success(`${selectedIds.size} enquiries deleted`); setSelectedIds(new Set()); setBulkDeleteConfirm(false); }, onError: (e: Error) => toast.error(e.message) });

  // Memoized filter calculation
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return enquiries.filter((e) => {
      const matchSearch = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.message.toLowerCase().includes(q);
      return matchSearch && (filterStatus === "all" || e.status === filterStatus);
    });
  }, [enquiries, search, filterStatus]);

  const newCount = useMemo(() => enquiries.filter((e) => e.status === "new").length, [enquiries]);
  const resolvedCount = useMemo(() => enquiries.filter((e) => e.status === "resolved").length, [enquiries]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const formatDate = useCallback((str: string) => {
    const d = new Date(str);
    const diffH = Math.floor((Date.now() - d.getTime()) / 3600000);
    const diffD = Math.floor(diffH / 24);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }, []);

  // Memoized formatting of dates map for virtual list
  const formattedDatesMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const enq of filtered) {
      map[enq.id] = formatDate(enq.createdAt);
    }
    return map;
  }, [filtered, formatDate]);

  const handleOpenDetail = useCallback((enq: Enquiry) => {
    setActiveEnquiry(enq);
    if (enq.status === "new") {
      updateMut.mutate({ id: enq.id, status: "read" });
    }
  }, [updateMut]);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === filtered.length) return new Set();
      return new Set(filtered.map((e) => e.id));
    });
  }, [filtered]);

  const exportCsv = useCallback(() => {
    const rows = [
      ["Name", "Email", "Phone", "Message", "Status", "Date"],
      ...enquiries.map((e) => [
        e.name,
        e.email,
        e.phone,
        `"${e.message.replace(/"/g, '""')}"`,
        e.status,
        new Date(e.createdAt).toLocaleDateString("en-IN")
      ])
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }, [enquiries]);

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="admin-page-title">Enquiries</h2><p className="admin-page-subtitle">{enquiries.length} total enquiries, {newCount} awaiting first response.</p></div>
        <div className="flex flex-wrap gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              aria-label={`Delete ${selectedIds.size} selected enquiries`}
              className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Trash2 size={14} className="mr-2 inline" aria-hidden="true" />
              <span>Delete ({selectedIds.size})</span>
            </button>
          )}
          <button
            onClick={exportCsv}
            aria-label="Export enquiries as CSV"
            title="Export enquiries as CSV"
            className="admin-secondary-btn flex items-center gap-2 px-4 py-2.5 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <Download size={14} aria-hidden="true" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3" role="group" aria-label="Enquiries Statistics Summary">
        <StatCard label="Total" value={enquiries.length} icon={MessageSquare} />
        <StatCard label="New" value={newCount} icon={AlertCircle} />
        <StatCard label="Resolved" value={resolvedCount} icon={CheckCircle2} />
      </div>

      <div className="admin-glass p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label htmlFor="enquiry-search-field" className="sr-only">Search enquiries</label>
            <input
              id="enquiry-search-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, message..."
              className="admin-input w-full py-3 pl-11 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              aria-label="Search customer enquiries"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter enquiries by status">
            {(["all", "new", "read", "resolved"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                aria-pressed={filterStatus === s}
                aria-label={`Filter by status: ${s}`}
                className={`admin-pill capitalize focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${filterStatus === s ? "admin-pill-active" : ""}`}
              >
                <span>{s}</span>
                {s === "new" && newCount > 0 && <span className="ml-2 rounded-full bg-white/25 px-1.5 text-[10px]">{newCount}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="admin-glass overflow-hidden p-0" aria-label="Website Customer Enquiries Table">
        <div className="grid grid-cols-[32px_1fr_140px_116px_110px] gap-4 border-b border-white/70 px-5 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 max-lg:grid-cols-[32px_1fr_116px]">
          <button
            onClick={selectAll}
            aria-pressed={selectedIds.size === filtered.length && filtered.length > 0}
            aria-label="Select all enquiries"
            className="flex size-5 items-center justify-center rounded-md border border-slate-350 bg-white/60 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            {selectedIds.size === filtered.length && filtered.length > 0 && <Check size={12} aria-hidden="true" />}
          </button>
          <span>Name / Message</span>
          <span className="max-lg:hidden">Contact</span>
          <span>Status</span>
          <span className="max-lg:hidden">Date</span>
        </div>
        <div className="divide-y divide-white/55">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <div key={i} className="mx-5 my-4 h-16 animate-pulse rounded-[20px] bg-white/55" aria-hidden="true" />)
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="admin-gradient-icon mb-4 flex size-14 items-center justify-center rounded-[22px]" aria-hidden="true"><MessageSquare size={22} /></div>
              <p className="text-sm font-black text-slate-650">No enquiries found</p>
              <p className="text-xs font-medium text-slate-500">Website submissions will appear here.</p>
            </div>
          ) : (
            filtered.map((enq) => {
              const isSelected = selectedIds.has(enq.id);
              return (
                <EnquiryItemRow
                  key={enq.id}
                  enq={enq}
                  isSelected={isSelected}
                  onToggleSelect={toggleSelect}
                  onOpenDetail={handleOpenDetail}
                  onDeleteTarget={setDeleteTarget}
                  formattedDate={formattedDatesMap[enq.id] ?? ""}
                />
              );
            })
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeEnquiry && (
          <EnquiryPanel
            enquiry={activeEnquiry}
            onClose={() => setActiveEnquiry(null)}
            onDelete={() => setDeleteTarget(activeEnquiry)}
            onStatus={(status) => updateMut.mutate({ id: activeEnquiry.id, status })}
          />
        )}
      </AnimatePresence>
      <Confirm open={!!deleteTarget} title="Delete Enquiry?" body={deleteTarget ? `This enquiry from ${deleteTarget.name} will be permanently deleted.` : ""} loading={deleteMut.isPending} icon={AlertTriangle} onCancel={() => setDeleteTarget(null)} onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget.id)} />
      <Confirm open={bulkDeleteConfirm} title={`Delete ${selectedIds.size} Enquiries?`} body="This cannot be undone." loading={bulkDeleteMut.isPending} icon={Trash2} onCancel={() => setBulkDeleteConfirm(false)} onConfirm={() => bulkDeleteMut.mutate()} />
    </div>
  );
}

const EnquiryPanel = memo(({ enquiry, onClose, onDelete, onStatus }: { enquiry: Enquiry; onClose: () => void; onDelete: () => void; onStatus: (status: Enquiry["status"]) => void }) => {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-white/70 bg-white/82 shadow-2xl backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-panel-header"
        aria-describedby="enquiry-panel-details"
      >
        <div className="flex items-center justify-between border-b border-white/70 px-5 py-4">
          <h3 id="enquiry-panel-header" className="text-base font-black text-slate-950">Enquiry Detail</h3>
          <button
            onClick={onClose}
            aria-label="Close enquiry detail panel"
            title="Close panel"
            className="rounded-2xl p-2 text-slate-400 hover:bg-white/70 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div id="enquiry-panel-details" className="flex-1 space-y-5 overflow-y-auto p-5">
          <div className="flex gap-2" role="group" aria-label="Mark enquiry status">
            {(["new", "read", "resolved"] as const).map((s) => {
              const c = STATUS_CONFIG[s];
              const I = c.icon;
              return (
                <button
                  key={s}
                  onClick={() => onStatus(s)}
                  aria-pressed={enquiry.status === s}
                  aria-label={`Mark as ${c.label}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-black focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${enquiry.status === s ? `${c.bg} ${c.color}` : "bg-white/70 text-slate-405"}`}
                >
                  <I size={11} className="mr-1 inline" aria-hidden="true" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
          <div className="rounded-[24px] border border-white/80 bg-white/65 p-5">
            <h4 className="text-lg font-black text-slate-950">{enquiry.name}</h4>
            <a
              href={`mailto:${enquiry.email}`}
              aria-label={`Email sender at ${enquiry.email}`}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-600 focus-visible:ring-2 focus-visible:ring-[#c9a44c] w-fit"
            >
              <Mail size={14} aria-hidden="true" />
              <span>{enquiry.email}</span>
            </a>
            {enquiry.phone && (
              <a
                href={`tel:${enquiry.phone}`}
                aria-label={`Call sender at ${enquiry.phone}`}
                className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-655 focus-visible:ring-2 focus-visible:ring-[#c9a44c] w-fit"
              >
                <Phone size={14} aria-hidden="true" />
                <span>{enquiry.phone}</span>
              </a>
            )}
            <p className="mt-3 flex items-center gap-1 text-xs font-bold text-slate-450">
              <Clock size={11} aria-hidden="true" />
              <span>{new Date(enquiry.createdAt).toLocaleString("en-IN")}</span>
            </p>
          </div>
          <div>
            <span className="admin-label mb-2 block">Message</span>
            <div className="rounded-[24px] border border-white/80 bg-white/65 p-5 text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{enquiry.message}</div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              href={`mailto:${enquiry.email}?subject=Re: Your Enquiry - Zardosi Atelier`}
              aria-label="Send reply email"
              className="admin-primary-btn py-3 text-center text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
            >
              Reply via Email
            </a>
            {enquiry.phone && (
              <a
                href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}?text=Hello+${encodeURIComponent(enquiry.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send message via WhatsApp"
                className="rounded-[20px] border border-emerald-250 bg-emerald-50 py-3 text-center text-sm font-bold text-emerald-800 focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-white/70 p-5">
          <button
            onClick={onDelete}
            aria-label="Delete this enquiry permanently"
            className="w-full rounded-[20px] border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Trash2 size={14} className="mr-2 inline" aria-hidden="true" />
            <span>Delete Enquiry</span>
          </button>
        </div>
      </motion.div>
    </>
  );
});
EnquiryPanel.displayName = "EnquiryPanel";

function Confirm({ open, title, body, loading, icon: Icon, onCancel, onConfirm }: { open: boolean; title: string; body: string; loading: boolean; icon: typeof AlertTriangle; onCancel: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.94, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 10 }}
            className="admin-glass w-full max-w-sm p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-header"
            aria-describedby="confirm-dialog-description"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-[20px] bg-red-50 text-red-500" aria-hidden="true"><Icon size={20} /></div>
            <h3 id="confirm-dialog-header" className="text-lg font-black text-slate-950">{title}</h3>
            <p id="confirm-dialog-description" className="mt-2 text-sm text-slate-600">{body}</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onCancel}
                className="admin-secondary-btn flex-1 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-[20px] border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
