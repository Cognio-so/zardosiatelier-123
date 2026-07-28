import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "google-recaptcha-v3";

export function useRecaptchaV3() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  const enabled = Boolean(siteKey);
  const [ready, setReady] = useState(!enabled);
  const [error, setError] = useState<string | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!siteKey) {
      setReady(true);
      setError(null);
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setReady(true));
      return;
    }

    if (requested.current) return;
    requested.current = true;

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        window.grecaptcha?.ready(() => setReady(true));
      });
      existing.addEventListener("error", () => {
        setReady(true);
        setError("Security check could not load; protected fallback is enabled.");
      });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.onload = () => {
      window.grecaptcha?.ready(() => setReady(true));
    };
    script.onerror = () => {
      setReady(true);
      setError("Security check could not load; protected fallback is enabled.");
    };
    document.head.appendChild(script);
  }, [siteKey]);

  async function execute(action: string) {
    if (!siteKey) return "recaptcha-not-configured";
    if (!window.grecaptcha) return "recaptcha-unavailable";
    return window.grecaptcha.execute(siteKey, { action });
  }

  return { enabled, ready, error, execute };
}
