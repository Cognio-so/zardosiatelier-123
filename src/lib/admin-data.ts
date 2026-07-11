import { createServerFn } from "@tanstack/react-start";
import { put, list } from "@vercel/blob";
import { z } from "zod";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN ?? "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "zardosi@admin2024";

// ── Blob key constants ──────────────────────────────────────
const KEYS = {
  enquiries: "admin-data/enquiries.json",
  settings: "admin-data/settings.json",
  homepage: "admin-data/homepage.json",
  seo: "admin-data/seo.json",
  loginHistory: "admin-data/login-history.json",
} as const;

// ── Types ───────────────────────────────────────────────────

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
  readAt?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  googleMapsUrl: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
  footerText: string;
}

export interface HomepageSection {
  id: string;
  section: string;
  content: Record<string, any>;
  updatedAt: string;
}

export interface SeoEntry {
  id: string;
  page: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  robots: "index" | "noindex";
  updatedAt: string;
}

export interface LoginHistoryEntry {
  id: string;
  userAgent: string;
  createdAt: string;
  ipAddress?: string;
}

// ── Generic Blob JSON CRUD ───────────────────────────────────

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  if (!BLOB_TOKEN) return fallback;
  try {
    const { blobs } = await list({ token: BLOB_TOKEN, prefix: key });
    const match = blobs.find((b) => b.pathname === key);
    if (!match) return fallback;
    const res = await fetch(match.url + `?t=${Date.now()}`);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

async function writeBlob<T>(key: string, data: T): Promise<void> {
  if (!BLOB_TOKEN) return;
  await put(key, JSON.stringify(data, null, 2), {
    access: "public",
    token: BLOB_TOKEN,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function authCheck(password: string) {
  if (password !== ADMIN_PASS) throw new Error("Unauthorized");
}

// ── ENQUIRIES ────────────────────────────────────────────────

export const getEnquiries = createServerFn({ method: "GET" }).handler(
  async () => readBlob<Enquiry[]>(KEYS.enquiries, [])
);

export const createEnquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string(),
      message: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    const enquiries = await readBlob<Enquiry[]>(KEYS.enquiries, []);
    const newEnquiry: Enquiry = {
      id: `enq_${Date.now()}`,
      ...data,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    await writeBlob(KEYS.enquiries, [newEnquiry, ...enquiries]);
    return newEnquiry;
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      id: z.string(),
      status: z.enum(["new", "read", "resolved"]),
    })
  )
  .handler(async ({ data }) => {
    authCheck(data.password);
    const enquiries = await readBlob<Enquiry[]>(KEYS.enquiries, []);
    const updated = enquiries.map((e) =>
      e.id === data.id
        ? {
            ...e,
            status: data.status,
            readAt:
              data.status === "read" && !e.readAt
                ? new Date().toISOString()
                : e.readAt,
          }
        : e
    );
    await writeBlob(KEYS.enquiries, updated);
    return { ok: true };
  });

export const deleteEnquiry = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), id: z.string() }))
  .handler(async ({ data }) => {
    authCheck(data.password);
    const enquiries = await readBlob<Enquiry[]>(KEYS.enquiries, []);
    await writeBlob(
      KEYS.enquiries,
      enquiries.filter((e) => e.id !== data.id)
    );
    return { ok: true };
  });

export const bulkDeleteEnquiries = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string(), ids: z.array(z.string()) }))
  .handler(async ({ data }) => {
    authCheck(data.password);
    const enquiries = await readBlob<Enquiry[]>(KEYS.enquiries, []);
    await writeBlob(
      KEYS.enquiries,
      enquiries.filter((e) => !data.ids.includes(e.id))
    );
    return { ok: true };
  });

// ── SETTINGS ─────────────────────────────────────────────────

const defaultSettings: SiteSettings = {
  siteName: "Zardosi Atelier",
  tagline: "Luxury Hand Embroidery Couture",
  whatsappNumber: "+91 9876543210",
  email: "hello@zardosiatelier.com",
  phone: "+91 9876543210",
  address: "Mumbai, Maharashtra, India",
  instagramUrl: "https://instagram.com/zardosiatelier",
  facebookUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  googleMapsUrl: "",
  maintenanceMode: false,
  logoUrl: "",
  faviconUrl: "",
  footerText: "© 2025 Zardosi Atelier. All rights reserved.",
};

export const getSettings = createServerFn({ method: "GET" }).handler(
  async () => readBlob<SiteSettings>(KEYS.settings, defaultSettings)
);

export const updateSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      settings: z.record(z.string(), z.any()),
    })
  )
  .handler(async ({ data }) => {
    authCheck(data.password);
    const current = await readBlob<SiteSettings>(
      KEYS.settings,
      defaultSettings
    );
    const merged = { ...current, ...(data.settings as Partial<SiteSettings>) };
    await writeBlob(KEYS.settings, merged);
    return { ok: true };
  });

