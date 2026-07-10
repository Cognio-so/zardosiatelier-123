import { useState, useEffect, type ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function SiteShell({ children }: { children: ReactNode }) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center");

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for structured preview attributes first
      const previewAttr = target.closest("[data-preview-image]");
      if (previewAttr) {
        const src = previewAttr.getAttribute("data-preview-image");
        if (src) {
          setLightboxImage(src);
          setZoomed(false);
          setTransformOrigin("center");
          return;
        }
      }

      // Fallback: If clicking any IMG directly in the main content area (excluding nav/footer/header/no-preview)
      if (
        target.tagName === "IMG" &&
        !target.closest("header") &&
        !target.closest("nav") &&
        !target.closest("footer") &&
        !target.classList.contains("no-preview") &&
        !target.closest(".no-preview")
      ) {
        const src = (target as HTMLImageElement).src;
        setLightboxImage(src);
        setZoomed(false);
        setTransformOrigin("center");
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
        setZoomed(false);
      }
    };

    if (lightboxImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="bg-ivory text-ink">
      <Navigation />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />

      {/* Global Image Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
          onClick={() => {
            setLightboxImage(null);
            setZoomed(false);
          }}
        >
          {/* Elegant Close Button */}
          <button
            type="button"
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-3 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 z-[110] font-sans"
            onClick={() => {
              setLightboxImage(null);
              setZoomed(false);
            }}
          >
            Close
            <span className="text-2xl font-light leading-none">&times;</span>
          </button>

          {/* Centered Image Container */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden bg-transparent select-none transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
              onClick={() => setZoomed(!zoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                if (zoomed) {
                  setZoomed(false);
                  setTransformOrigin("center");
                }
              }}
            >
              <img
                src={lightboxImage}
                alt="Bespoke embroidery detail"
                className="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-300 ease-out"
                style={{
                  transform: zoomed ? "scale(2.5)" : "scale(1)",
                  transformOrigin: transformOrigin,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
