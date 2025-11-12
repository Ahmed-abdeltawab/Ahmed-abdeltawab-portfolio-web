import SectionTitle from "@/components/ui/section-title";
import Dots from "@/components/ui/dots";
import Image from "next/image";
import { summary } from "@/data/summary";
import { personalInfo } from "@/data/personalInfo";

export default function AboutMeSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <SectionTitle title="about-me" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        <div className="order-2 md:order-1">
          <p className="font-fira text-sm sm:text-base text-gray leading-relaxed mb-6 sm:mb-8">
            Hello, I'm {personalInfo.name.split(" ")[0]}!
            <br />
            <br />
            {summary}
          </p>
          <button className="border border-primary px-3 py-2 sm:px-4 sm:py-2 font-fira font-medium text-xs sm:text-sm hover:bg-primary/10 transition-colors">
            Read more -&gt;
          </button>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="absolute top-8 sm:top-12 md:top-16 left-0 hidden md:block">
            <Dots />
          </div>
          <Image
            src={`/${personalInfo.img}`}
            alt="About me illustration"
            width={678}
            height={678}
            className="w-full max-w-sm sm:max-w-md md:max-w-full mx-auto relative z-10"
          />
          <div className="absolute bottom-0 right-12 sm:right-16 md:right-20 hidden md:block">
            <Dots rows={4} cols={5} />
          </div>
          <div className="w-full h-px bg-primary mt-0 md:ml-12"></div>
        </div>
      </div>
    </section>
  );
}
