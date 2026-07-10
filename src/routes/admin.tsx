import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Trash2,
  Edit3,
  Check,
  X,
  LogOut,
  Eye,
  ImageIcon,
  AlertCircle,
  Loader2,
  Lock,
  LayoutGrid,
  Plus,
} from "lucide-react";
import {
  uploadPortfolioImage,
  deletePortfolioItem,
  updatePortfolioItem,
  getPortfolioItems,
  type PortfolioItem,
} from "@/lib/portfolio-admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Zardosi Atelier" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

/* ── helpers ──────────────────────────────────────────── */
const PASS_KEY = "za_admin_session";

function saveSession(pass: string) {
  sessionStorage.setItem(PASS_KEY, pass);
}
function loadSession(): string {
  return sessionStorage.getItem(PASS_KEY) ?? "";
}
function clearSession() {
  sessionStorage.removeItem(PASS_KEY);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Ambient Background Component ─────────────────────── */
function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0705]">
      {/* Dynamic Gold Radial Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px]"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 70%)",
        }}
      />
      {/* Delicate overlay grid / pattern texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

/* ── Login Screen ─────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (pass: string) => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await getPortfolioItems();
      if (!pass.trim()) {
        setError("Password required");
        setLoading(false);
        return;
      }
      saveSession(pass);
      onLogin(pass);
    } catch {
      setError("Invalid password or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <AmbientBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md p-10 backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_24px_50px_rgba(0,0,0,0.5)] rounded-2xl"
      >
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C9A84C]/30" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C9A84C]/30" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C9A84C]/30" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C9A84C]/30" />

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-[#C9A84C]/45" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A84C]" />
            <div className="h-[1px] w-8 bg-[#C9A84C]/45" />
          </div>
          <h1 className="font-serif text-4xl text-white tracking-wide">Zardosi Atelier</h1>
          <p className="mt-2.5 text-[10px] text-white/40 uppercase tracking-[0.4em] font-medium">
            Secure Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[9px] font-bold uppercase tracking-[0.35em] text-[#C9A84C] opacity-80">
              Admin Password
            </label>
            <div className="relative group">
              <Lock
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/40 group-focus-within:text-[#C9A84C] transition-colors"
              />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full pl-11 pr-4 py-3.5 bg-black/30 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:bg-black/50"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 text-[12px] bg-red-950/20 border border-red-900/30 p-3 rounded-lg"
            >
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="relative overflow-hidden w-full py-4 text-[10px] font-bold uppercase tracking-[0.35em] transition-all flex items-center justify-center gap-2 rounded-lg cursor-pointer shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E6C575 0%, #C9A84C 100%)",
              color: "#120c09",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {/* Shiny hover effect overlay */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shine_1.5s_infinite]" />
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            {loading ? "Verifying..." : "Enter Admin Panel"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/35 font-medium tracking-wide">
          Default password is set in <code className="text-[#C9A84C]/70">.env → ADMIN_PASSWORD</code>
        </p>
      </motion.div>
    </div>
  );
}

