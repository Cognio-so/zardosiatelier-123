"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  position?: { x: number; y: number };
  ariaLabel?: string;
  className?: string;
}

export function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  ariaLabel = "Zoom Area",
  className,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isStatic) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentX = isStatic ? position.x : mousePos.x;
  const currentY = isStatic ? position.y : mousePos.y;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-crosshair select-none w-full h-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {/* Base Content */}
      <div className="w-full h-full">{children}</div>

      {/* Lens Overlay */}
      <AnimatePresence>
        {(isHovered || isStatic) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute rounded-full pointer-events-none border border-white/50 shadow-2xl overflow-hidden z-20"
            style={{
              width: lensSize,
              height: lensSize,
              left: currentX - lensSize / 2,
              top: currentY - lensSize / 2,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Zoomed Content */}
            <div
              style={{
                position: "absolute",
                left: -currentX * zoomFactor + lensSize / 2,
                top: -currentY * zoomFactor + lensSize / 2,
                width: dimensions.width * zoomFactor,
                height: dimensions.height * zoomFactor,
                pointerEvents: "none",
              }}
              className="[&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:max-w-none"
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
