import type { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-ivory text-ink">
      <Navigation />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
