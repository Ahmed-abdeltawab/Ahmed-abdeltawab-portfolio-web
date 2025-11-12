"use client";

import SectionTitle from "@/components/ui/section-title";
import Dots from "@/components/ui/dots";
import { skills } from "@/data/skills";
import Reveal, { RevealSlide } from "@/components/ui/reveal";
import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[][];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      skills.frontend.slice(0, 5),
      skills.frontend.slice(5, 10),
      skills.frontend.slice(10),
    ].filter((arr) => arr.length > 0),
  },
  {
    title: "Deployment",
    skills: [skills.deployment],
  },
  {
    title: "Tools",
    skills: [skills.tools.slice(0, 4), skills.tools.slice(4)].filter(
      (arr) => arr.length > 0
    ),
  },
  {
    title: "AI Tools",
    skills: [skills.aiTools.slice(0, 4), skills.aiTools.slice(4)].filter(
      (arr) => arr.length > 0
    ),
  },
];

export default function SkillsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Reveal>
        <SectionTitle title="skills" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-12">
        <Reveal delay={0.2} className="relative hidden md:block">
          <div className="absolute top-12 left-0 float">
            <Dots rows={5} cols={5} />
          </div>
          <div
            className="absolute bottom-0 left-44 float"
            style={{ animationDelay: "1s" }}
          >
            <Dots rows={5} cols={5} />
          </div>
          <motion.div
            className="absolute bottom-0 right-0 w-14 h-14 glass-card"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 right-16 w-24 h-24 glass-card"
            animate={{ rotate: [0, -90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </Reveal>

        <div className="grid gap-4 sm:gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <RevealSlide
              key={category.title}
              delay={0.1 * categoryIndex}
              direction="right"
            >
              <motion.div
                className="glass-card rounded-xl overflow-hidden hover-scale-glow"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 sm:p-5 border-b border-primary/30 bg-linear-to-r from-primary/10 to-accent/10">
                  <h3 className="font-fira font-bold text-base sm:text-lg text-gradient">
                    {category.title}
                  </h3>
                </div>
                <div className="p-4 sm:p-5 space-y-3">
                  {category.skills.map((skillRow, index) => (
                    <div key={index} className="flex flex-wrap gap-2">
                      {skillRow.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1.5 text-xs sm:text-sm font-fira glass rounded-lg text-gray hover:text-white transition-colors cursor-default border border-primary/20"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            </RevealSlide>
          ))}
        </div>
      </div>
    </section>
  );
}
