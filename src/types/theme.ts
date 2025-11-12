/**
 * Theme System Types
 * Defines all theme variants and their properties
 */

export type ThemeType =
  | "ocean-blue"
  | "neon-purple"
  | "sunset-orange"
  | "classic-glass";

export interface ThemeColors {
  // Primary theme colors
  primary: string;
  primaryGlow: string;
  accent: string;
  accentGlow: string;

  // Gradient colors for liquid effects
  gradient1: string;
  gradient2: string;
  gradient3: string;
  gradient4: string;

  // Background and surface
  background: string;
  surface: string;
  surfaceAlt: string;

  // Glass properties
  glassBlur: string;
  glassOpacity: number;
  borderOpacity: number;

  // Glow intensity
  glowIntensity: number;
}

export interface Theme {
  name: string;
  type: ThemeType;
  colors: ThemeColors;
  description: string;
}

/**
 * Pre-defined theme configurations
 */
export const THEMES: Record<ThemeType, Theme> = {
  "ocean-blue": {
    name: "Ocean Blue",
    type: "ocean-blue",
    description: "Deep cosmic blue with cyan accents",
    colors: {
      primary: "oklch(0.7 0.19 230)", // Electric blue/cyan
      primaryGlow: "oklch(0.7 0.19 230 / 0.3)",
      accent: "oklch(0.68 0.24 310)", // Magenta
      accentGlow: "oklch(0.68 0.24 310 / 0.3)",
      gradient1: "oklch(0.7 0.19 230)", // Cyan
      gradient2: "oklch(0.68 0.24 310)", // Magenta
      gradient3: "oklch(0.75 0.18 280)", // Purple
      gradient4: "oklch(0.65 0.2 190)", // Teal
      background: "oklch(0.15 0.02 250)",
      surface: "oklch(0.22 0.035 260 / 0.6)",
      surfaceAlt: "oklch(0.28 0.04 260 / 0.5)",
      glassBlur: "20px",
      glassOpacity: 0.6,
      borderOpacity: 0.3,
      glowIntensity: 0.5,
    },
  },

  "neon-purple": {
    name: "Neon Purple",
    type: "neon-purple",
    description: "Vibrant purple and pink gradients",
    colors: {
      primary: "oklch(0.65 0.28 310)", // Neon purple
      primaryGlow: "oklch(0.65 0.28 310 / 0.4)",
      accent: "oklch(0.7 0.3 350)", // Hot pink
      accentGlow: "oklch(0.7 0.3 350 / 0.4)",
      gradient1: "oklch(0.65 0.28 310)", // Purple
      gradient2: "oklch(0.7 0.3 350)", // Pink
      gradient3: "oklch(0.6 0.25 330)", // Magenta
      gradient4: "oklch(0.68 0.22 290)", // Deep purple
      background: "oklch(0.12 0.04 310)",
      surface: "oklch(0.20 0.06 310 / 0.65)",
      surfaceAlt: "oklch(0.25 0.07 310 / 0.55)",
      glassBlur: "24px",
      glassOpacity: 0.65,
      borderOpacity: 0.35,
      glowIntensity: 0.7,
    },
  },

  "sunset-orange": {
    name: "Sunset Orange",
    type: "sunset-orange",
    description: "Warm orange and gold tones",
    colors: {
      primary: "oklch(0.72 0.22 50)", // Vibrant orange
      primaryGlow: "oklch(0.72 0.22 50 / 0.4)",
      accent: "oklch(0.78 0.18 80)", // Golden yellow
      accentGlow: "oklch(0.78 0.18 80 / 0.4)",
      gradient1: "oklch(0.72 0.22 50)", // Orange
      gradient2: "oklch(0.78 0.18 80)", // Gold
      gradient3: "oklch(0.68 0.25 30)", // Red-orange
      gradient4: "oklch(0.75 0.2 65)", // Amber
      background: "oklch(0.15 0.03 40)",
      surface: "oklch(0.22 0.05 45 / 0.6)",
      surfaceAlt: "oklch(0.28 0.06 50 / 0.5)",
      glassBlur: "22px",
      glassOpacity: 0.6,
      borderOpacity: 0.3,
      glowIntensity: 0.6,
    },
  },

  "classic-glass": {
    name: "Classic Glass",
    type: "classic-glass",
    description: "Elegant transparent glass with subtle reflections",
    colors: {
      primary: "oklch(0.85 0.02 250)", // Soft white-blue
      primaryGlow: "oklch(0.85 0.02 250 / 0.2)",
      accent: "oklch(0.75 0.03 240)", // Light gray-blue
      accentGlow: "oklch(0.75 0.03 240 / 0.2)",
      gradient1: "oklch(0.85 0.02 250)", // White
      gradient2: "oklch(0.75 0.03 240)", // Light gray
      gradient3: "oklch(0.65 0.02 230)", // Medium gray
      gradient4: "oklch(0.80 0.02 260)", // Soft blue-gray
      background: "oklch(0.10 0.01 240)",
      surface: "oklch(0.20 0.02 240 / 0.4)",
      surfaceAlt: "oklch(0.25 0.02 240 / 0.35)",
      glassBlur: "28px",
      glassOpacity: 0.4,
      borderOpacity: 0.2,
      glowIntensity: 0.3,
    },
  },
};
