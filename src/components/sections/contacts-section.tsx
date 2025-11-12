import { Mail, Phone, Linkedin, Github } from "lucide-react";
import SectionTitle from "@/components/ui/section-title";
import { personalInfo } from "@/data/personalInfo";

export default function ContactsSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <SectionTitle title="contacts" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <p className="font-fira text-sm sm:text-base text-gray font-medium leading-relaxed">
            I'm interested in freelance opportunities. However, if you have
            other request or question, don't hesitate to contact me
          </p>
        </div>

        <div className="border border-gray p-3 sm:p-4">
          <h3 className="font-fira font-semibold text-sm sm:text-base mb-3 sm:mb-4">
            Message me here
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-gray shrink-0" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="font-fira text-xs sm:text-sm text-gray hover:text-white transition-colors break-all"
              >
                {personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-gray shrink-0" />
              <a
                href={`tel:${personalInfo.phone}`}
                className="font-fira text-xs sm:text-sm text-gray hover:text-white transition-colors"
              >
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-6 h-6 sm:w-8 sm:h-8 text-gray shrink-0" />
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fira text-xs sm:text-sm text-gray hover:text-white transition-colors"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-6 h-6 sm:w-8 sm:h-8 text-gray shrink-0" />
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fira text-xs sm:text-sm text-gray hover:text-white transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
