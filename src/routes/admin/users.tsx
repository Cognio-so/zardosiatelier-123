import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Key, History, UserPlus, Trash2, Laptop, Loader2, X, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getLoginHistory, getAdminUsers, createAdminUser, deleteAdminUser } from "@/lib/admin-data";
import { getStoredPassword } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/users")({ component: UsersAdmin });

const roleLabel: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
};

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

function UsersAdmin() {
  const qc = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"super_admin" | "admin" | "manager">("admin");

  const { data: history = [], isLoading: loadingHistory } = useQuery({ queryKey: ["loginHistory"], queryFn: () => getLoginHistory() });
  const { data: adminUsers = [], isLoading: loadingUsers } = useQuery({ queryKey: ["adminUsers"], queryFn: () => getAdminUsers() });

  const createMut = useMutation({
    mutationFn: (data: { name: string; email: string; role: "super_admin" | "admin" | "manager" }) => createAdminUser({ data: { password: getStoredPassword(), ...data } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["adminUsers"] }); toast.success("Admin user added successfully!"); setShowAddModal(false); setNewName(""); setNewEmail(""); setNewRole("admin"); },
    onError: (err: Error) => toast.error(err.message || "Failed to add admin user"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteAdminUser({ data: { password: getStoredPassword(), id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["adminUsers"] }); toast.success("Admin user access revoked!"); },
    onError: (err: Error) => toast.error(err.message || "Failed to delete admin user"),
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) { toast.error("Please fill all required fields"); return; }
    createMut.mutate({ name: newName.trim(), email: newEmail.trim(), role: newRole });
  };

  function formatDateTime(str: string) {
    return new Date(str).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="admin-page-title">Admin User Management</h2>
          <p className="admin-page-subtitle">Manage administrators, permissions, and security audit trails.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold"><UserPlus size={15} /> Add Admin</button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <section className="admin-glass p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl"><Shield size={18} /></div><div><h3 className="text-lg font-bold text-slate-950">Active Admins</h3><p className="text-sm text-slate-500">{adminUsers.length} authorized dashboard users</p></div></div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {loadingUsers ? Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-36 animate-pulse rounded-[24px] bg-white/55" />) : adminUsers.map((user, index) => (
                <motion.div key={user.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="group rounded-[24px] border border-white/80 bg-white/65 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_24px_70px_rgba(99,102,241,0.14)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-black text-white shadow-lg shadow-blue-500/20">{initials(user.name)}</div>
                      <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="truncate text-sm font-black text-slate-950">{user.name}</p><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${user.role === "super_admin" ? "bg-gradient-to-r from-[#c9a44c] to-[#f2d98b] text-slate-950" : "bg-blue-50 text-blue-700"}`}>{roleLabel[user.role] ?? user.role}</span></div><p className="mt-1 truncate text-xs font-semibold text-slate-500">{user.email}</p><p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Created {new Date(user.createdAt).toLocaleDateString("en-IN")}</p></div>
                    </div>
                    <button disabled={user.role === "super_admin" || deleteMut.isPending} onClick={() => { if (confirm(`Are you sure you want to revoke admin access for ${user.name}?`)) deleteMut.mutate(user.id); }} className="rounded-2xl p-2 text-slate-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-30 group-hover:opacity-100" title="Revoke Access">{deleteMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="admin-glass p-6">
            <div className="mb-4 flex items-center gap-3"><div className="admin-gold-icon flex size-11 items-center justify-center rounded-2xl"><Key size={18} /></div><div><h3 className="text-lg font-bold text-slate-950">Security Controls</h3><p className="text-sm text-slate-500">Credential governance and administrative safety.</p></div></div>
            <div className="rounded-[24px] border border-white/80 bg-white/60 p-5 text-sm leading-relaxed text-slate-600">Authorized personnel session authentication is validated utilizing cryptographic token signatures. All administrative updates are logged. To change the master dashboard credentials, update <code className="rounded-lg bg-slate-950 px-2 py-1 text-xs font-bold text-white">ADMIN_PASSWORD</code> in the deployment environment.</div>
            <button onClick={() => alert("Password changes require updating environment variables on Vercel Dashboard.")} className="admin-secondary-btn mt-4 px-5 py-3 text-sm font-bold">Update Credentials</button>
          </section>
        </div>

        <section className="admin-glass h-fit p-6">
          <div className="mb-5 flex items-center gap-3"><div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl"><History size={18} /></div><div><h3 className="text-lg font-bold text-slate-950">Audit Login History</h3><p className="text-sm text-slate-500">Recent authenticated sessions</p></div></div>
          <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {loadingHistory ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-16 animate-pulse rounded-[20px] bg-white/55" />) : history.length === 0 ? <div className="rounded-[24px] border border-dashed border-slate-200 bg-white/50 p-8 text-center text-sm font-semibold text-slate-400">No login records available</div> : history.map((log) => {
              const isMobile = /mobile/i.test(log.userAgent);
              return <div key={log.id} className="flex items-start gap-3 rounded-[22px] border border-white/80 bg-white/60 p-4 transition hover:bg-white/90"><div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">{isMobile ? <Laptop size={15} className="rotate-90" /> : <Laptop size={15} />}</div><div className="min-w-0"><p className="text-sm font-black text-slate-950">Admin login</p><p className="truncate text-xs font-medium text-slate-500" title={log.userAgent}>{log.userAgent}</p><p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{formatDateTime(log.createdAt)}</p></div></div>;
            })}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.96, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 12 }} className="admin-glass w-full max-w-md overflow-hidden p-0 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/70 px-6 py-5"><div className="flex items-center gap-3"><div className="admin-gradient-icon flex size-10 items-center justify-center rounded-2xl"><Sparkles size={16} /></div><h3 className="text-base font-black text-slate-950">Add New Admin User</h3></div><button onClick={() => setShowAddModal(false)} className="rounded-2xl p-2 text-slate-400 transition hover:bg-white/70 hover:text-slate-950"><X size={16} /></button></div>
              <form onSubmit={handleAddSubmit} className="space-y-4 p-6">
                <label><span className="admin-label mb-2 block">Full Name</span><input required value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Couture Manager" className="admin-input w-full px-4 py-3 text-sm" /></label>
                <label><span className="admin-label mb-2 block">Email Address</span><input type="email" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="atelier@example.com" className="admin-input w-full px-4 py-3 text-sm" /></label>
                <label><span className="admin-label mb-2 block">Access Role</span><select value={newRole} onChange={(e) => setNewRole(e.target.value as typeof newRole)} className="admin-input w-full px-4 py-3 text-sm"><option value="admin">Admin (Manage Data)</option><option value="manager">Manager (Read & Edit Portfolio/Gallery)</option><option value="super_admin">Super Admin (Full Access)</option></select></label>
                <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAddModal(false)} className="admin-secondary-btn flex-1 py-3 text-sm font-bold">Cancel</button><button type="submit" disabled={createMut.isPending} className="admin-primary-btn flex flex-1 items-center justify-center gap-2 py-3 text-sm font-bold">{createMut.isPending ? <Loader2 size={16} className="animate-spin" /> : "Create User"}</button></div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
