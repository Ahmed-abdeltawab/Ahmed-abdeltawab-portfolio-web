import { Github, Linkedin } from "lucide-react";
import Logo from "@/components/ui/logo";
import { personalInfo } from "@/data/personalInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray mt-8 sm:mt-12 md:mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-3 sm:mb-4">
              <Logo />
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-fira text-sm sm:text-base text-gray hover:text-white transition-colors break-all"
              >
                {personalInfo.email}
              </a>
            </div>
            <p className="font-fira text-sm sm:text-base text-white">
              {personalInfo.role}
            </p>
          </div>

          <div>
            <h3 className="font-fira text-xl sm:text-2xl font-medium mb-2 sm:mb-3">
              Media
            </h3>
            <div className="flex gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 sm:w-8 sm:h-8" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center font-fira text-xs sm:text-sm text-gray mt-8 sm:mt-12">
          © Copyright {currentYear}. Made by {personalInfo.name.split(" ")[0]}
        </p>
      </div>
    </footer>
  );
}
