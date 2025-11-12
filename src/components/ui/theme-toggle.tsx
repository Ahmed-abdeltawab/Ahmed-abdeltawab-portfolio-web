"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { ThemeType, THEMES } from "@/types/theme";
import { Palette, X } from "lucide-react";

export default function ThemeToggle() {
  const { themeType, setTheme, currentTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: ThemeType[] = [
    "ocean-blue",
    "neon-purple",
    "sunset-orange",
    "classic-glass",
  ];

  return (
    <div className="fixed bottom-[2em] right-[2em] z-50">
      {/* Theme Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-[5em] right-0 w-[16em] p-[1em] rounded-[1.5em] glass-strong border border-white/20 backdrop-blur-2xl"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-[1em]">
              <h3 className="text-[1em] font-semibold text-white/90">
                Choose Theme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-[0.3em] rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close theme selector"
              >
                <X className="w-[1.2em] h-[1.2em] text-white/70" />
              </button>
            </div>

            {/* Theme Options */}
            <div className="space-y-[0.75em]">
              {themes.map((theme) => {
                const themeData = THEMES[theme];
                const isActive = themeType === theme;

                return (
                  <motion.button
                    key={theme}
                    onClick={() => {
                      setTheme(theme);
                      setTimeout(() => setIsOpen(false), 400);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-[0.85em] rounded-[1em] border text-left transition-all duration-300 ${
                      isActive
                        ? "border-white/40 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-[0.6em] mb-[0.3em]">
                          <div
                            className="w-[2em] h-[2em] rounded-full border-2 border-white/20"
                            style={{
                              background: `linear-gradient(135deg, ${themeData.colors.primary}, ${themeData.colors.accent})`,
                              boxShadow: `0 0 1em ${themeData.colors.primaryGlow}`,
                            }}
                          />
                          <span className="text-[0.95em] font-medium text-white/90">
                            {themeData.name}
                          </span>
                        </div>
                        <p className="text-[0.75em] text-white/60">
                          {themeData.description}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-[0.6em] h-[0.6em] rounded-full ml-[0.5em]"
                          style={{
                            background: themeData.colors.primary,
                            boxShadow: `0 0 0.8em ${themeData.colors.primaryGlow}`,
                          }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Preview Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5em]">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[3em] h-[3em] rounded-full opacity-20"
                  style={{
                    background: `radial-gradient(circle, ${currentTheme.colors.primary}, transparent)`,
                    filter: "blur(1em)",
                    top: `${20 + i * 25}%`,
                    left: `${10 + i * 30}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-[3.5em] h-[3.5em] rounded-full glass-strong border border-white/20 backdrop-blur-2xl flex items-center justify-center group overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
        }}
        aria-label="Toggle theme selector"
      >
        {/* Animated Glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${currentTheme.colors.primaryGlow}, transparent)`,
            filter: "blur(1em)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isTransitioning ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Palette
            className="w-[1.5em] h-[1.5em] relative z-10"
            style={{ color: currentTheme.colors.primary }}
          />
        </motion.div>

        {/* Rotating Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: `conic-gradient(from 0deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent}, ${currentTheme.colors.primary})`,
            mask: "radial-gradient(circle, transparent 60%, black 60%)",
            WebkitMask: "radial-gradient(circle, transparent 60%, black 60%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Active Theme Indicator Dot */}
        <motion.div
          className="absolute bottom-[0.4em] right-[0.4em] w-[0.8em] h-[0.8em] rounded-full border-2 border-white/30"
          style={{
            background: currentTheme.colors.primary,
            boxShadow: `0 0 0.6em ${currentTheme.colors.primaryGlow}`,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
}
