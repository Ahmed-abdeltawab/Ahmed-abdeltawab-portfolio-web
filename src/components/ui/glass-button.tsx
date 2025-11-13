"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useTheme } from "@/components/providers/theme-provider";

interface GlassButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  href?: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  download?: string | boolean;
  external?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Reusable Glass Button Component
 * Supports links, downloads, icons, and theme-aware styling
 */
export default function GlassButton({
  children,
  href,
  icon: Icon,
  variant = "secondary",
  size = "md",
  download,
  external = false,
  disabled = false,
  className = "",
  ...motionProps
}: GlassButtonProps) {
  const { currentTheme } = useTheme();

  // Size variants
  const sizes = {
    sm: "px-[1em] py-[0.5em] text-[0.85em]",
    md: "px-[1.5em] py-[0.75em] text-[0.95em]",
    lg: "px-[2em] py-[1em] text-[1em]",
  };

  // Variant styles
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${currentTheme.colors.primary}25, ${currentTheme.colors.accent}15)`,
      hoverBackground: `linear-gradient(135deg, ${currentTheme.colors.primary}35, ${currentTheme.colors.accent}25)`,
      border: `rgba(255, 255, 255, ${currentTheme.colors.borderOpacity + 0.1})`,
      glow: currentTheme.colors.primaryGlow,
    },
    secondary: {
      background: `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
      hoverBackground: `linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))`,
      border: `rgba(255, 255, 255, ${currentTheme.colors.borderOpacity})`,
      glow: "transparent",
    },
    ghost: {
      background: "transparent",
      hoverBackground: `rgba(255, 255, 255, 0.08)`,
      border: `rgba(255, 255, 255, ${currentTheme.colors.borderOpacity - 0.1})`,
      glow: "transparent",
    },
  };

  const variantStyle = variants[variant];

  const buttonContent = (
    <>
      {/* Icon */}
      {Icon && (
        <Icon
          className="w-[1.2em] h-[1.2em] transition-transform group-hover:scale-110"
          style={{
            color:
              variant === "primary" ? currentTheme.colors.primary : "inherit",
          }}
        />
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Hover shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-[0.75em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${currentTheme.colors.primaryGlow} 50%, transparent 100%)`,
        }}
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
    </>
  );

  const baseClasses = `
    glass-button
    group
    relative
    inline-flex
    items-center
    justify-center
    gap-[0.5em]
    font-medium
    rounded-[0.75em]
    border
    backdrop-blur-xl
    transition-all
    duration-300
    overflow-hidden
    ${sizes[size]}
    ${
      disabled
        ? "opacity-50 cursor-not-allowed"
        : "hover:scale-105 cursor-pointer"
    }
    ${className}
  `;

  // If it's a link
  if (href) {
    const linkProps = {
      href,
      ...(download && { download }),
      ...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      }),
    };

    return (
      <Link {...linkProps} className={baseClasses.trim()}>
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: variantStyle.background,
            borderColor: variantStyle.border,
          }}
          whileHover={{
            background: variantStyle.hoverBackground,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect for primary variant */}
        {variant === "primary" && !disabled && (
          <motion.div
            className="absolute -inset-[0.5em] -z-20 rounded-[1em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at center, ${variantStyle.glow}, transparent 70%)`,
              filter: "blur(1em)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {buttonContent}
      </Link>
    );
  }

  // If it's a button
  return (
    <motion.button
      className={baseClasses.trim()}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      {...motionProps}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: variantStyle.background,
          borderColor: variantStyle.border,
        }}
        whileHover={
          !disabled
            ? {
                background: variantStyle.hoverBackground,
              }
            : undefined
        }
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect for primary variant */}
      {variant === "primary" && !disabled && (
        <motion.div
          className="absolute -inset-[0.5em] -z-20 rounded-[1em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${variantStyle.glow}, transparent 70%)`,
            filter: "blur(1em)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {buttonContent}
    </motion.button>
  );
}
