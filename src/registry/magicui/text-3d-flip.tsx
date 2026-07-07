"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Text3DFlipProps {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random";
  transition?: any;
  as?: React.ElementType;
}

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = "top",
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = { type: "spring", damping: 25, stiffness: 160 },
  as: Component = "span",
}: Text3DFlipProps) {
  const chars = children.split("");
  const total = chars.length;

  // Helper to calculate delay for each character
  const getDelay = (index: number) => {
    switch (staggerFrom) {
      case "first":
        return index * staggerDuration;
      case "last":
        return (total - 1 - index) * staggerDuration;
      case "center":
        return Math.abs(index - (total - 1) / 2) * staggerDuration;
      case "random":
        return Math.random() * total * staggerDuration * 0.5;
      default:
        return index * staggerDuration;
    }
  };

  const isX = rotateDirection === "top" || rotateDirection === "bottom";
  const directionMultiplier = rotateDirection === "top" || rotateDirection === "right" ? 1 : -1;

  const frontVariants = {
    initial: {
      rotateX: 0,
      rotateY: 0,
    },
    hover: (index: number) => ({
      rotateX: isX ? -90 * directionMultiplier : 0,
      rotateY: !isX ? -90 * directionMultiplier : 0,
      transition: {
        ...transition,
        delay: getDelay(index),
      },
    }),
  };

  const backVariants = {
    initial: (index: number) => ({
      rotateX: isX ? 90 * directionMultiplier : 0,
      rotateY: !isX ? 90 * directionMultiplier : 0,
    }),
    hover: (index: number) => ({
      rotateX: 0,
      rotateY: 0,
      transition: {
        ...transition,
        delay: getDelay(index),
      },
    }),
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      className={cn("flex flex-wrap cursor-pointer", className)}
      initial="initial"
      whileHover="hover"
    >
      {chars.map((char, index) => {
        // If it's a space, render a standard space character to maintain word gaps
        if (char === " ") {
          return (
            <span key={index} className="inline-block">&nbsp;</span>
          );
        }

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
            style={{
              perspective: "500px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front Letter */}
            <motion.span
              custom={index}
              variants={frontVariants}
              className={cn("inline-block origin-center backface-hidden", textClassName)}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {char}
            </motion.span>

            {/* Back/Flip Letter */}
            <motion.span
              custom={index}
              variants={backVariants}
              className={cn("absolute inset-0 inline-block origin-center backface-hidden", flipTextClassName)}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </MotionComponent>
  );
}
