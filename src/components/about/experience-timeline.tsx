"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Experience } from "@/data/about";
import {
  MapPin,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div ref={ref} className="relative flex gap-[2em]">
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="relative z-10"
        >
          <div
            className={`h-[1em] w-[1em] rounded-full ${
              experience.current
                ? "bg-primary glow-primary animate-pulse"
                : "bg-accent/60"
            }`}
          />
          {experience.current && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.2 + 0.2,
            }}
            className="h-full w-[0.125em] bg-linear-to-b from-primary/60 via-accent/40 to-primary/20 origin-top mt-[0.5em]"
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.2 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="glass-card group relative flex-1 rounded-[1.5em] border border-white/10 p-[2em] mb-[2em] hover-scale-glow"
      >
        {/* Current badge */}
        {experience.current && (
          <div className="absolute -top-[0.75em] right-[2em]">
            <span className="glass-strong rounded-[0.5em] px-[0.75em] py-[0.25em] text-[0.75em] font-semibold text-primary border border-primary/30">
              Current
            </span>
          </div>
        )}

        {/* Header */}
        <div className="mb-[1.5em]">
          <div className="flex items-start justify-between gap-[1em] mb-[0.5em]">
            <div>
              <h3 className="text-gradient-animated text-[1.5em] font-bold mb-[0.25em]">
                {experience.position}
              </h3>
              <div className="flex items-center gap-[0.5em]">
                <h4 className="text-[1.1em] font-semibold text-foreground/80">
                  {experience.company}
                </h4>
                {experience.companyUrl && (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/60 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-[1em] w-[1em]" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-[1em] text-[0.9em] text-foreground/60">
            <div className="flex items-center gap-[0.5em]">
              <Calendar className="h-[1.2em] w-[1.2em] text-primary/70" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-[0.5em]">
              <MapPin className="h-[1.2em] w-[1.2em] text-accent/70" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-[1.5em] text-[0.95em] leading-relaxed text-foreground/70">
          {experience.description}
        </p>

        {/* Highlights */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : "0" }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mb-[1.5em]">
            <h5 className="mb-[0.75em] text-[0.9em] font-semibold text-foreground/80">
              Key Highlights:
            </h5>
            <ul className="space-y-[0.5em]">
              {experience.highlights?.map((highlight, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-[0.75em] text-[0.9em] leading-relaxed text-foreground/70"
                >
                  <span className="mt-[0.35em] h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-linear-to-r from-primary to-accent" />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Technologies */}
        <div className="mb-[1em]">
          <div className="flex flex-wrap gap-[0.5em]">
            {experience.technologies?.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.3 + i * 0.05 }}
                className="glass-card rounded-[0.5em] px-[0.75em] py-[0.25em] text-[0.8em] font-medium text-foreground/70 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Expand/Collapse button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-button mt-[1em] flex w-full items-center justify-center gap-[0.5em] rounded-[0.75em] px-[1em] py-[0.5em] text-[0.9em] font-medium transition-all hover:bg-white/10"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-[1.2em] w-[1.2em]" />
            </>
          ) : (
            <>
              <span>View Details</span>
              <ChevronDown className="h-[1.2em] w-[1.2em]" />
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  );
}
