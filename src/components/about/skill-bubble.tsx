"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Skill } from "@/data/about";
import { useTheme } from "@/components/providers/theme-provider";

interface SkillBubbleProps {
  skill: Skill;
  index: number;
}

export default function SkillBubble({ skill, index }: SkillBubbleProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { currentTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate random floating animation values for each bubble
  const floatAnimation = {
    y: [0, -20 - Math.random() * 20, 0],
    x: [0, -10 + Math.random() * 20, 0],
    rotate: [0, -5 + Math.random() * 10, 0],
  };

  // Calculate size based on proficiency (larger = higher proficiency)
  const baseSize = 3.5 + (skill.proficiency / 100) * 2; // 3.5em to 5.5em
  const size = `${baseSize}em`;

  // Use theme colors if skill doesn't have custom color
  const skillColor = skill.color || currentTheme.colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
      }}
      animate={floatAnimation}
      className="relative group"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Outer glow ring - always visible, pulses */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle at center, ${skillColor}40 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7 * currentTheme.colors.glowIntensity, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />

      {/* Hover glow - appears on hover */}
      <motion.div
        className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${skillColor}60 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Main bubble */}
      <motion.div
        className="glass-strong relative flex h-full w-full items-center justify-center rounded-full border border-white/20 backdrop-blur-xl cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.15, rotate: 360 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background: `linear-gradient(135deg, ${skillColor}15, ${skillColor}05)`,
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${skillColor}30 50%, transparent 100%)`,
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        {/* Rotating gradient border effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${skillColor}40, transparent)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-[0.5em]">
          {/* Skill name */}
          <span
            className="text-[0.75em] font-bold leading-tight transition-colors duration-600"
            style={{ color: skillColor }}
          >
            {skill.name}
          </span>

          {/* Proficiency percentage - shows on hover */}
          <motion.span
            className="text-[0.6em] font-medium text-white/70 mt-[0.25em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
          >
            {skill.proficiency}%
          </motion.span>
        </div>

        {/* Sparkle particles on hover */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[0.25em] w-[0.25em] rounded-full opacity-0 group-hover:opacity-100"
            style={{
              background: skillColor,
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -bottom-[3em] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
      >
        <div className="glass-strong whitespace-nowrap rounded-[0.75em] border border-white/20 px-[1em] py-[0.5em] text-[0.85em]">
          <p className="font-semibold text-foreground">{skill.name}</p>
          <p className="text-[0.9em] text-foreground/70">
            Proficiency: {skill.proficiency}%
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
