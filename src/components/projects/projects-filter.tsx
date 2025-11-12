"use client";

import { motion } from "framer-motion";
import { Filter, SortAsc } from "lucide-react";
import { ProjectCategory } from "@/data/enhancedProjects";

interface ProjectsFilterProps {
  activeCategory: ProjectCategory | "All";
  onCategoryChange: (category: ProjectCategory | "All") => void;
  sortBy: "date" | "name" | "category";
  onSortChange: (sort: "date" | "name" | "category") => void;
  projectCount: number;
}

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Frontend",
  "Full-Stack",
  "AI/ML",
  "E-Commerce",
  "Personal",
];

const sortOptions = [
  { value: "date", label: "Latest First" },
  { value: "name", label: "Name (A-Z)" },
  { value: "category", label: "Category" },
] as const;

export default function ProjectsFilter({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  projectCount,
}: ProjectsFilterProps) {
  return (
    <div className="mb-[3em] space-y-[1.5em]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-[1em]">
        <div>
          <h2 className="text-gradient-animated text-[2.5em] font-bold">
            All Projects
          </h2>
          <p className="mt-[0.25em] text-[1em] text-foreground/60">
            Showing {projectCount} {projectCount === 1 ? "project" : "projects"}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="glass-card flex items-center gap-[0.5em] rounded-[0.75em] px-[1em] py-[0.5em]">
          <SortAsc className="h-[1.2em] w-[1.2em] text-primary/70" />
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "date" | "name" | "category")
            }
            className="bg-transparent text-[0.95em] font-medium outline-none cursor-pointer"
            aria-label="Sort projects"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-background text-foreground"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-[0.5em] overflow-x-auto pb-[0.5em]">
        <Filter className="h-[1.2em] w-[1.2em] shrink-0 text-foreground/50" />
        <div className="flex gap-[0.5em]">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`glass-card relative overflow-hidden whitespace-nowrap rounded-[0.75em] px-[1.25em] py-[0.5em] text-[0.95em] font-medium transition-all hover:scale-105 ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-lg shadow-primary/20"
                    : "text-foreground/70 hover:bg-white/10 hover:text-foreground"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={isActive}
                aria-label={`Filter by ${category}`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border-gradient-animated rounded-[0.75em]"
                    layoutId="activeCategory"
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  />
                )}

                {/* Text */}
                <span className="relative z-10">{category}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeCategory !== "All" && (
        <motion.div
          className="glass-card flex items-center justify-between gap-[1em] rounded-[0.75em] bg-primary/5 px-[1.25em] py-[0.75em]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <p className="text-[0.95em] text-foreground/70">
            Filtered by:{" "}
            <span className="font-semibold text-primary">{activeCategory}</span>
          </p>
          <button
            onClick={() => onCategoryChange("All")}
            className="text-[0.9em] font-medium text-foreground/50 underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground/80"
          >
            Clear filter
          </button>
        </motion.div>
      )}
    </div>
  );
}
