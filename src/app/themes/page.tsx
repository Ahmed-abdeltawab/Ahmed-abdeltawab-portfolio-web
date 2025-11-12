"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import LiquidGlassCard from "@/components/ui/liquid-glass-card";
import { THEMES, ThemeType } from "@/types/theme";
import { Palette, Sparkles, Droplet, Sun, Frame } from "lucide-react";

export default function ThemeShowcasePage() {
  const { currentTheme, themeType, setTheme } = useTheme();

  const themeIcons: Record<ThemeType, any> = {
    "ocean-blue": Droplet,
    "neon-purple": Sparkles,
    "sunset-orange": Sun,
    "classic-glass": Frame,
  };

  return (
    <main className="container mx-auto px-[2em] py-[6em]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-[4em]"
      >
        <motion.div
          className="inline-block mb-[1em]"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Palette
            className="w-[4em] h-[4em] mx-auto"
            style={{ color: currentTheme.colors.primary }}
          />
        </motion.div>

        <h1 className="text-[3em] md:text-[4.5em] font-bold mb-[0.5em]">
          <span className="text-gradient">Liquid Glass Themes</span>
        </h1>

        <p className="text-[1.2em] text-foreground/70 max-w-[40em] mx-auto">
          Experience <strong>{currentTheme.name}</strong> —{" "}
          {currentTheme.description}
        </p>

        {/* Current Theme Indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-[1em] mt-[2em] px-[2em] py-[1em] rounded-[1.5em] border backdrop-blur-xl"
          style={{
            background: `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
            borderColor: `rgba(255, 255, 255, ${currentTheme.colors.borderOpacity})`,
            boxShadow: `0 0 2em ${currentTheme.colors.primaryGlow}`,
          }}
        >
          <div
            className="w-[2em] h-[2em] rounded-full border-2 border-white/30"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
              boxShadow: `0 0 1.5em ${currentTheme.colors.primaryGlow}`,
            }}
          />
          <span className="font-medium">Active: {currentTheme.name}</span>
        </motion.div>
      </motion.div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2em] mb-[4em]">
        {(Object.keys(THEMES) as ThemeType[]).map((theme, index) => {
          const themeData = THEMES[theme];
          const Icon = themeIcons[theme];
          const isActive = themeType === theme;

          return (
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setTheme(theme)}
              className="cursor-pointer"
            >
              <LiquidGlassCard
                variant={isActive ? "elevated" : "default"}
                className={isActive ? "border-2" : ""}
                style={{
                  borderColor: isActive
                    ? currentTheme.colors.primary
                    : undefined,
                }}
              >
                <div className="flex items-start gap-[1.5em]">
                  {/* Theme Icon */}
                  <div
                    className="w-[4em] h-[4em] rounded-[1em] flex items-center justify-center border backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${themeData.colors.primary}30, ${themeData.colors.accent}20)`,
                      borderColor: `rgba(255, 255, 255, ${themeData.colors.borderOpacity})`,
                      boxShadow: `0 0 1.5em ${themeData.colors.primaryGlow}`,
                    }}
                  >
                    <Icon
                      className="w-[2em] h-[2em]"
                      style={{ color: themeData.colors.primary }}
                    />
                  </div>

                  {/* Theme Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-[0.75em] mb-[0.5em]">
                      <h3 className="text-[1.5em] font-bold">
                        {themeData.name}
                      </h3>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-[0.75em] py-[0.25em] rounded-full text-[0.75em] font-medium"
                          style={{
                            background: currentTheme.colors.primary,
                            color: "white",
                          }}
                        >
                          Active
                        </motion.span>
                      )}
                    </div>

                    <p className="text-foreground/70 mb-[1em]">
                      {themeData.description}
                    </p>

                    {/* Color Palette Preview */}
                    <div className="flex gap-[0.5em]">
                      {[
                        themeData.colors.gradient1,
                        themeData.colors.gradient2,
                        themeData.colors.gradient3,
                        themeData.colors.gradient4,
                      ].map((color, i) => (
                        <div
                          key={i}
                          className="w-[2.5em] h-[2.5em] rounded-[0.5em] border border-white/20"
                          style={{
                            background: color,
                            boxShadow: `0 0 0.8em ${color}50`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Glow Intensity */}
                    <div className="mt-[1em] flex items-center gap-[0.5em]">
                      <span className="text-[0.85em] text-foreground/60">
                        Glow Intensity:
                      </span>
                      <div className="flex-1 h-[0.4em] rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: themeData.colors.primary,
                            width: `${themeData.colors.glowIntensity * 100}%`,
                          }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${themeData.colors.glowIntensity * 100}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.1 + 0.3,
                          }}
                        />
                      </div>
                      <span className="text-[0.85em] font-medium">
                        {Math.round(themeData.colors.glowIntensity * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2em]">
        <LiquidGlassCard variant="default">
          <h3 className="text-[1.5em] font-bold mb-[1em]">Default Variant</h3>
          <p className="text-foreground/70">
            Standard glassmorphism with balanced blur and glow. Perfect for main
            content cards.
          </p>
        </LiquidGlassCard>

        <LiquidGlassCard variant="elevated">
          <h3 className="text-[1.5em] font-bold mb-[1em]">Elevated Variant</h3>
          <p className="text-foreground/70">
            Enhanced glass effect with stronger blur and opacity. Ideal for
            highlighted content.
          </p>
        </LiquidGlassCard>

        <LiquidGlassCard variant="subtle" animated={false}>
          <h3 className="text-[1.5em] font-bold mb-[1em]">Subtle Variant</h3>
          <p className="text-foreground/70">
            Minimal glass styling for secondary information. Can disable
            animations for performance.
          </p>
        </LiquidGlassCard>
      </div>

      {/* Interactive Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-[4em] text-center"
      >
        <LiquidGlassCard variant="elevated" className="max-w-[50em] mx-auto">
          <h2 className="text-[2em] font-bold mb-[1em]">Interactive Theming</h2>
          <p className="text-foreground/70 mb-[2em]">
            Click any theme card above to instantly switch. All components
            update smoothly with 600ms transitions. Your preference is saved to
            localStorage.
          </p>

          <div className="flex flex-wrap justify-center gap-[1em]">
            {(Object.keys(THEMES) as ThemeType[]).map((theme) => (
              <motion.button
                key={theme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme)}
                className={`px-[2em] py-[1em] rounded-[1em] border backdrop-blur-xl font-medium transition-all duration-300 ${
                  themeType === theme ? "border-2" : ""
                }`}
                style={{
                  background:
                    themeType === theme
                      ? `linear-gradient(135deg, ${currentTheme.colors.primary}30, ${currentTheme.colors.accent}20)`
                      : `linear-gradient(135deg, ${currentTheme.colors.surface}, ${currentTheme.colors.surfaceAlt})`,
                  borderColor:
                    themeType === theme
                      ? currentTheme.colors.primary
                      : `rgba(255, 255, 255, ${currentTheme.colors.borderOpacity})`,
                  color:
                    themeType === theme
                      ? currentTheme.colors.primary
                      : "inherit",
                  boxShadow:
                    themeType === theme
                      ? `0 0 2em ${currentTheme.colors.primaryGlow}`
                      : "none",
                }}
              >
                {THEMES[theme].name}
              </motion.button>
            ))}
          </div>
        </LiquidGlassCard>
      </motion.div>
    </main>
  );
}
