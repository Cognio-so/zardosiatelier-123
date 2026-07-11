import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, Key, History, UserPlus, Trash2, Cpu, Laptop, Globe } from "lucide-react";
import { getLoginHistory } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/users")({
  component: UsersAdmin,
});

function UsersAdmin() {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["loginHistory"],
    queryFn: () => getLoginHistory(),
  });

  // Mock list of admin users for UX demonstration
  const adminUsers = [
    {
      id: "usr_1",
      email: "hello@zardosiatelier.com",
      name: "Zardosi Superadmin",
      role: "super_admin",
      createdAt: "2025-07-01T12:00:00Z",
      status: "active",
    },
    {
      id: "usr_2",
      email: "atelier.embroidery@zardosi.com",
      name: "Couture Manager",
      role: "admin",
      createdAt: "2025-07-05T08:30:00Z",
      status: "active",
    }
  ];

  function formatDateTime(str: string) {
    return new Date(str).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-full">
      {/* Header */}
      <div>
        <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Admin User Management
        </h2>
        <p className="text-[#555] text-sm mt-0.5">
          Manage system administrators, permissions, and security logs
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: Admin List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#C9A227]" />
                <h3 className="text-white font-medium text-sm">Active Admins</h3>
              </div>
              <button
                onClick={() => alert("Creating new administrators is restricted to Superadmin on Vercel deployment.")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9A227] text-black text-xs font-semibold hover:bg-[#B8911E] transition-colors"
              >
                <UserPlus size={12} />
                Add Admin
              </button>
            </div>

            <div className="divide-y divide-[#1a1a1a]">
              {adminUsers.map((user) => (
                <div key={user.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium">{user.name}</span>
                      <span
                        className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: user.role === "super_admin" ? "rgba(201,162,39,0.12)" : "rgba(255,255,255,0.05)",
                          color: user.role === "super_admin" ? "#C9A227" : "#888",
                          border: user.role === "super_admin" ? "1px solid rgba(201,162,39,0.2)" : "1px solid rgba(255,255,255,0.1)"
                        }}
                      >
                        {user.role.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-[#555] text-xs mt-0.5">{user.email}</p>
                    <p className="text-[#333] text-[10px] mt-1">Created on {new Date(user.createdAt).toLocaleDateString("en-IN")}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={user.role === "super_admin"}
                      onClick={() => alert("Cannot delete the primary Superadmin.")}
                      className="p-1.5 rounded-lg text-[#333] hover:text-red-400 hover:bg-red-500/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#333] transition-all"
                      title="Revoke Access"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Security Info */}
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Key size={16} className="text-[#C9A227]" />
              <h3 className="text-white font-medium text-sm">Security Controls</h3>
            </div>
            <p className="text-[#555] text-xs leading-relaxed mb-4">
              Authorized personnel session authentication is validated utilizing cryptographic token signatures.
              All administrative updates are logged. To change the master dashboard credentials, update the corresponding environment variable <code className="text-white font-mono bg-[#0d0d0d] px-1.5 py-0.5 rounded text-[11px]">ADMIN_PASSWORD</code>.
            </p>
            <button
              onClick={() => alert("Password changes require updating environment variables on Vercel Dashboard.")}
              className="px-4 py-2 rounded-xl border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#333] text-xs font-semibold transition-all"
            >
              Update Credentials
            </button>
          </div>
        </div>

        {/* Right column: Login History / Activity Feed */}
        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <History size={16} className="text-[#C9A227]" />
              <h3 className="text-white font-medium text-sm">Audit Login History</h3>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a]" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
                      <div className="h-2 bg-[#1a1a1a] rounded w-2/3" />
                    </div>
                  </div>
                ))
              ) : history.length === 0 ? (
                <p className="text-[#333] text-xs text-center py-6">No login records available</p>
              ) : (
                history.map((log) => {
                  const isMobile = /mobile/i.test(log.userAgent);
                  return (
                    <div key={log.id} className="flex items-start gap-3 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-[#0d0d0d] border border-[#1e1e1e] flex items-center justify-center text-[#555] shrink-0">
                        {isMobile ? <Laptop size={13} className="rotate-90" /> : <Laptop size={13} />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-medium truncate">
                          Admin login
                        </p>
                        <p className="text-[#444] text-[10px] truncate" title={log.userAgent}>
                          {log.userAgent}
                        </p>
                        <p className="text-[#333] text-[9px] mt-0.5">
                          {formatDateTime(log.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
