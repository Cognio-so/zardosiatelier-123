import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Save, Loader2, ExternalLink, Home, Info, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { getHomepageSections, updateHomepageSection } from "@/lib/admin-data";
import { loadSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/homepage")({ component: HomepageAdmin });

interface SectionConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  fields: { key: string; label: string; type: "text" | "textarea" | "url"; placeholder: string; hint?: string }[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  { id: "hero", label: "Hero Section", description: "The main banner at the top of the homepage", icon: Home, fields: [
    { key: "heading", label: "Main Heading", type: "text", placeholder: "Where Thread Meets Artistry", hint: "Keep under 60 characters for best display" },
    { key: "subheading", label: "Sub-Heading", type: "textarea", placeholder: "Bespoke hand embroidery for the world's finest fashion houses" },
    { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Explore Our Work" },
    { key: "ctaLink", label: "CTA Button Link", type: "url", placeholder: "/portfolio" },
  ] },
  { id: "about", label: "About Section", description: "The About Us section on the homepage", icon: Info, fields: [
    { key: "heading", label: "Section Heading", type: "text", placeholder: "Crafted with Devotion" },
    { key: "body", label: "Body Text", type: "textarea", placeholder: "Zardosi Atelier is a luxury hand embroidery...", hint: "Supports basic HTML for bold/italic (e.g. <strong>text</strong>)" },
    { key: "imageUrl", label: "Section Image URL", type: "url", placeholder: "https://..." },
  ] },
  { id: "contact", label: "Contact Section", description: "The contact/enquiry section at the bottom of the homepage", icon: MessageCircle, fields: [
    { key: "heading", label: "Section Heading", type: "text", placeholder: "Begin a Conversation" },
    { key: "subheading", label: "Sub-Heading", type: "text", placeholder: "Every masterpiece begins with a dialogue." },
    { key: "whatsappCta", label: "WhatsApp Button Text", type: "text", placeholder: "Message on WhatsApp" },
  ] },
];

function HomepageAdmin() {
  const qc = useQueryClient();
  const session = loadSession();
  const password = session ? atob(session.token).split("|")[0] : "";
  const { data: sections = [], isLoading } = useQuery({ queryKey: ["homepage"], queryFn: () => getHomepageSections() });

  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState<Record<string, Record<string, unknown>>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (sections.length > 0) {
      const data: Record<string, Record<string, unknown>> = {};
      for (const s of sections) data[s.section] = { ...(s.content as Record<string, unknown>) };
      for (const cfg of SECTION_CONFIGS) {
        if (!data[cfg.id]) {
          const defaults: Record<string, unknown> = {};
          for (const f of cfg.fields) defaults[f.key] = "";
          data[cfg.id] = defaults;
        }
      }
      setFormData(data);
    }
  }, [sections]);

  const saveMut = useMutation({
    mutationFn: (sectionId: string) => updateHomepageSection({ data: { password, section: sectionId, content: formData[sectionId] ?? {} } }),
    onSuccess: (_, sectionId) => {
      qc.invalidateQueries({ queryKey: ["homepage"] });
      toast.success("Section saved!");
      setDirty((prev) => { const next = new Set(prev); next.delete(sectionId); return next; });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function update(sectionId: string, key: string, value: string) {
    setFormData((prev) => ({ ...prev, [sectionId]: { ...prev[sectionId], [key]: value } }));
    setDirty((prev) => new Set(prev).add(sectionId));
  }

  const currentConfig = SECTION_CONFIGS.find((s) => s.id === activeSection)!;
  const preview = formData[activeSection] ?? {};

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="admin-page-title">Homepage CMS</h2><p className="admin-page-subtitle">Edit homepage sections. Saved changes continue writing to Vercel Blob.</p></div>
        <a href="https://zardosiatelier-123.vercel.app/" target="_blank" rel="noopener noreferrer" className="admin-secondary-btn flex w-fit items-center gap-2 px-4 py-3 text-sm font-bold"><ExternalLink size={15} /> Preview Site</a>
      </div>

      <div className="admin-glass inline-flex max-w-full gap-1 overflow-x-auto p-1.5">
        {SECTION_CONFIGS.map((cfg) => {
          const Icon = cfg.icon;
          const active = activeSection === cfg.id;
          return (
            <button key={cfg.id} onClick={() => setActiveSection(cfg.id)} className={`relative flex shrink-0 items-center gap-2 rounded-[18px] px-4 py-3 text-sm font-bold transition ${active ? "text-[#1f1306]" : "text-slate-500 hover:text-slate-950"}`}>
              {active && <motion.span layoutId="cms-tab" className="absolute inset-0 rounded-[18px] bg-gradient-to-r from-[#f3d98b] to-[#c9a44c] shadow-[0_12px_28px_rgba(201,164,76,0.22)]" />}
              <Icon size={15} className="relative" />
              <span className="relative">{cfg.label}</span>
              {dirty.has(cfg.id) && <span className="relative size-1.5 rounded-full bg-[#c9a44c]" />}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="admin-glass p-6">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3"><div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl"><currentConfig.icon size={18} /></div><div><h3 className="text-lg font-bold text-slate-950">{currentConfig.label}</h3><p className="mt-1 text-sm text-slate-500">{currentConfig.description}</p></div></div>
            <button onClick={() => saveMut.mutate(activeSection)} disabled={saveMut.isPending || !dirty.has(activeSection)} className="admin-primary-btn flex items-center gap-2 px-4 py-3 text-sm font-bold">{saveMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save</button>
          </div>

          {isLoading ? <div className="space-y-5">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-[20px] bg-white/50" />)}</div> : (
            <div className="space-y-5">
              {currentConfig.fields.map((field) => (
                <label key={field.key} className="block">
                  <span className="admin-label mb-2 block">{field.label}</span>
                  {field.type === "textarea" ? <textarea value={(formData[activeSection]?.[field.key] as string) ?? ""} onChange={(e) => update(activeSection, field.key, e.target.value)} placeholder={field.placeholder} rows={5} className="admin-input w-full resize-none px-4 py-3 text-sm" /> : <input type={field.type} value={(formData[activeSection]?.[field.key] as string) ?? ""} onChange={(e) => update(activeSection, field.key, e.target.value)} placeholder={field.placeholder} className="admin-input w-full px-4 py-3 text-sm" />}
                  {field.hint && <span className="mt-2 block text-xs font-medium text-slate-400">{field.hint}</span>}
                </label>
              ))}
            </div>
          )}
        </motion.div>

        <div className="admin-glass p-6">
          <div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold text-slate-950">Live Preview</h3><span className="admin-badge">{currentConfig.label}</span></div>
          <div className="overflow-hidden rounded-[24px] border border-emerald-950/20 bg-gradient-to-br from-[#0c2e21] to-[#071f16] p-6 text-white shadow-inner">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-[#f3d98b]">Zardosi Atelier</p>
            <h4 className="text-3xl font-black tracking-[-0.04em] text-[#f3d98b]">{String(preview.heading ?? preview.ctaText ?? currentConfig.label)}</h4>
            <p className="mt-4 text-sm leading-6 text-[#eef7f2]/80">{String(preview.subheading ?? preview.body ?? "Preview content updates as you edit the fields.")}</p>
            {(preview.ctaText || preview.ctaLink || preview.whatsappCta) && <button className="mt-6 rounded-full bg-gradient-to-r from-[#f3d98b] to-[#c9a44c] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#071f16] shadow-md">{String(preview.ctaText ?? preview.whatsappCta ?? "Action")}</button>}
          </div>
          <div className="mt-4 rounded-[20px] border border-[#c9a44c]/20 bg-[#c9a44c]/10 px-4 py-3 text-xs font-semibold text-[#8a6a20]">Changes are saved to Vercel Blob. The live site reflects updates after saving.</div>
        </div>
      </div>
    </div>
  );
}