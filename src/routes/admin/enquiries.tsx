import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  MessageSquare,
  Search,
  X,
  Check,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  AlertTriangle,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  bulkDeleteEnquiries,
  type Enquiry,
} from "@/lib/admin-data";

export const Route = createFileRoute("/admin/enquiries")({
  component: EnquiriesAdmin,
});

const PASS = "zardosi@admin2024";

const STATUS_CONFIG = {
  new: {
    label: "New",
    color: "#C9A227",
    bg: "rgba(201,162,39,0.1)",
    icon: AlertCircle,
  },
  read: {
    label: "Read",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    icon: MessageSquare,
  },
  resolved: {
    label: "Resolved",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    icon: CheckCircle2,
  },
};

function EnquiriesAdmin() {
  const qc = useQueryClient();
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => getEnquiries(),
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "read" | "resolved">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  const updateMut = useMutation({
    mutationFn: (vars: { id: string; status: Enquiry["status"] }) =>
      updateEnquiryStatus({ data: { password: PASS, ...vars } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Status updated");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteEnquiry({ data: { password: PASS, id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry deleted");
      setDeleteTarget(null);
      if (activeEnquiry?.id === deleteTarget?.id) setActiveEnquiry(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const bulkDeleteMut = useMutation({
    mutationFn: () =>
      bulkDeleteEnquiries({ data: { password: PASS, ids: Array.from(selectedIds) } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success(`${selectedIds.size} enquiries deleted`);
      setSelectedIds(new Set());
      setBulkDeleteConfirm(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function setSelected(fn: (prev: Set<string>) => Set<string>) {
    setSelectedIds(fn);
  }

  function formatDate(str: string) {
    const d = new Date(str);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / (1000 * 60 * 60));
    const diffD = Math.floor(diffH / 24);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function exportCsv() {
    const rows = [
      ["Name", "Email", "Phone", "Message", "Status", "Date"],
      ...enquiries.map((e) => [
        e.name,
        e.email,
        e.phone,
        `"${e.message.replace(/"/g, '""')}"`,
        e.status,
        new Date(e.createdAt).toLocaleDateString("en-IN"),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  }

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Enquiries
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            {enquiries.length} total · {newCount > 0 && <span className="text-[#C9A227]">{newCount} new</span>}
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
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2a2a2a] text-[#666] text-sm hover:border-[#333] hover:text-white transition-all"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative max-w-sm flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, message..."
            className="w-full bg-[#111] border border-[#222] rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "new", "read", "resolved"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200"
              style={{
                background: filterStatus === s ? "rgba(201,162,39,0.15)" : "#111",
                color: filterStatus === s ? "#C9A227" : "#555",
                border: filterStatus === s ? "1px solid rgba(201,162,39,0.3)" : "1px solid #1e1e1e",
              }}
            >
              {s}
              {s === "new" && newCount > 0 && (
                <span className="ml-1 px-1 bg-[#C9A227] text-black text-[9px] rounded font-bold">
                  {newCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3.5 border-b border-[#1a1a1a] text-[#444] text-xs uppercase tracking-wider">
          <div className="w-5">
            <button
              onClick={() => {
                if (selectedIds.size === filtered.length) setSelectedIds(new Set());
                else setSelectedIds(new Set(filtered.map((e) => e.id)));
              }}
              className="w-4 h-4 rounded border border-[#333] flex items-center justify-center hover:border-[#C9A227] transition-colors"
              style={{
                background: selectedIds.size === filtered.length && filtered.length > 0 ? "#C9A227" : "transparent",
              }}
            >
              {selectedIds.size === filtered.length && filtered.length > 0 && (
                <Check size={10} className="text-black" />
              )}
            </button>
          </div>
          <div className="flex-1">Name / Message</div>
          <div className="w-28 hidden md:block">Contact</div>
          <div className="w-24 hidden sm:block">Status</div>
          <div className="w-24 hidden lg:block">Date</div>
          <div className="w-28">Actions</div>
        </div>

        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[#0f0f0f] animate-pulse">
              <div className="w-5 h-4 bg-[#1a1a1a] rounded" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-[#1a1a1a] rounded w-1/4" />
                <div className="h-2 bg-[#1a1a1a] rounded w-3/4" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mb-4">
              <MessageSquare size={24} className="text-[#333]" />
            </div>
            <p className="text-[#444] text-sm font-medium mb-1">No enquiries</p>
            <p className="text-[#333] text-xs">
              Enquiries from your website will appear here
            </p>
          </div>
        ) : (
          filtered.map((enq, i) => {
            const cfg = STATUS_CONFIG[enq.status];
            const isSelected = selectedIds.has(enq.id);
            return (
              <motion.div
                key={enq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-4 px-5 py-4 border-b border-[#0f0f0f] hover:bg-[#0d0d0d] transition-colors cursor-pointer"
                onClick={() => {
                  setActiveEnquiry(enq);
                  if (enq.status === "new") {
                    updateMut.mutate({ id: enq.id, status: "read" });
                  }
                }}
              >
                <div className="w-5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleSelect(enq.id)}
                    className="w-4 h-4 rounded border border-[#333] flex items-center justify-center hover:border-[#C9A227] transition-colors"
                    style={{ background: isSelected ? "#C9A227" : "transparent" }}
                  >
                    {isSelected && <Check size={10} className="text-black" />}
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white text-sm font-medium">{enq.name}</span>
                    {enq.status === "new" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] shrink-0" />
                    )}
                  </div>
                  <p className="text-[#444] text-xs truncate">{enq.message}</p>
                </div>
                <div className="w-28 hidden md:block">
                  <p className="text-[#555] text-xs truncate">{enq.email}</p>
                  {enq.phone && (
                    <p className="text-[#333] text-[11px] truncate">{enq.phone}</p>
                  )}
                </div>
                <div className="w-24 hidden sm:block">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wide"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <div className="w-24 hidden lg:block">
                  <span className="text-[#333] text-xs flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(enq.createdAt)}
                  </span>
                </div>
                <div className="w-28 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => updateMut.mutate({ id: enq.id, status: "resolved" })}
                    disabled={enq.status === "resolved"}
                    className="p-1.5 rounded-lg text-[#333] hover:text-green-400 hover:bg-green-500/10 disabled:opacity-30 transition-all"
                    title="Mark Resolved"
                  >
                    <CheckCircle2 size={14} />
                  </button>
                  <button
                    onClick={() => updateMut.mutate({ id: enq.id, status: "new" })}
                    disabled={enq.status === "new"}
                    className="p-1.5 rounded-lg text-[#333] hover:text-[#C9A227] hover:bg-[#C9A227]/10 disabled:opacity-30 transition-all"
                    title="Mark New"
                  >
                    <AlertCircle size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(enq)}
                    className="p-1.5 rounded-lg text-[#333] hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Detail Slide-Over */}
      <AnimatePresence>
        {activeEnquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveEnquiry(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#111] border-l border-[#2a2a2a] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
                <h3 className="text-white font-semibold text-base">Enquiry Detail</h3>
                <button
                  onClick={() => setActiveEnquiry(null)}
                  className="w-8 h-8 rounded-lg border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white transition-all"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Status */}
                <div className="flex items-center gap-2">
                  {(["new", "read", "resolved"] as const).map((s) => {
                    const c = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() =>
                          updateMut.mutate({ id: activeEnquiry.id, status: s })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border"
                        style={{
                          background:
                            activeEnquiry.status === s ? c.bg : "transparent",
                          color: activeEnquiry.status === s ? c.color : "#444",
                          borderColor:
                            activeEnquiry.status === s
                              ? c.color + "40"
                              : "#2a2a2a",
                        }}
                      >
                        <c.icon size={11} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sender info */}
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4 space-y-2">
                  <h4 className="text-white font-semibold text-base">
                    {activeEnquiry.name}
                  </h4>
                  <a
                    href={`mailto:${activeEnquiry.email}`}
                    className="flex items-center gap-2 text-[#C9A227] text-sm hover:underline"
                  >
                    <Mail size={13} />
                    {activeEnquiry.email}
                  </a>
                  {activeEnquiry.phone && (
                    <a
                      href={`tel:${activeEnquiry.phone}`}
                      className="flex items-center gap-2 text-[#666] text-sm hover:text-white transition-colors"
                    >
                      <Phone size={13} />
                      {activeEnquiry.phone}
                    </a>
                  )}
                  <p className="text-[#333] text-xs flex items-center gap-1 mt-2">
                    <Clock size={10} />
                    {new Date(activeEnquiry.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[#555] text-xs uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-4">
                    <p className="text-[#aaa] text-sm leading-relaxed whitespace-pre-wrap">
                      {activeEnquiry.message}
                    </p>
                  </div>
                </div>

                {/* Quick reply shortcuts */}
                <div>
                  <label className="block text-[#555] text-xs uppercase tracking-wider mb-2">
                    Quick Actions
                  </label>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${activeEnquiry.email}?subject=Re: Your Enquiry — Zardosi Atelier`}
                      className="flex-1 py-2.5 rounded-xl bg-[#C9A227] text-black text-xs font-semibold text-center hover:bg-[#B8911E] transition-colors"
                    >
                      Reply via Email
                    </a>
                    {activeEnquiry.phone && (
                      <a
                        href={`https://wa.me/${activeEnquiry.phone.replace(/\D/g, "")}?text=Hello+${encodeURIComponent(activeEnquiry.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-green-600/20 border border-green-600/30 text-green-400 text-xs font-semibold text-center hover:bg-green-600/30 transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-[#1a1a1a]">
                <button
                  onClick={() => setDeleteTarget(activeEnquiry)}
                  className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={14} />
                  Delete Enquiry
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
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
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
              <h3 className="text-white font-semibold text-base mb-2">
                Delete Enquiry?
              </h3>
              <p className="text-[#555] text-sm mb-5">
                This enquiry from <strong className="text-white">{deleteTarget.name}</strong> will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMut.mutate(deleteTarget.id)}
                  disabled={deleteMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm flex items-center justify-center gap-2"
                >
                  {deleteMut.isPending ? <Loader2 size={13} className="animate-spin" /> : "Delete"}
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
                Delete {selectedIds.size} Enquiries?
              </h3>
              <p className="text-[#555] text-sm mb-5">This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBulkDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => bulkDeleteMut.mutate()}
                  disabled={bulkDeleteMut.isPending}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm flex items-center justify-center gap-2"
                >
                  {bulkDeleteMut.isPending ? <Loader2 size={13} className="animate-spin" /> : "Delete All"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