// ── HOMEPAGE CMS ─────────────────────────────────────────────

const defaultHomepage: HomepageSection[] = [
  {
    id: "hero",
    section: "hero",
    content: {
      heading: "Where Thread Meets Artistry",
      subheading:
        "Bespoke hand embroidery for the world's finest fashion houses",
      ctaText: "Explore Our Work",
      ctaLink: "/portfolio",
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "about",
    section: "about",
    content: {
      heading: "Crafted with Devotion",
      body: "Zardosi Atelier is a luxury hand embroidery and couture manufacturing atelier serving global fashion houses.",
      imageUrl: "",
    },
    updatedAt: new Date().toISOString(),
  },
  {
    id: "contact",
    section: "contact",
    content: {
      heading: "Begin a Conversation",
      subheading: "Every masterpiece begins with a dialogue.",
      whatsappCta: "Message on WhatsApp",
    },
    updatedAt: new Date().toISOString(),
  },
];

export const getHomepageSections = createServerFn({ method: "GET" }).handler(
  async () => readBlob<HomepageSection[]>(KEYS.homepage, defaultHomepage)
);

export const updateHomepageSection = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      section: z.string(),
      content: z.record(z.string(), z.any()),
    })
  )
  .handler(async ({ data }) => {
    authCheck(data.password);
    const sections = await readBlob<HomepageSection[]>(
      KEYS.homepage,
      defaultHomepage
    );
    const exists = sections.find((s) => s.section === data.section);
    const updated = exists
      ? sections.map((s) =>
          s.section === data.section
            ? { ...s, content: data.content, updatedAt: new Date().toISOString() }
            : s
        )
      : [
          ...sections,
          {
            id: data.section,
            section: data.section,
            content: data.content,
            updatedAt: new Date().toISOString(),
          },
        ];
    await writeBlob(KEYS.homepage, updated);
    return { ok: true };
  });

// ── SEO ──────────────────────────────────────────────────────

const defaultSeo: SeoEntry[] = [
  {
    id: "home",
    page: "Home",
    metaTitle: "Zardosi Atelier — Luxury Hand Embroidery Couture",
    metaDescription:
      "A luxury hand embroidery and couture manufacturing atelier serving global fashion houses.",
    keywords: "zardosi, hand embroidery, couture, luxury fashion",
    ogImage: "",
    robots: "index",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "portfolio",
    page: "Portfolio",
    metaTitle: "Portfolio — Zardosi Atelier",
    metaDescription: "Explore our portfolio of luxury hand embroidery works.",
    keywords: "portfolio, embroidery, zardosi, crystals, sequins",
    ogImage: "",
    robots: "index",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "contact",
    page: "Contact",
    metaTitle: "Contact — Zardosi Atelier",
    metaDescription: "Get in touch with Zardosi Atelier.",
    keywords: "contact, zardosi atelier, enquiry",
    ogImage: "",
    robots: "index",
    updatedAt: new Date().toISOString(),
  },
];

export const getSeoEntries = createServerFn({ method: "GET" }).handler(
  async () => readBlob<SeoEntry[]>(KEYS.seo, defaultSeo)
);

export const updateSeoEntry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      id: z.string(),
      page: z.string(),
      metaTitle: z.string(),
      metaDescription: z.string(),
      keywords: z.string(),
      ogImage: z.string(),
      robots: z.enum(["index", "noindex"]),
    })
  )
  .handler(async ({ data }) => {
    authCheck(data.password);
    const entries = await readBlob<SeoEntry[]>(KEYS.seo, defaultSeo);
    const { password, ...rest } = data;
    void password;
    const exists = entries.find((e) => e.id === rest.id);
    const updated = exists
      ? entries.map((e) =>
          e.id === rest.id
            ? { ...e, ...rest, updatedAt: new Date().toISOString() }
            : e
        )
      : [...entries, { ...rest, updatedAt: new Date().toISOString() }];
    await writeBlob(KEYS.seo, updated);
    return { ok: true };
  });

// ── LOGIN HISTORY ─────────────────────────────────────────────

export const addLoginHistory = createServerFn({ method: "POST" })
  .validator(
    z.object({
      password: z.string(),
      userAgent: z.string(),
    })
  )
  .handler(async ({ data }) => {
    authCheck(data.password);
    const history = await readBlob<LoginHistoryEntry[]>(
      KEYS.loginHistory,
      []
    );
    const entry: LoginHistoryEntry = {
      id: `login_${Date.now()}`,
      userAgent: data.userAgent,
      createdAt: new Date().toISOString(),
    };
    await writeBlob(KEYS.loginHistory, [entry, ...history].slice(0, 100));
    return { ok: true };
  });

export const getLoginHistory = createServerFn({ method: "GET" }).handler(
  async () => readBlob<LoginHistoryEntry[]>(KEYS.loginHistory, [])
);
