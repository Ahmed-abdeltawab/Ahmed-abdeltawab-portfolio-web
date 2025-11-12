"use client";

import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/section-title";
import { projects } from "@/data/projects";
import Reveal, { RevealScale } from "@/components/ui/reveal";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const displayProjects = projects.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Reveal>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-12 sm:mb-16">
          <SectionTitle title="projects" />
          <Link
            href="/works"
            className="font-fira font-medium text-sm sm:text-base text-gradient hover:text-primary transition-colors whitespace-nowrap sm:ml-4 group"
          >
            View all
            <span className="inline-block group-hover:translate-x-1 transition-transform ml-1">
              →
            </span>
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayProjects.map((project, index) => (
          <RevealScale key={index} delay={index * 0.1}>
            <motion.article
              className="glass-card rounded-2xl overflow-hidden hover-scale-glow group"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={`/${project.img}`}
                  alt={`${project.name} project screenshot`}
                  width={661}
                  height={400}
                  className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-fira glass rounded-full text-primary border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-3 py-1 text-xs font-fira glass rounded-full text-gray">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <h3 className="font-fira text-xl sm:text-2xl font-semibold text-white group-hover:text-gradient transition-all duration-300">
                  {project.name}
                </h3>

                <p className="font-fira text-sm sm:text-base text-gray leading-relaxed line-clamp-2">
                  {project.points[0]}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button px-4 py-2 sm:px-5 sm:py-2.5 font-fira font-medium text-xs sm:text-sm rounded-lg w-full flex items-center justify-center gap-2"
                >
                  View Details
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.article>
          </RevealScale>
        ))}
      </div>
    </section>
  );
}
