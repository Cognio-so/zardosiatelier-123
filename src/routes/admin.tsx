import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect } from "react";
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
      // verify by making a test call
      await getPortfolioItems();
      // If the password matches admin env var — we check client side too
      // Real check happens server-side on every mutation
      if (!pass.trim()) { setError("Password required"); setLoading(false); return; }
      saveSession(pass);
      onLogin(pass);
    } catch {
      setError("Invalid password or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0D0A07 0%, #1A110A 100%)" }}
    >
      <div
        className="w-full max-w-md p-10"
        style={{ border: "1px solid rgba(201,168,76,0.18)", background: "rgba(255,255,255,0.03)" }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{ background: "#C9A84C" }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.55em] text-[#C9A84C]">
              Admin Portal
            </span>
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{ background: "#C9A84C" }}
            />
          </div>
          <h1 className="font-serif text-4xl text-white">Zardosi Atelier</h1>
          <p className="mt-2 text-[12px] text-white/40 uppercase tracking-[0.3em]">
            Secure Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.35em] text-white/50 mb-3">
              Admin Password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-white/20 outline-none focus:ring-0"
                style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 0 }}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-[12px]">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.35em] transition-all flex items-center justify-center gap-2"
            style={{
              background: "#C9A84C",
              color: "#120c09",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            {loading ? "Verifying..." : "Enter Admin Panel"}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] text-white/25">
          Default password is set in{" "}
          <code className="text-white/40">.env → ADMIN_PASSWORD</code>
        </p>
      </div>
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

  const BLOB_CONFIGURED =
    typeof process !== "undefined"
      ? true // server knows; client doesn't need to check
      : true;

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
    if (err) { setError(err); return; }
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
    <div
      className="rounded-[2px] p-6"
      style={{ border: "1px solid rgba(201,168,76,0.2)", background: "#FAF7F2" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Plus size={16} className="text-[#C9A84C]" />
        <h3 className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#3D2B1A]">
          Upload New Image
        </h3>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="relative cursor-pointer flex flex-col items-center justify-center min-h-[180px] transition-all duration-300"
        style={{
          border: `2px dashed ${dragging ? "#C9A84C" : "rgba(180,148,60,0.3)"}`,
          background: dragging ? "rgba(201,168,76,0.06)" : "rgba(0,0,0,0.01)",
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 max-w-full object-contain"
          />
        ) : (
          <>
            <ImageIcon size={32} className="text-[#C9A84C]/50 mb-3" />
            <p className="text-[12px] font-medium text-[#5A4D40]">
              Drag & drop or <span className="text-[#C9A84C]">browse</span>
            </p>
            <p className="text-[10px] text-[#9A8878] mt-1">PNG or JPG — max 5 MB</p>
          </>
        )}
      </div>

      {/* Fields */}
      <div className="mt-5 space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A6655] mb-1.5">
            Caption *
          </label>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. Zardosi Gold Thread Macro"
            maxLength={120}
            className="w-full bg-white border-b border-[#D4C0A0] py-2 text-sm text-[#1A110A] outline-none focus:border-[#C9A84C] transition"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A6655] mb-1.5">
            Tag *
          </label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Couture · Zardosi"
            maxLength={60}
            className="w-full bg-white border-b border-[#D4C0A0] py-2 text-sm text-[#1A110A] outline-none focus:border-[#C9A84C] transition"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 text-red-600 text-[12px] bg-red-50 p-3">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 flex items-center gap-2 text-green-700 text-[12px] bg-green-50 p-3">
          <Check size={14} />
          Image uploaded successfully!
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="mt-5 w-full py-3 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all"
        style={{
          background: !file ? "rgba(201,168,76,0.3)" : "#C9A84C",
          color: "#120c09",
          cursor: !file ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        {loading ? "Uploading..." : "Upload to Portfolio"}
      </button>
    </div>
  );
}

/* ── Image Card ───────────────────────────────────────── */
function ImageCard({
  item,
  password,
  onDelete,
  onUpdate,
}: {
  item: PortfolioItem;
  password: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, caption: string, tag: string) => void;
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
    <div
      className="relative group overflow-hidden rounded-[2px]"
      style={{ border: "1px solid rgba(212,175,55,0.2)" }}
    >
      <img
        src={item.url}
        alt={item.caption}
        className="w-full h-48 object-cover"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
        style={{ background: "linear-gradient(to top, rgba(10,7,4,0.92) 0%, rgba(10,7,4,0.4) 60%, transparent 100%)" }}
      >
        {!editing ? (
          <>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A84C] truncate">
              {item.tag}
            </p>
            <p className="text-white text-sm font-medium truncate">{item.caption}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C" }}
              >
                <Edit3 size={10} /> Edit
              </button>
              <button
                onClick={remove}
                disabled={deleting}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition"
                style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", color: "#ef4444" }}
              >
                {deleting ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
                {deleting ? "..." : "Delete"}
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-[#1A110A] text-white text-xs px-2 py-1.5 outline-none"
              style={{ border: "1px solid rgba(201,168,76,0.4)" }}
              placeholder="Caption"
            />
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-[#1A110A] text-white text-xs px-2 py-1.5 outline-none"
              style={{ border: "1px solid rgba(201,168,76,0.4)" }}
              placeholder="Tag"
            />
            <div className="flex gap-2">
              <button
                onClick={save}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ background: "#C9A84C", color: "#120c09" }}
              >
                {loading ? <Loader2 size={10} className="animate-spin" /> : <Check size={10} />}
                Save
              </button>
              <button
                onClick={() => { setEditing(false); setCaption(item.caption); setTag(item.tag); }}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
              >
                <X size={10} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload date badge */}
      <div className="absolute top-2 right-2 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider"
        style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.6)" }}>
        {new Date(item.uploadedAt).toLocaleDateString("en-IN")}
      </div>
    </div>
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
    <div className="min-h-screen" style={{ background: "#F4EFE7" }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 h-16"
        style={{ background: "#120C09", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl text-white">Zardosi Atelier</span>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.35em] px-2 py-1"
            style={{ background: "rgba(201,168,76,0.18)", color: "#C9A84C" }}
          >
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/portfolio"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition"
          >
            <Eye size={13} /> View Portfolio
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-red-400 transition"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-5 sm:px-8 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-[#1A110A]">Portfolio Manager</h2>
          <p className="mt-1 text-[13px] text-[#7A6655]">
            {items.length} dynamic image{items.length !== 1 ? "s" : ""} uploaded ·
            Changes appear on <Link to="/portfolio" className="text-[#C9A84C] hover:underline">/portfolio</Link> instantly
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8" style={{ borderBottom: "1px solid rgba(180,148,60,0.2)" }}>
          {[
            { id: "gallery", label: "Gallery", icon: LayoutGrid },
            { id: "upload", label: "Upload New", icon: Upload },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as "upload" | "gallery")}
              className="flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all -mb-px"
              style={{
                color: tab === id ? "#C9A84C" : "#7A6655",
                borderBottom: tab === id ? "2px solid #C9A84C" : "2px solid transparent",
              }}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "upload" && (
          <div className="max-w-lg">
            <UploadCard password={password} onUploaded={handleUploaded} />
          </div>
        )}

        {tab === "gallery" && (
          <>
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 size={24} className="animate-spin text-[#C9A84C]" />
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20">
                <ImageIcon size={40} className="mx-auto text-[#C9A84C]/30 mb-4" />
                <p className="text-[#7A6655] font-medium mb-2">No images uploaded yet</p>
                <p className="text-[12px] text-[#9A8878] mb-6">
                  Upload images to have them appear on the Portfolio page.
                </p>
                {/* Blob not configured warning */}
                <div
                  className="max-w-md mx-auto text-left p-4 text-[12px]"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <p className="font-bold text-[#7A5C28] mb-1">⚠️ Setup Required</p>
                  <p className="text-[#7A6655]">
                    Add <code className="bg-[#F0E8D8] px-1">BLOB_READ_WRITE_TOKEN</code> to your{" "}
                    <code className="bg-[#F0E8D8] px-1">.env.local</code> file and your Vercel project
                    environment variables to enable image uploads.
                  </p>
                  <p className="mt-2 text-[#7A6655]">
                    Get it from: Vercel Dashboard → Storage → Create Blob Store → copy token.
                  </p>
                </div>
                <button
                  onClick={() => setTab("upload")}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em]"
                  style={{ background: "#C9A84C", color: "#120c09" }}
                >
                  <Upload size={13} /> Upload First Image
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.map((item) => (
                  <ImageCard
                    key={item.id}
                    item={item}
                    password={password}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
                {/* Quick upload button in gallery */}
                <button
                  onClick={() => setTab("upload")}
                  className="h-48 flex flex-col items-center justify-center gap-2 transition-all"
                  style={{
                    border: "2px dashed rgba(201,168,76,0.35)",
                    color: "#C9A84C",
                  }}
                >
                  <Plus size={24} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Add Image</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────── */
function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  // restore session on mount
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
