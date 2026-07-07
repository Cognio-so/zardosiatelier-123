"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export function TypingAnimation({
  children,
  className,
  duration = 50,
  delay = 0,
  as: Component = "div",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingTimeout = setTimeout(
      () => {
        if (i < children.length) {
          setDisplayedText((prev) => prev + children.charAt(i));
          setI((prev) => prev + 1);
        }
      },
      i === 0 ? delay : duration,
    );

    return () => clearTimeout(typingTimeout);
  }, [children, delay, duration, i]);

  // Parse custom Markdown-like asterisks (*) for styled text (italics & gold color)
  const renderFormattedText = (text: string) => {
    const elements: React.ReactNode[] = [];
    let isSpecial = false;
    let currentText = "";

    for (let idx = 0; idx < text.length; idx++) {
      const char = text[idx];
      if (char === "*") {
        if (currentText) {
          elements.push(
            isSpecial ? (
              <span key={idx} className="italic text-gold-soft">
                {currentText}
              </span>
            ) : (
              currentText
            )
          );
          currentText = "";
        }
        isSpecial = !isSpecial;
      } else {
        currentText += char;
      }
    }

    if (currentText) {
      elements.push(
        isSpecial ? (
          <span key="last" className="italic text-gold-soft">
            {currentText}
          </span>
        ) : (
          currentText
        )
      );
    }

    return elements;
  };

  return (
    <Component className={cn(className)}>
      {renderFormattedText(displayedText)}
    </Component>
  );
}
