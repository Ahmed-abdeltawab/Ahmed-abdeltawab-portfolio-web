"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { ReactNode } from "react";

interface LiquidGlassCardProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  variant?: "default" | "elevated" | "subtle";
  glow?: boolean;
  animated?: boolean;
  className?: string;
}

/**
 * Reusable Liquid Glass Card Component
 * Automatically adapts to the current theme
 */
export default function LiquidGlassCard({
  children,
  variant = "default",
  glow = true,
  animated = true,
  className = "",
  ...motionProps
}: LiquidGlassCardProps) {
  const { currentTheme } = useTheme();

  // Variant-specific styles
  const variants = {
    default: {
      blur: "blur(20px)",
      opacity: currentTheme.colors.glassOpacity,
      borderOpacity: currentTheme.colors.borderOpacity,
      padding: "1.5em",
    },
    elevated: {
      blur: "blur(24px)",
      opacity: currentTheme.colors.glassOpacity + 0.1,
      borderOpacity: currentTheme.colors.borderOpacity + 0.1,
      padding: "2em",
    },
    subtle: {
      blur: "blur(16px)",
      opacity: currentTheme.colors.glassOpacity - 0.15,
      borderOpacity: currentTheme.colors.borderOpacity - 0.05,
      padding: "1em",
    },
  };

  const variantStyle = variants[variant];

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={animated ? { once: true } : undefined}
      transition={animated ? { duration: 0.6, ease: "easeOut" } : undefined}
      className={`relative rounded-[1.5em] overflow-hidden ${className}`}
      style={{
        padding: variantStyle.padding,
      }}
      {...motionProps}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
          backdropFilter: variantStyle.blur,
          WebkitBackdropFilter: variantStyle.blur,
        }}
        animate={
          animated
            ? {
                background: [
                  `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
                  `linear-gradient(225deg, ${currentTheme.colors.surfaceAlt}, ${currentTheme.colors.surface})`,
                  `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
                ],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />

      {/* Glass Border */}
      <div
        className="absolute inset-0 -z-10 rounded-[1.5em]"
        style={{
          border: `1px solid rgba(255, 255, 255, ${variantStyle.borderOpacity})`,
        }}
      />

      {/* Outer Glow */}
      {glow && (
        <motion.div
          className="absolute -inset-[1em] -z-20 rounded-[2em] opacity-50"
          style={{
            background: `radial-gradient(circle at center, ${currentTheme.colors.primaryGlow}, transparent 70%)`,
            filter: "blur(30px)",
          }}
          animate={
            animated
              ? {
                  scale: [1, 1.1, 1],
                  opacity: [
                    0.3 * currentTheme.colors.glowIntensity,
                    0.5 * currentTheme.colors.glowIntensity,
                    0.3 * currentTheme.colors.glowIntensity,
                  ],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      )}

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${currentTheme.colors.primaryGlow} 50%, transparent 100%)`,
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Floating Particles */}
      {animated && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2em] h-[2em] rounded-full opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentTheme.colors.gradient1}, transparent)`,
                filter: "blur(0.8em)",
                top: `${20 + i * 30}%`,
                left: `${15 + i * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
