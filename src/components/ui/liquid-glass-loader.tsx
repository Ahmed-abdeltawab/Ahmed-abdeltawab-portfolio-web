"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/personalInfo";
import { useTheme } from "@/components/providers/theme-provider";

interface LiquidGlassLoaderProps {
  duration?: number; // Duration in milliseconds
  onComplete?: () => void;
}

export default function LiquidGlassLoader({
  duration = 2000,
  onComplete,
}: LiquidGlassLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Set timer to hide loader
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Extract first name for display
  const firstName = personalInfo.name.split(" ")[0];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Animated background gradient orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-[20%] left-[10%] h-[30em] w-[30em] rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${currentTheme.colors.primary} 0%, transparent 70%)`,
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-[20%] right-[10%] h-[25em] w-[25em] rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${currentTheme.colors.accent} 0%, transparent 70%)`,
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          {/* Main Glass Bubble Container */}
          <div className="relative">
            {/* Outer glow ring - pulsing */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle at center, ${currentTheme.colors.primaryGlow} 0%, ${currentTheme.colors.accentGlow} 50%, transparent 70%)`,
                filter: "blur(40px)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [
                  0.4 * currentTheme.colors.glowIntensity,
                  0.8 * currentTheme.colors.glowIntensity,
                  0.4 * currentTheme.colors.glowIntensity,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Main Glass Bubble */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative"
            >
              {/* Glass bubble with floating animation */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="glass-strong relative h-[18em] w-[18em] sm:h-[22em] sm:w-[22em] rounded-full border-[0.15em] border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}15, ${currentTheme.colors.accent}10)`,
                }}
              >
                {/* Rotating gradient border effect */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${currentTheme.colors.primary}60, transparent 120deg, ${currentTheme.colors.accent}60, transparent)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-[1em] rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${currentTheme.colors.primaryGlow}, transparent 60%)`,
                    opacity: currentTheme.colors.glowIntensity * 0.8,
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${currentTheme.colors.primary}30 50%, transparent 100%)`,
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-[2em]">
                  {/* Logo/Brand */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-center"
                  >
                    {/* First Name */}
                    <motion.h1
                      className="text-gradient-animated mb-[0.3em] text-[2.5em] sm:text-[3.5em] font-bold leading-none"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {firstName}
                    </motion.h1>

                    {/* Role */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-[0.95em] sm:text-[1.1em] font-medium text-foreground/70"
                    >
                      {personalInfo.role}
                    </motion.p>
                  </motion.div>

                  {/* Loading indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="mt-[2em] flex gap-[0.5em]"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-[0.5em] w-[0.5em] rounded-full bg-primary"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Floating sparkle particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[0.3em] w-[0.3em] rounded-full bg-primary/60"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -30 - Math.random() * 20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Additional decorative rings */}
            <motion.div
              className="absolute inset-[-2em] rounded-full border border-primary/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-[-3em] rounded-full border border-primary/10"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          {/* Ambient floating particles in background */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[0.4em] w-[0.4em] rounded-full bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60 - Math.random() * 40, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
