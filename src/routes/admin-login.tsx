import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { loginAdmin } from "@/lib/admin-auth";
import { saveSession, loadSession } from "@/lib/admin-auth";
import { addLoginHistory } from "@/lib/admin-data";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const session = loadSession();
    if (session) {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const session = await loginAdmin({ data: { password } });
      saveSession(session);
      // Log the login
      try {
        await addLoginHistory({
          data: {
            password,
            userAgent:
              typeof navigator !== "undefined" ? navigator.userAgent : "Server",
          },
        });
      } catch {
        // Non-critical
      }
      await navigate({ to: "/admin" });
    } catch {
      setError("Invalid password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227] opacity-[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A227] opacity-[0.03] rounded-full blur-[100px]" />
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="w-full max-w-sm relative"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C9A227] mb-5 shadow-[0_0_40px_rgba(201,162,39,0.3)]"
          >
            <Sparkles size={24} className="text-black" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1
              className="text-white text-2xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Zardosi Atelier
            </h1>
            <p className="text-[#555] text-xs uppercase tracking-[0.25em] mt-1">
              Admin Panel
            </p>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="bg-[#111111] border border-[#222] rounded-2xl p-7 shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
        >
          <h2 className="text-white font-semibold text-lg mb-1">
            Welcome back
          </h2>
          <p className="text-[#555] text-sm mb-6">
            Enter your admin password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password input */}
            <div>
              <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/60 focus:ring-1 focus:ring-[#C9A227]/20 transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888] transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5"
                >
                  <AlertCircle size={14} className="text-red-400 shrink-0" />
                  <p className="text-red-400 text-xs">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full py-3 rounded-xl bg-[#C9A227] text-black font-semibold text-sm hover:bg-[#B8911E] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(201,162,39,0.3)] hover:shadow-[0_4px_30px_rgba(201,162,39,0.4)]"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-[#333] text-xs mt-6">
          Zardosi Atelier Admin v1.0 · Confidential
        </p>
      </motion.div>
    </div>
  );
}
