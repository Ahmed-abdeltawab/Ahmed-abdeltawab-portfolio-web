"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Github,
  ExternalLink,
  Play,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Project } from "@/data/enhancedProjects";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare all images (main + gallery)
  const allImages = [project.img, ...(project.images || [])];

  // Navigate carousel
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  // Prepare chart data for progress visualization
  const progressData = [
    {
      name: "Completion",
      value: project.stats?.completion || 0,
      fill: "oklch(0.75 0.25 195)", // cyan
    },
  ];

  // Prepare tech stack distribution for bar chart
  const techStackData = project.techStack.slice(0, 6).map((tech, index) => ({
    name: tech,
    value: 100 - index * 10, // Simulated proficiency
    fill: index % 2 === 0 ? "oklch(0.75 0.25 195)" : "oklch(0.75 0.22 320)", // Alternate cyan/magenta
  }));

  // Close on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-[1em] sm:p-[2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(24px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
          />

          {/* Modal Content */}
          <motion.div
            className="glass-strong relative z-10 max-h-[90vh] w-full max-w-[75em] overflow-y-auto rounded-[1.5em] border border-white/10 p-[1.5em] sm:p-[2.5em] shadow-2xl"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="glass-button absolute right-[1em] top-[1em] z-20 p-[0.5em] transition-all hover:scale-110 hover:bg-white/20"
              aria-label="Close modal"
            >
              <X className="h-[1.5em] w-[1.5em]" />
            </button>

            {/* Image Carousel */}
            <div className="relative mb-[2em] aspect-video overflow-hidden rounded-[1em]">
              <Image
                src={allImages[currentImageIndex]}
                alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />

              {/* Navigation Arrows (if multiple images) */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="glass-button absolute left-[1em] top-1/2 -translate-y-1/2 p-[0.5em] transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-[1.5em] w-[1.5em]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="glass-button absolute right-[1em] top-1/2 -translate-y-1/2 p-[0.5em] transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-[1.5em] w-[1.5em]" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-[1em] left-1/2 flex -translate-x-1/2 gap-[0.5em]">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-[0.5em] rounded-full transition-all ${
                          index === currentImageIndex
                            ? "w-[2em] bg-primary"
                            : "w-[0.5em] bg-white/30 hover:bg-white/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Header */}
            <div className="mb-[2em]">
              <div className="mb-[1em] flex flex-wrap items-start justify-between gap-[1em]">
                <div>
                  <h2
                    id="modal-title"
                    className="text-gradient-animated mb-[0.5em] text-[2.5em] font-bold leading-tight"
                  >
                    {project.name}
                  </h2>
                  <p className="text-[1.1em] text-foreground/70">
                    {project.description}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-[0.5em]">
                  <span className="glass-card rounded-[0.5em] px-[0.75em] py-[0.25em] text-[0.85em] font-medium text-primary">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="glass-card flex items-center gap-[0.25em] rounded-[0.5em] bg-accent/10 px-[0.75em] py-[0.25em] text-[0.85em] font-medium text-accent">
                      <Award className="h-[1em] w-[1em]" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-[1.5em] text-[0.95em] text-foreground/60">
                <div className="flex items-center gap-[0.5em]">
                  <Calendar className="h-[1.2em] w-[1.2em] text-primary/70" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-[0.5em]">
                  <Clock className="h-[1.2em] w-[1.2em] text-primary/70" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-[0.5em]">
                  <TrendingUp className="h-[1.2em] w-[1.2em] text-primary/70" />
                  <span>{project.role}</span>
                </div>
              </div>
            </div>

            {/* Action Links */}
            {project.links && project.links.length > 0 && (
              <div className="mb-[2.5em] flex flex-wrap gap-[0.75em]">
                {project.links.find((link) => link.type === "github") && (
                  <a
                    href={
                      project.links.find((link) => link.type === "github")!.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button flex items-center gap-[0.5em] px-[1.25em] py-[0.75em] text-[0.95em] transition-all hover:scale-105 hover:bg-white/20"
                  >
                    <Github className="h-[1.2em] w-[1.2em]" />
                    View Code
                  </a>
                )}
                {project.links.find((link) => link.type === "live") && (
                  <a
                    href={
                      project.links.find((link) => link.type === "live")!.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button flex items-center gap-[0.5em] bg-primary/20 px-[1.25em] py-[0.75em] text-[0.95em] transition-all hover:scale-105 hover:bg-primary/30"
                  >
                    <ExternalLink className="h-[1.2em] w-[1.2em]" />
                    Live Demo
                  </a>
                )}
                {project.links.find((link) => link.type === "demo") && (
                  <a
                    href={
                      project.links.find((link) => link.type === "demo")!.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button flex items-center gap-[0.5em] px-[1.25em] py-[0.75em] text-[0.95em] transition-all hover:scale-105 hover:bg-white/20"
                  >
                    <Play className="h-[1.2em] w-[1.2em]" />
                    Watch Demo
                  </a>
                )}
              </div>
            )}

            {/* Charts Grid */}
            <div className="mb-[2.5em] grid gap-[1.5em] sm:grid-cols-2">
              {/* Progress Chart */}
              <div className="glass-card rounded-[1em] p-[1.5em]">
                <h3 className="mb-[1em] flex items-center gap-[0.5em] text-[1.2em] font-semibold">
                  <TrendingUp className="h-[1.2em] w-[1.2em] text-primary" />
                  Project Progress
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    data={progressData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      angleAxisId={0}
                      tick={false}
                    />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                      fill="oklch(0.75 0.25 195)"
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-[2em] font-bold"
                    >
                      {project.stats?.completion || 0}%
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              {/* Tech Stack Distribution */}
              <div className="glass-card rounded-[1em] p-[1.5em]">
                <h3 className="mb-[1em] text-[1.2em] font-semibold">
                  Tech Stack Proficiency
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={techStackData} layout="vertical">
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      stroke="rgba(255,255,255,0.3)"
                      tick={{ fontSize: "0.75em" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="rgba(255,255,255,0.3)"
                      width={80}
                      tick={{ fontSize: "0.75em" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(10, 10, 15, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "0.5em",
                        fontSize: "0.85em",
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mb-[2.5em]">
              <h3 className="mb-[1em] text-[1.5em] font-bold">
                Key Highlights
              </h3>
              <ul className="space-y-[0.75em]">
                {project.points.map((point, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-[0.75em] text-[1em] leading-relaxed text-foreground/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="mt-[0.35em] h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-linear-to-r from-primary to-accent" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div>
              <h3 className="mb-[1em] text-[1.5em] font-bold">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-[0.5em]">
                {project.techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="glass-card rounded-[0.5em] px-[1em] py-[0.5em] text-[0.9em] font-medium transition-all hover:scale-105 hover:bg-white/15"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ y: -2 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