/* ── Upload Card ──────────────────────────────────────── */
function UploadCard({
  password,
  onUploaded,
}: {
  password: string;
  onUploaded: (item: PortfolioItem) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = (f: File) => {
    if (!["image/png", "image/jpeg"].includes(f.type)) {
      return "Only PNG and JPG files are allowed.";
    }
    if (f.size > 5 * 1024 * 1024) {
      return "File must be under 5 MB.";
    }
    return null;
  };

  const handleFile = (f: File) => {
    const err = validate(f);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setFile(f);
    fileToBase64(f).then(setPreview);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleUpload = async () => {
    if (!file || !caption.trim() || !tag.trim()) {
      setError("Please fill in all fields and select an image.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const item = await uploadPortfolioImage({
        data: {
          password,
          filename: file.name,
          base64,
          caption: caption.trim(),
          tag: tag.trim(),
        },
      });
      onUploaded(item);
      setFile(null);
      setPreview(null);
      setCaption("");
      setTag("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      if (msg === "Unauthorized") {
        setError("Wrong password. Please log in again.");
      } else if (msg.includes("BLOB_READ_WRITE_TOKEN")) {
        setError(
          "⚠️ Vercel Blob not configured. Add BLOB_READ_WRITE_TOKEN to your .env.local and Vercel dashboard."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="backdrop-blur-md bg-white/[0.02] border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.3)] rounded-2xl p-8 max-w-xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 flex items-center justify-center border border-[#C9A84C]/20">
          <Plus size={16} className="text-[#C9A84C]" />
        </div>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.35em] text-white/90">
          Upload New Image
        </h3>
      </div>

      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        whileHover={{ scale: 1.005, borderColor: "rgba(201,168,76,0.4)" }}
        animate={{
          scale: dragging ? 1.02 : 1,
          borderColor: dragging ? "rgba(201,168,76,0.6)" : "rgba(255,255,255,0.08)",
          backgroundColor: dragging ? "rgba(201,168,76,0.05)" : "rgba(0,0,0,0.15)",
        }}
        className="relative cursor-pointer flex flex-col items-center justify-center min-h-[220px] transition-all duration-300 border-2 border-dashed rounded-xl group overflow-hidden"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {preview ? (
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 max-w-full object-contain rounded-lg shadow-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setPreview(null);
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white/80 transition-colors border border-white/10"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="text-center p-6">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block mb-3.5"
            >
              <ImageIcon size={36} className="text-[#C9A84C] opacity-80" />
            </motion.div>
            <p className="text-[13px] font-medium text-white/80">
              Drag &amp; drop or <span className="text-[#C9A84C] font-semibold hover:underline">browse</span>
            </p>
            <p className="text-[10px] text-white/40 mt-1.5 uppercase tracking-wider font-semibold">
              PNG or JPG — max 5 MB
            </p>
          </div>
        )}
      </motion.div>

      {/* Fields */}
      <div className="mt-7 space-y-5">
        <div className="space-y-1.5">
          <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] opacity-85">
            Caption *
          </label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Zardosi Gold Thread Macro"
            maxLength={120}
            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#C9A84C]/50 transition duration-300"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] opacity-85">
            Tag *
          </label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Couture · Zardosi"
            maxLength={60}
            className="w-full bg-white/[0.02] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#C9A84C]/50 transition duration-300"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-start gap-2.5 text-red-400 text-[12px] bg-red-950/20 border border-red-900/30 p-4 rounded-xl"
        >
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 flex items-center gap-2 text-green-400 text-[12px] bg-green-950/20 border border-green-900/30 p-4 rounded-xl"
        >
          <Check size={15} className="shrink-0" />
          <span>Image uploaded successfully!</span>
        </motion.div>
      )}

      <motion.button
        whileHover={file ? { scale: 1.01 } : {}}
        whileTap={file ? { scale: 0.99 } : {}}
        onClick={handleUpload}
        disabled={loading || !file}
        className="relative overflow-hidden mt-7 w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 rounded-xl transition-all duration-300 shadow-md cursor-pointer"
        style={{
          background: !file
            ? "rgba(255,255,255,0.03)"
            : "linear-gradient(135deg, #E6C575 0%, #C9A84C 100%)",
          color: !file ? "rgba(255,255,255,0.2)" : "#120c09",
          border: !file ? "1px solid rgba(255,255,255,0.05)" : "none",
          cursor: !file ? "not-allowed" : "pointer",
        }}
      >
        {file && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shine_1.5s_infinite]" />
        )}
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        {loading ? "Uploading..." : "Upload to Portfolio"}
      </motion.button>
    </motion.div>
  );
}

