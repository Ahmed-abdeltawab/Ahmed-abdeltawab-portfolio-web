"use client";

import { motion } from "framer-motion";
import AboutHero from "@/components/about/about-hero";
import SkillMeter from "@/components/about/skill-meter";
import ExperienceTimeline from "@/components/about/experience-timeline";
import Reveal from "@/components/ui/reveal";
import {
  personalInfo,
  skills,
  experiences,
  achievements,
} from "@/data/aboutData";
import { getSkillsByCategory } from "@/data/about";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const skillCategories = [
    "Frontend",
    "Backend",
    "Tools",
    "Soft Skills",
  ] as const;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <AboutHero info={personalInfo} />

      {/* Achievements Section */}
      <section className="py-[4em] sm:py-[6em]">
        <div className="container mx-auto px-[1em] sm:px-[2em]">
          <Reveal>
            <div className="grid gap-[1.5em] sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement, index) => {
                const IconComponent = LucideIcons[
                  achievement.icon as keyof typeof LucideIcons
                ] as React.ElementType;

                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="glass-card group relative rounded-[1.5em] p-[2em] text-center hover-scale-glow"
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute -inset-1 rounded-[1.5em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${achievement.color}40 0%, transparent 70%)`,
                        filter: "blur(20px)",
                      }}
                    />

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className="mb-[1em] inline-flex h-[4em] w-[4em] items-center justify-center rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
                        }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {IconComponent && (
                          <IconComponent
                            className="h-[2em] w-[2em]"
                            style={{ color: achievement.color }}
                          />
                        )}
                      </motion.div>

                      {/* Metric */}
                      <h3
                        className="mb-[0.5em] text-[2.5em] font-bold"
                        style={{ color: achievement.color }}
                      >
                        {achievement.metric}
                      </h3>

                      {/* Title */}
                      <h4 className="mb-[0.25em] text-[1.1em] font-semibold text-foreground">
                        {achievement.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[0.9em] text-foreground/60">
                        {achievement.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-[4em] sm:py-[6em] bg-background/50">
        <div className="container mx-auto px-[1em] sm:px-[2em]">
          <Reveal>
            <div className="mb-[3em] text-center">
              <h2 className="text-gradient-animated mb-[0.5em] text-[2.5em] sm:text-[3em] font-bold">
                Skills & Expertise
              </h2>
              <p className="mx-auto max-w-[40em] text-[1.1em] text-foreground/70">
                Proficient in modern web technologies with a focus on creating
                exceptional user experiences
              </p>
            </div>
          </Reveal>

          {/* Skills by Category */}
          <div className="space-y-[4em]">
            {skillCategories.map((category) => {
              const categorySkills = getSkillsByCategory(skills, category);
              if (categorySkills.length === 0) return null;

              return (
                <div key={category}>
                  <Reveal>
                    <h3 className="mb-[2em] text-[1.8em] font-bold text-foreground/90">
                      {category}
                    </h3>
                  </Reveal>

                  <div className="grid gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categorySkills.map((skill, index) => (
                      <SkillMeter
                        key={skill.name}
                        skill={skill}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-[4em] sm:py-[6em]">
        <div className="container mx-auto px-[1em] sm:px-[2em]">
          <Reveal>
            <div className="mb-[3em] text-center">
              <h2 className="text-gradient-animated mb-[0.5em] text-[2.5em] sm:text-[3em] font-bold">
                Work Experience
              </h2>
              <p className="mx-auto max-w-[40em] text-[1.1em] text-foreground/70">
                My professional journey and key contributions
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-[55em]">
            <ExperienceTimeline experiences={experiences} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[4em] sm:py-[6em] bg-background/50">
        <div className="container mx-auto px-[1em] sm:px-[2em]">
          <Reveal>
            <div className="glass-strong mx-auto max-w-[50em] rounded-[2em] border-gradient-animated p-[3em] text-center">
              <h2 className="text-gradient-animated mb-[1em] text-[2em] sm:text-[2.5em] font-bold">
                Let's Work Together
              </h2>
              <p className="mb-[2em] text-[1.1em] text-foreground/70">
                Have a project in mind? I'd love to hear about it. Let's create
                something amazing together.
              </p>
              <div className="flex flex-wrap justify-center gap-[1em]">
                <Link
                  href="/contact"
                  className="glass-button bg-primary/20 px-[2em] py-[0.75em] text-[1em] font-medium transition-all hover:scale-105 hover:bg-primary/30 rounded-[0.75em]"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/works"
                  className="glass-button px-[2em] py-[0.75em] text-[1em] font-medium transition-all hover:scale-105 hover:bg-white/10 rounded-[0.75em]"
                >
                  View My Work
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
