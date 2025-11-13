"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Calendar, Users } from "lucide-react";
import { Project } from "@/data/enhancedProjects";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  index,
  onClick,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const content = (
    <>
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, ${
            project.color || "#00f7ff"
          }40 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={
          isHovered ? { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] } : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Card container */}
      <div className="relative glass-card rounded-3xl overflow-hidden border-gradient-animated h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent opacity-60" />

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 left-4"
          >
            <span
              className="px-3 py-1.5 text-xs font-semibold glass-strong rounded-full border"
              style={{
                borderColor: `${project.color || "#00f7ff"}60`,
                color: project.color || "#00f7ff",
              }}
            >
              {project.category}
            </span>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
              className="absolute top-4 right-4"
            >
              <div className="w-3 h-3 bg-primary rounded-full glow-primary animate-pulse" />
            </motion.div>
          )}

          {/* Hover info overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 glass-overlay flex items-center justify-center gap-3 p-6"
          >
            {project.links?.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 glass-button rounded-full flex items-center justify-center"
              >
                {link.type === "github" ? (
                  <Github className="w-5 h-5" />
                ) : (
                  <ExternalLink className="w-5 h-5" />
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Card content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Project title */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-gradient-animated transition-all duration-300">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray leading-relaxed mb-4 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-gray mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.year}</span>
            </div>
            {project.stats?.team && (
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{project.stats.team}</span>
              </div>
            )}
          </div>

          {/* Tech stack pills - Show on hover */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-2.5 py-1 text-xs font-fira glass rounded-lg border"
                  style={{
                    borderColor: `${project.color || "#00f7ff"}30`,
                    color: project.color || "#00f7ff",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-fira glass rounded-lg text-gray">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </motion.div>

          {/* View Details button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full glass-button px-4 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 group/btn"
          >
            <span>View Details</span>
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      {onClick ? (
        <div onClick={handleClick} className="block h-full">
          {content}
        </div>
      ) : (
        <Link href={`/works/${project.slug}`} className="block h-full">
          {content}
        </Link>
      )}
    </motion.article>
  );
}
