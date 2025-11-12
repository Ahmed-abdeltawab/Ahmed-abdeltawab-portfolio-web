"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Skill } from "@/data/about";

interface SkillMeterProps {
  skill: Skill;
  index: number;
}

export default function SkillMeter({ skill, index }: SkillMeterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (skill.proficiency / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.05, y: -8 }}
      className="glass-card relative flex flex-col items-center justify-center rounded-[1.5em] p-[2em] group"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 rounded-[1.5em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${
            skill.color || "#00f7ff"
          }40 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* SVG Circular Progress */}
      <div className="relative z-10 mb-[1.5em]">
        <svg
          className="transform -rotate-90"
          width="120"
          height="120"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="6"
            fill="none"
          />

          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={skill.color || "#00f7ff"}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: isInView ? offset : circumference,
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.1 + 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              filter: `drop-shadow(0 0 8px ${skill.color || "#00f7ff"}80)`,
            }}
          />

          {/* Center percentage text */}
          <motion.text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[1.2em] font-bold fill-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          >
            {skill.proficiency}%
          </motion.text>
        </svg>

        {/* Liquid fill effect overlay (decorative) */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${
              skill.color || "#00f7ff"
            }60 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Skill name */}
      <motion.h3
        className="relative z-10 text-center text-[1em] font-semibold text-foreground mb-[0.5em]"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {skill.name}
      </motion.h3>

      {/* Category badge */}
      <motion.span
        className="glass-card relative z-10 rounded-[0.5em] px-[0.75em] py-[0.25em] text-[0.75em] font-medium"
        style={{ color: skill.color || "#00f7ff" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {skill.category}
      </motion.span>
    </motion.div>
  );
}
