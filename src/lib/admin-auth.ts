import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "zardosi@admin2024";
const SESSION_KEY = "za_admin_session";

export interface AdminSession {
  token: string;
  expiresAt: number;
}

/** Server fn — verify password, return a session token */
export const loginAdmin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string() }))
  .handler(async ({ data }) => {
    if (data.password !== ADMIN_PASS) {
      throw new Error("Invalid password");
    }
    // Simple token: base64(timestamp + "|" + partial_password_hash)
    const token = Buffer.from(
      `${Date.now()}|${ADMIN_PASS.split("").reverse().join("").slice(0, 8)}`
    ).toString("base64");
    return { token, expiresAt: Date.now() + 24 * 60 * 60 * 1000 };
  });

/** Server fn — verify a session token */
export const verifyAdminToken = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), expiresAt: z.number() }))
  .handler(async ({ data }) => {
    if (data.expiresAt < Date.now()) return { valid: false };
    try {
      const decoded = Buffer.from(data.token, "base64").toString("utf-8");
      const [, partialHash] = decoded.split("|");
      const expected = ADMIN_PASS.split("").reverse().join("").slice(0, 8);
      return { valid: partialHash === expected };
    } catch {
      return { valid: false };
    }
  });

// ── Client-side session helpers (localStorage) ──────────────

export function saveSession(session: AdminSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionToken(): string | null {
  return loadSession()?.token ?? null;
}