/* ── Image Card ───────────────────────────────────────── */
function ImageCard({
  item,
  password,
  onDelete,
  onUpdate,
  index,
}: {
  item: PortfolioItem;
  password: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, caption: string, tag: string) => void;
  index: number;
}) {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(item.caption);
  const [tag, setTag] = useState(item.tag);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      await updatePortfolioItem({
        data: { password, id: item.id, caption, tag },
      });
      onUpdate(item.id, caption, tag);
      setEditing(false);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${item.caption}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await deletePortfolioItem({ data: { password, id: item.id, url: item.url } });
      onDelete(item.id);
    } catch (e: unknown) {
      console.error(e);
      setDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="relative group overflow-hidden rounded-xl backdrop-blur-md bg-white/[0.02] border border-white/[0.08] shadow-lg hover:border-[#C9A84C]/35 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={item.url}
          alt={item.caption}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Overlay controls */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent">
        {!editing ? (
          <>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] truncate mb-0.5">
              {item.tag}
            </p>
            <p className="text-white text-[13px] font-semibold truncate leading-tight">
              {item.caption}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition rounded-md border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#120c09] cursor-pointer"
              >
                <Edit3 size={10} /> Edit
              </button>
              <button
                onClick={remove}
                disabled={deleting}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition rounded-md border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                {deleting ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
                {deleting ? "..." : "Delete"}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-2 p-1" onClick={(e) => e.stopPropagation()}>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-black/60 text-white text-xs px-2.5 py-1.5 outline-none rounded border border-white/10 focus:border-[#C9A84C]/50"
              placeholder="Caption"
            />
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-black/60 text-white text-xs px-2.5 py-1.5 outline-none rounded border border-white/10 focus:border-[#C9A84C]/50"
              placeholder="Tag"
            />
            <div className="flex gap-2 pt-1">
              <button
                onClick={save}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded bg-[#C9A84C] text-[#120c09] hover:bg-[#b0913e] cursor-pointer"
              >
                {loading ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setCaption(item.caption);
                  setTag(item.tag);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded border border-white/20 text-white hover:bg-white/10 cursor-pointer"
              >
                <X size={10} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Date badge */}
      <div
        className="absolute top-2 right-2 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest rounded-md border border-white/5"
        style={{
          background: "rgba(10,8,6,0.75)",
          color: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        {new Date(item.uploadedAt).toLocaleDateString("en-IN")}
      </div>
    </motion.div>
  );
}

/* ── Dashboard ────────────────────────────────────────── */
function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"upload" | "gallery">("gallery");

  useEffect(() => {
    getPortfolioItems()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleUploaded = (item: PortfolioItem) => {
    setItems((prev) => [item, ...prev]);
    setTab("gallery");
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleUpdate = (id: string, caption: string, tag: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, caption, tag } : it))
    );
  };

  return (
    <div className="relative min-h-screen pb-16 text-white overflow-hidden">
      <AmbientBackground />

      {/* Navigation Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 backdrop-blur-lg bg-black/60 border-b border-white/[0.06] shadow-md"
      >
        {/* Glow underline */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/35 to-transparent" />

        <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 sm:px-10 h-20">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-wide text-white font-normal">
              Zardosi <span className="italic text-[#C9A84C]">Atelier</span>
            </span>
            <div className="h-4 w-[1px] bg-white/20" />
            <span className="text-[8px] font-bold uppercase tracking-[0.45em] px-2.5 py-1 border border-[#C9A84C]/25 text-[#C9A84C] rounded-md bg-[#C9A84C]/5">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/portfolio"
              target="_blank"
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-[#C9A84C] transition duration-300"
            >
              <Eye size={13} className="text-[#C9A84C]" /> View Portfolio
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-red-400 transition duration-300 cursor-pointer"
            >
              <LogOut size={13} className="text-red-400/70" /> Logout
            </button>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-10 py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal tracking-wide">
              Portfolio <span className="italic">Manager.</span>
            </h2>
            <p className="mt-2.5 text-[12px] text-white/50 font-medium tracking-wide">
              {items.length} dynamic swatch{items.length !== 1 ? "es" : ""} active · changes show up on{" "}
              <Link to="/portfolio" className="text-[#C9A84C] hover:underline font-semibold">
                /portfolio
              </Link>{" "}
              instantly
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-10 border-b border-white/[0.08] relative">
          {[
            { id: "gallery", label: "Gallery Archive", icon: LayoutGrid },
            { id: "upload", label: "Upload New Swatch", icon: Upload },
          ].map(({ id, label, icon: Icon }) => {
            const isActive = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id as "upload" | "gallery")}
                className="flex items-center gap-2.5 px-6 py-4 text-[9px] font-bold uppercase tracking-[0.35em] transition duration-300 relative cursor-pointer"
                style={{ color: isActive ? "#C9A84C" : "rgba(255,255,255,0.4)" }}
              >
                <Icon size={13} />
                {label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A84C]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic content rendering with slide transition */}
        <AnimatePresence mode="wait">
          {tab === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <UploadCard password={password} onUploaded={handleUploaded} />
            </motion.div>
          )}

          {tab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]/70">
                    Loading swatches
                  </span>
                </div>
              ) : items.length === 0 ? (
                /* Redesigned Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 max-w-2xl mx-auto backdrop-blur-md bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 shadow-lg"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-6"
                  >
                    <ImageIcon size={28} className="text-[#C9A84C]" />
                  </motion.div>
                  <h3 className="font-serif text-2xl text-white mb-2 tracking-wide font-normal">
                    No images uploaded yet
                  </h3>
                  <p className="text-[13px] text-white/50 max-w-sm mx-auto mb-8 font-medium">
                    Upload images to have them appear dynamically in the Zardosi Atelier portfolio gallery.
                  </p>

                  {/* Redesigned Glass Warning Box */}
                  <div className="text-left p-6 backdrop-blur-md bg-[#C9A84C]/[0.02] border border-[#C9A84C]/15 rounded-xl max-w-md mx-auto relative overflow-hidden">
                    <div className="flex gap-3.5">
                      <AlertCircle size={20} className="text-[#C9A84C] shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">
                          Configuration Setup Required
                        </p>
                        <p className="text-[12px] text-white/60 leading-relaxed font-medium">
                          Add the <code className="bg-white/10 px-1 py-0.5 rounded text-white font-mono text-[10px]">BLOB_READ_WRITE_TOKEN</code> to your local environment file and Vercel dashboard.
                        </p>
                        <p className="text-[11px] text-[#C9A84C]/70 pt-2 font-semibold">
                          Vercel Dashboard &rarr; Storage &rarr; Create Blob Store &rarr; Copy token
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setTab("upload")}
                    className="relative overflow-hidden mt-8 inline-flex items-center gap-2.5 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-lg cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #E6C575 0%, #C9A84C 100%)",
                      color: "#120c09",
                    }}
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shine_1.5s_infinite]" />
                    <Upload size={13} /> Upload First Image
                  </motion.button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {items.map((item, idx) => (
                    <ImageCard
                      key={item.id}
                      item={item}
                      password={password}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      index={idx}
                    />
                  ))}
                  {/* Quick upload card placeholder */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(items.length * 0.05, 0.3) }}
                    whileHover={{ scale: 1.01, borderColor: "rgba(201,168,76,0.5)", backgroundColor: "rgba(201,168,76,0.03)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setTab("upload")}
                    className="aspect-[4/3] sm:h-auto flex flex-col items-center justify-center gap-2 rounded-xl transition-all duration-300 border border-dashed border-white/10 hover:border-[#C9A84C]/40 bg-white/[0.01] hover:bg-[#C9A84C]/5 text-[#C9A84C] cursor-pointer"
                  >
                    <Plus size={22} className="opacity-80" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Add Image</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────── */
function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadSession();
    if (saved) setPassword(saved);
  }, []);

  const handleLogin = (pass: string) => {
    setPassword(pass);
  };

  const handleLogout = () => {
    clearSession();
    setPassword(null);
  };

  if (!password) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard password={password} onLogout={handleLogout} />;
}
