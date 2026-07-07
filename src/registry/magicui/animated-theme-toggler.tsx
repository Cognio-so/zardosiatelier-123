"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedThemeToggler() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read initial theme from localStorage or document class
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const isDark = savedTheme 
      ? savedTheme === "dark" 
      : document.documentElement.classList.contains("dark");
    
    const initialTheme = isDark ? "dark" : "light";
    setTheme(initialTheme);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "light" ? "dark" : "light";

    const updateDOM = () => {
      setTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
      if (nextTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // If browser doesn't support View Transitions, update normally
    if (!(document as any).startViewTransition) {
      updateDOM();
      return;
    }

    // Set the click coordinates as CSS custom properties
    const x = event.clientX;
    const y = event.clientY;
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);

    (document as any).startViewTransition(() => {
      flushSync(() => {
        updateDOM();
      });
    });
  };

  if (!mounted) {
    return (
      <div className="size-10 rounded-full border border-white/10 bg-white/5 opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full border bg-white/5 backdrop-blur-md transition-all duration-300 focus:outline-none hover:scale-105 cursor-pointer z-50",
        theme === "dark" 
          ? "border-white/10 text-gold-soft hover:bg-white/10" 
          : "border-black/10 text-[#C9A84C] hover:bg-black/5"
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon className="size-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun className="size-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
