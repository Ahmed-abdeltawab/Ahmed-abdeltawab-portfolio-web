"use client";

import Link from "next/link";
import SectionTitle from "@/components/ui/section-title";
import { enhancedProjects } from "@/data/enhancedProjects";
import Reveal, { RevealScale } from "@/components/ui/reveal";
import ProjectCard from "@/components/projects/project-card";
import { useRouter } from "next/navigation";

export default function ProjectsSection() {
  const router = useRouter();
  const displayProjects = enhancedProjects.slice(0, 3);

  const handleProjectClick = (slug: string) => {
    router.push(`/works/${slug}`);
  };

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
          <RevealScale key={project.id} delay={index * 0.1}>
            <ProjectCard
              project={project}
              index={index}
              onClick={() => handleProjectClick(project.slug)}
            />
          </RevealScale>
        ))}
      </div>
    </section>
  );
}
