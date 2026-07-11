import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Globe,
  Phone,
  MapPin,
  Share2,
  Shield,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateSettings, type SiteSettings } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

const PASS = "zardosi@admin2024";

const SECTIONS = [
  {
    id: "general",
    label: "General",
    icon: Globe,
    fields: [
      { key: "siteName", label: "Site Name", type: "text", placeholder: "Zardosi Atelier" },
      { key: "tagline", label: "Tagline", type: "text", placeholder: "Luxury Hand Embroidery Couture" },
      { key: "email", label: "Email Address", type: "email", placeholder: "hello@zardosiatelier.com" },
      { key: "footerText", label: "Footer Text", type: "text", placeholder: "© 2025 Zardosi Atelier" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: Phone,
    fields: [
      { key: "phone", label: "Phone Number", type: "text", placeholder: "+91 9876543210" },
      { key: "whatsappNumber", label: "WhatsApp Number", type: "text", placeholder: "+91 9876543210" },
      { key: "address", label: "Address", type: "textarea", placeholder: "Mumbai, Maharashtra, India" },
      { key: "googleMapsUrl", label: "Google Maps URL", type: "url", placeholder: "https://maps.google.com/..." },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    fields: [
      { key: "instagramUrl", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/zardosiatelier" },
      { key: "facebookUrl", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." },
      { key: "linkedinUrl", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/company/..." },
      { key: "youtubeUrl", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/@..." },
    ],
  },
  {
    id: "assets",
    label: "Branding",
    icon: MapPin,
    fields: [
      { key: "logoUrl", label: "Logo URL", type: "url", placeholder: "https://..." },
      { key: "faviconUrl", label: "Favicon URL", type: "url", placeholder: "https://..." },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: Shield,
    fields: [
      { key: "maintenanceMode", label: "Maintenance Mode", type: "toggle", placeholder: "" },
    ],
  },
] as const;

function SettingsAdmin() {
  const qc = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });

  const [activeSection, setActiveSection] = useState("general");
  const [formData, setFormData] = useState<Partial<SiteSettings>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
      setDirty(false);
    }
  }, [settings]);

  const saveMut = useMutation({
    mutationFn: () =>
      updateSettings({ data: { password: PASS, settings: formData } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved!");
      setDirty(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function update(key: string, value: unknown) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  const currentSection = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div className="p-6 lg:p-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Settings
          </h2>
          <p className="text-[#555] text-sm mt-0.5">
            Configure your website settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-[#C9A227] text-xs animate-pulse">
              Unsaved changes
            </span>
          )}
          <button
            onClick={() => saveMut.mutate()}
            disabled={saveMut.isPending || !dirty}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C9A227] text-black text-sm font-semibold hover:bg-[#B8911E] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_16px_rgba(201,162,39,0.3)]"
          >
            {saveMut.isPending ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex gap-6 min-h-0">
        {/* Section Nav */}
        <div className="w-48 shrink-0 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-150"
              style={{
                background: activeSection === section.id ? "rgba(201,162,39,0.12)" : "transparent",
                color: activeSection === section.id ? "#C9A227" : "#555",
              }}
            >
              <section.icon size={15} />
              {section.label}
            </button>
          ))}
          <div className="pt-4 px-3">
            <a
              href="https://zardosiatelier-123.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#333] hover:text-[#555] text-xs transition-colors"
            >
              <ExternalLink size={11} />
              View Live Site
            </a>
          </div>
        </div>

        {/* Form Area */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 bg-[#111111] border border-[#1e1e1e] rounded-2xl p-6"
        >
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-2 bg-[#1a1a1a] rounded w-24 mb-2" />
                  <div className="h-10 bg-[#1a1a1a] rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-2 mb-6">
                {currentSection && <currentSection.icon size={18} className="text-[#C9A227]" />}
                <h3 className="text-white font-semibold text-base">
                  {currentSection?.label} Settings
                </h3>
              </div>
              {currentSection?.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-[#666] text-xs uppercase tracking-wider mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={(formData[field.key as keyof SiteSettings] as string) ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors resize-none"
                    />
                  ) : field.type === "toggle" ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          update(
                            field.key,
                            !(formData[field.key as keyof SiteSettings] as boolean)
                          )
                        }
                        className="relative w-11 h-6 rounded-full transition-all duration-200"
                        style={{
                          background:
                            (formData[field.key as keyof SiteSettings] as boolean)
                              ? "#C9A227"
                              : "#222",
                        }}
                      >
                        <span
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                          style={{
                            transform:
                              (formData[field.key as keyof SiteSettings] as boolean)
                                ? "translateX(20px)"
                                : "translateX(0)",
                          }}
                        />
                      </button>
                      <span className="text-sm text-[#888]">
                        {(formData[field.key as keyof SiteSettings] as boolean)
                          ? "Maintenance mode is ON — site is hidden from visitors"
                          : "Site is live and visible to all visitors"}
                      </span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      value={(formData[field.key as keyof SiteSettings] as string) ?? ""}
                      onChange={(e) => update(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-[#333] focus:outline-none focus:border-[#C9A227]/50 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
