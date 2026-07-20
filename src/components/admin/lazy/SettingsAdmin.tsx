import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Save, Loader2, Globe, Phone, MapPin, Share2, Shield, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { getSettings, updateSettings, type SiteSettings } from "@/lib/admin-data";
import { loadSession, getStoredPassword } from "@/lib/admin-auth";

const SECTIONS = [
  { id: "general", label: "General", icon: Globe, fields: [
    { key: "siteName", label: "Site Name", type: "text", placeholder: "Zardosi Atelier" },
    { key: "tagline", label: "Tagline", type: "text", placeholder: "Luxury Hand Embroidery Couture" },
    { key: "email", label: "Email Address", type: "email", placeholder: "hello@zardosiatelier.com" },
    { key: "footerText", label: "Footer Text", type: "text", placeholder: "(c) 2025 Zardosi Atelier" },
  ] },
  { id: "contact", label: "Contact", icon: Phone, fields: [
    { key: "phone", label: "Phone Number", type: "text", placeholder: "+91 9876543210" },
    { key: "whatsappNumber", label: "WhatsApp Number", type: "text", placeholder: "+91 9876543210" },
    { key: "address", label: "Address", type: "textarea", placeholder: "Mumbai, Maharashtra, India" },
    { key: "googleMapsUrl", label: "Google Maps URL", type: "url", placeholder: "https://maps.google.com/..." },
  ] },
  { id: "social", label: "Social Media", icon: Share2, fields: [
    { key: "instagramUrl", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/zardosiatelier" },
    { key: "facebookUrl", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." },
    { key: "linkedinUrl", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/company/..." },
    { key: "youtubeUrl", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/@..." },
  ] },
  { id: "assets", label: "Branding", icon: MapPin, fields: [
    { key: "logoUrl", label: "Logo URL", type: "url", placeholder: "https://..." },
    { key: "faviconUrl", label: "Favicon URL", type: "url", placeholder: "https://..." },
  ] },
  { id: "maintenance", label: "Maintenance", icon: Shield, fields: [
    { key: "maintenanceMode", label: "Maintenance Mode", type: "toggle", placeholder: "" },
  ] },
] as const;

interface SectionConfig {
  readonly id: "general" | "contact" | "social" | "assets" | "maintenance";
  readonly label: string;
  readonly icon: React.ElementType;
  readonly fields: readonly { readonly key: string; readonly label: string; readonly type: string; readonly placeholder: string }[];
}

const TabButton = memo(({
  section,
  isActive,
  onClick,
}: {
  section: SectionConfig;
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = section.icon;
  return (
    <button
      role="tab"
      id={`tab-${section.id}`}
      aria-selected={isActive}
      aria-controls={`settings-tabpanel-${section.id}`}
      onClick={onClick}
      aria-label={`View ${section.label} settings`}
      className={`relative flex w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${isActive ? "text-white" : "text-slate-600 hover:bg-white/70 hover:text-slate-950"}`}
    >
      {isActive && <motion.span layoutId="settings-tab" className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-blue-600 to-violet-600" />}
      <Icon size={16} className="relative" aria-hidden="true" />
      <span className="relative">{section.label}</span>
    </button>
  );
});
TabButton.displayName = "TabButton";

export default function SettingsAdmin() {
  const qc = useQueryClient();
  const password = getStoredPassword();
  const { data: settings, isLoading } = useQuery({ queryKey: ["settings"], queryFn: () => getSettings() });
  const [activeSection, setActiveSection] = useState<"general" | "contact" | "social" | "assets" | "maintenance">("general");
  const [formData, setFormData] = useState<Partial<SiteSettings>>({});
  const [dirty, setDirty] = useState(false);

  useEffect(() => { if (settings) { setFormData(settings); setDirty(false); } }, [settings]);

  const saveMut = useMutation({
    mutationFn: () => updateSettings({ data: { password, settings: formData } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["settings"] }); toast.success("Settings saved!"); setDirty(false); },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }, []);

  const currentSection = useMemo(() => SECTIONS.find((s) => s.id === activeSection)!, [activeSection]);

  return (
    <div className="admin-page space-y-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><h2 className="admin-page-title">Settings</h2><p className="admin-page-subtitle">Configure website identity, contact details, social links, and operational controls.</p></div>
        <div className="flex items-center gap-3">
          {dirty && <span className="text-xs font-bold text-[#c9a44c]" aria-live="polite">Unsaved changes</span>}
          <button
            onClick={() => saveMut.mutate()}
            disabled={saveMut.isPending || !dirty}
            aria-label="Save changes to website settings"
            title="Save changes"
            className="admin-primary-btn flex items-center gap-2 px-5 py-3 text-sm font-bold focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            {saveMut.isPending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} aria-hidden="true" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="admin-glass h-fit p-3">
          <div className="space-y-1" role="tablist" aria-label="Settings configuration panels">
            {SECTIONS.map((section) => (
              <TabButton
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </div>
          <a
            href="https://zardosiatelier-123.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live website in a new window"
            title="View Live Site"
            className="mt-4 flex items-center gap-2 rounded-[18px] px-4 py-3 text-xs font-bold text-slate-500 transition hover:bg-white/70 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
          >
            <ExternalLink size={13} aria-hidden="true" />
            <span>View Live Site</span>
          </a>
        </div>

        <motion.section
          key={activeSection}
          id={`settings-tabpanel-${activeSection}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeSection}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="admin-glass p-6"
        >
          {isLoading ? (
            <div className="space-y-4" aria-busy="true" aria-label="Loading settings data">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 animate-pulse rounded-[20px] bg-white/50" />)}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="admin-gradient-icon flex size-11 items-center justify-center rounded-2xl" aria-hidden="true">
                  {(() => { const Icon = currentSection.icon; return <Icon size={18} />; })()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{currentSection.label} Settings</h3>
                  <p className="text-sm text-slate-600">Manage the values used across the public website.</p>
                </div>
              </div>
              <div className="grid gap-5 xl:grid-cols-2">
                {currentSection.fields.map((field) => {
                  const uniqueId = `settings-field-${field.key}`;
                  return (
                    <div key={field.key} className={field.type === "textarea" || field.type === "toggle" ? "xl:col-span-2 space-y-2" : "space-y-2"}>
                      <label htmlFor={uniqueId} className="admin-label block">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={uniqueId}
                          value={(formData[field.key as keyof SiteSettings] as string) ?? ""}
                          onChange={(e) => update(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={4}
                          className="admin-input w-full resize-none px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                        />
                      ) : field.type === "toggle" ? (
                        <div className="rounded-[24px] border border-white/80 bg-white/60 p-5 flex items-center">
                          <button
                            id={uniqueId}
                            type="button"
                            onClick={() => update(field.key, !(formData[field.key as keyof SiteSettings] as boolean))}
                            aria-pressed={!!(formData[field.key as keyof SiteSettings] as boolean)}
                            aria-label={`Toggle ${field.label}`}
                            className={`relative h-8 w-14 rounded-full transition focus-visible:ring-2 focus-visible:ring-[#c9a44c] ${(formData[field.key as keyof SiteSettings] as boolean) ? "bg-gradient-to-r from-blue-600 to-violet-600" : "bg-slate-200"}`}
                          >
                            <span className="absolute top-1 size-6 rounded-full bg-white shadow transition" style={{ left: (formData[field.key as keyof SiteSettings] as boolean) ? "26px" : "4px" }} />
                          </button>
                          <span className="ml-4 text-sm font-semibold text-slate-600">{(formData[field.key as keyof SiteSettings] as boolean) ? "Maintenance mode is ON" : "Site is live and visible"}</span>
                        </div>
                      ) : (
                        <input
                          id={uniqueId}
                          type={field.type}
                          value={(formData[field.key as keyof SiteSettings] as string) ?? ""}
                          onChange={(e) => update(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="admin-input w-full px-4 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#c9a44c]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
