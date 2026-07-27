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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!siteKey) {
      setError("reCAPTCHA site key is missing.");
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
      setError("Unable to load reCAPTCHA.");
    };
    document.head.appendChild(script);
  }, [siteKey]);

  async function execute(action: string) {
    if (!siteKey) throw new Error("reCAPTCHA site key is missing.");
    if (!window.grecaptcha) throw new Error("reCAPTCHA is not available.");
    return window.grecaptcha.execute(siteKey, { action });
  }

  return { ready, error, execute };
}
