import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Save, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  getHomepageSections,
  updateHomepageSection,
  type HomepageSection,
} from "@/lib/admin-data";

export const Route = createFileRoute("/admin/homepage")({
  component: HomepageAdmin,
});

const PASS = "zardosi@admin2024";

interface SectionConfig {
  id: string;
  label: string;
  description: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textarea" | "url";
    placeholder: string;
    hint?: string;
  }[];
}

const SECTION_CONFIGS: SectionConfig[] = [
  {
    id: "hero",
    label: "Hero Section",
    description: "The main banner at the top of the homepage",
    fields: [
      {
        key: "heading",
        label: "Main Heading",
        type: "text",
        placeholder: "Where Thread Meets Artistry",
        hint: "Keep under 60 characters for best display",
      },
      {
        key: "subheading",
        label: "Sub-Heading",
        type: "textarea",
        placeholder: "Bespoke hand embroidery for the world's finest fashion houses",
      },
      { key: "ctaText", label: "CTA Button Text", type: "text", placeholder: "Explore Our Work" },
      { key: "ctaLink", label: "CTA Button Link", type: "url", placeholder: "/portfolio" },
    ],
  },
  {
    id: "about",
    label: "About Section",
    description: "The 'About Us' section on the homepage",
    fields: [
      { key: "heading", label: "Section Heading", type: "text", placeholder: "Crafted with Devotion" },
      {
        key: "body",
        label: "Body Text",
        type: "textarea",
        placeholder: "Zardosi Atelier is a luxury hand embroidery...",
        hint: "Supports basic HTML for bold/italic (e.g. <strong>text</strong>)",
      },
      { key: "imageUrl", label: "Section Image URL", type: "url", placeholder: "https://..." },
    ],
  },
  {
    id: "contact",
    label: "Contact Section",
    description: "The contact/enquiry section at the bottom of the homepage",
    fields: [
      { key: "heading", label: "Section Heading", type: "text", placeholder: "Begin a Conversation" },
      { key: "subheading", label: "Sub-Heading", type: "text", placeholder: "Every masterpiece begins with a dialogue." },
      { key: "whatsappCta", label: "WhatsApp Button Text", type: "text", placeholder: "Message on WhatsApp" },
    ],
  },
];

function HomepageAdmin() {
  const qc = useQueryClient();
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ["homepage"],
    queryFn: () => getHomepageSections(),
  });

  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState<Record<string, Record<string, unknown>>>({});
  const [dirty, setDirty] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (sections.length > 0) {
      const data: Record<string, Record<string, unknown>> = {};
      for (const s of sections) {
        data[s.section] = { ...(s.content as Record<string, unknown>) };
      }
      // Apply defaults for any missing sections
      for (const cfg of SECTION_CONFIGS) {
        if (!data[cfg.id]) {
          const defaults: Record<string, unknown> = {};
          for (const f of cfg.fields) {
            defaults[f.key] = "";
          }
          data[cfg.id] = defaults;
        }
      }
      setFormData(data);
    }
  }, [sections]);

  const saveMut = useMutation({
    mutationFn: (sectionId: string) =>
      updateHomepageSection({
        data: {
          password: PASS,
          section: sectionId,
          content: formData[sectionId] ?? {},
        },
      }),
    onSuccess: (_, sectionId) => {
      qc.invalidateQueries({ queryKey: ["homepage"] });
      toast.success("Section saved!");
      setDirty((prev) => {
        const next = new Set(prev);
        next.delete(sectionId);
        return next;
      });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function update(sectionId: string, key: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [key]: value },
    }));
    setDirty((prev) => new Set(prev).add(sectionId));
  }

  const currentConfig = SECTION_CONFIGS.find((s) => s.id === activeSection);

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Homepage CMS
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            Edit homepage sections — changes reflect immediately on the live site
          </p>
        </div>
        <a
          href="https://zardosiatelier-123.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#2a2a2a] text-[#666] text-sm hover:text-[#C9A227] hover:border-[#C9A227]/40 transition-all"
        >
          <ExternalLink size={13} />
          Preview Site
        </a>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {SECTION_CONFIGS.map((cfg) => (
          <button
            key={cfg.id}
            onClick={() => setActiveSection(cfg.id)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0"
            style={{
              background: activeSection === cfg.id ? "rgba(201,162,39,0.15)" : "#111",
              color: activeSection === cfg.id ? "#C9A227" : "#555",
              border: activeSection === cfg.id ? "1px solid rgba(201,162,39,0.3)" : "1px solid #1e1e1e",
            }}
          >
            {cfg.label}
            {dirty.has(cfg.id) && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            )}
          </button>
        ))}
      </div>

      {/* Form */}
      {currentConfig && (
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-white font-semibold text-base">{currentConfig.label}</h3>
                <p className="text-[#444] text-sm mt-0.5">{currentConfig.description}</p>
              </div>
              <button
                onClick={() => saveMut.mutate(activeSection)}
                disabled={saveMut.isPending || !dirty.has(activeSection)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {saveMut.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                Save Section
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-5 animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-2 bg-[#1a1a1a] rounded w-20 mb-2" />
                    <div className="h-11 bg-[#1a1a1a] rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {currentConfig.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={
                          (formData[activeSection]?.[field.key] as string) ?? ""
                        }
                        onChange={(e) =>
                          update(activeSection, field.key, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={
                          (formData[activeSection]?.[field.key] as string) ?? ""
                        }
                        onChange={(e) =>
                          update(activeSection, field.key, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                      />
                    )}
                    {field.hint && (
                      <p className="text-[#333] text-xs mt-1.5">{field.hint}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Preview hint */}
          <div className="mt-4 px-4 py-3 bg-[#C9A227]/5 border border-[#C9A227]/15 rounded-xl">
            <p className="text-[#C9A227] text-xs">
              ✦ Changes are saved to Vercel Blob. The live site will reflect updates after saving.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
