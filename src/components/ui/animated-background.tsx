"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";

export default function AnimatedBackground() {
  const { currentTheme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Liquid blobs - now theme-aware */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 liquid-blob transition-all duration-600"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.primaryGlow} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] liquid-blob transition-all duration-600"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.accentGlow} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 liquid-blob transition-all duration-600"
        style={{
          background: `radial-gradient(circle, ${currentTheme.colors.gradient3}30 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
