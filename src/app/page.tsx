import AboutMeSection from "@/components/sections/about-me-section";
import ContactsSection from "@/components/sections/contacts-section";
import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import QuoteSection from "@/components/sections/quote-section";
import SkillsSection from "@/components/sections/skills-section";

export default function Index() {
  return (
    <div className="px-2 sm:px-4 lg:px-6 min-h-screen bg-background text-white font-fira">
      {/* <SocialSidebar /> */}

      <main className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        <HeroSection />
        <QuoteSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutMeSection />
        <ContactsSection />
      </main>
    </div>
  );
}
