"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeType, Theme, THEMES } from "@/types/theme";

interface ThemeContextType {
  currentTheme: Theme;
  themeType: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>("ocean-blue");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("liquid-glass-theme") as ThemeType;
    if (savedTheme && THEMES[savedTheme]) {
      setThemeType(savedTheme);
    }
  }, []);

  // Apply theme to CSS variables
  useEffect(() => {
    if (!mounted) return;

    const theme = THEMES[themeType];
    const root = document.documentElement;

    // Trigger transition animation
    setIsTransitioning(true);

    // Apply theme colors to CSS variables
    root.style.setProperty("--color-primary", theme.colors.primary);
    root.style.setProperty("--color-primary-glow", theme.colors.primaryGlow);
    root.style.setProperty("--color-accent", theme.colors.accent);
    root.style.setProperty("--color-accent-glow", theme.colors.accentGlow);
    root.style.setProperty("--color-gradient-1", theme.colors.gradient1);
    root.style.setProperty("--color-gradient-2", theme.colors.gradient2);
    root.style.setProperty("--color-gradient-3", theme.colors.gradient3);
    root.style.setProperty("--color-gradient-4", theme.colors.gradient4);
    root.style.setProperty("--color-background", theme.colors.background);
    root.style.setProperty("--color-surface", theme.colors.surface);
    root.style.setProperty("--color-surface-alt", theme.colors.surfaceAlt);

    // Update card and other component colors
    root.style.setProperty("--color-card", theme.colors.surface);
    root.style.setProperty("--color-secondary", theme.colors.surfaceAlt);
    root.style.setProperty("--color-muted", theme.colors.surfaceAlt);

    // Store glow intensity as a CSS variable for easy access
    root.style.setProperty(
      "--glow-intensity",
      theme.colors.glowIntensity.toString()
    );

    // Save to localStorage
    localStorage.setItem("liquid-glass-theme", themeType);

    // Reset transition state after animation completes
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [themeType, mounted]);

  const setTheme = (newTheme: ThemeType) => {
    if (newTheme === themeType) return;
    setThemeType(newTheme);
  };

  const value: ThemeContextType = {
    currentTheme: THEMES[themeType],
    themeType,
    setTheme,
    isTransitioning,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
