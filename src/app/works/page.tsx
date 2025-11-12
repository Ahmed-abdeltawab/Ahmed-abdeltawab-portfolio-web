'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/projects/project-card'
import ProjectModal from '@/components/projects/project-modal'
import ProjectsFilter from '@/components/projects/projects-filter'
import {
  Project,
  ProjectCategory,
  enhancedProjects,
  filterProjectsByCategory,
  sortProjects,
} from '@/data/enhancedProjects'
import Reveal from '@/components/ui/reveal'

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'category'>('date')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    // First filter by category
    const filtered =
      activeCategory === 'All'
        ? enhancedProjects
        : filterProjectsByCategory(enhancedProjects, activeCategory)

    // Then sort
    return sortProjects(filtered, sortBy)
  }, [activeCategory, sortBy])

  // Handle project card click
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Wait for animation to complete before clearing selection
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen py-[4em] sm:py-[6em]">
      <div className="container mx-auto px-[1em] sm:px-[2em]">
        {/* Filter Section */}
        <Reveal>
          <ProjectsFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            projectCount={filteredAndSortedProjects.length}
          />
        </Reveal>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}`}
            className="grid gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredAndSortedProjects.length > 0 ? (
              filteredAndSortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="glass-card col-span-full rounded-[1em] p-[3em] text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[1.2em] text-foreground/60">
                  No projects found in this category.
                </p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="glass-button mt-[1em] px-[1.5em] py-[0.75em] transition-all hover:scale-105"
                >
                  View All Projects
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
