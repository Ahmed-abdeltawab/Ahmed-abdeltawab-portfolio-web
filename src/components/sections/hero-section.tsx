"use client";

import Dots from "@/components/ui/dots";
import { personalInfo } from "@/data/personalInfo";
import { projects } from "@/data/projects";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal, { RevealSlide } from "@/components/ui/reveal";

export default function HeroSection() {
  const currentWorking = "Aydn Labs";

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center relative min-h-[80vh]">
      <Reveal delay={0.2} className="order-2 md:order-1 space-y-6 sm:space-y-8">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass-card rounded-full text-xs sm:text-sm font-medium text-gradient-animated">
              Available for freelance
            </span>
          </motion.div>

          <h1 className="font-fira font-bold text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] leading-tight mb-6">
            <span className="text-white">
              {personalInfo.name.split(" ")[0]} is a{" "}
            </span>
            <br />
            <span className="text-gradient-animated inline-block">
              {personalInfo.role}
            </span>
          </h1>
        </div>

        <p className="font-fira text-sm sm:text-base md:text-lg text-gray leading-relaxed max-w-lg">
          Building scalable, high-performance applications with React, Next.js,
          and TypeScript
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button className="glass-button px-6 py-3 sm:px-8 sm:py-4 font-fira font-medium text-sm sm:text-base text-white rounded-lg hover-scale-glow group relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Contact me
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>
        </motion.div>
      </Reveal>

      <RevealSlide
        delay={0.4}
        direction="right"
        className="relative order-1 md:order-2"
      >
        <div className="relative z-10 max-w-sm sm:max-w-md md:max-w-full mx-auto">
          <motion.div
            className="relative glass-card rounded-3xl p-6 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/20 opacity-50" />

            <Image
              src={`/${personalInfo.img}`}
              alt={`${personalInfo.name} - Developer portrait`}
              width={500}
              height={500}
              className="w-full h-auto relative z-10 rounded-2xl"
              priority
            />

            {/* Floating dots */}
            <div className="absolute bottom-6 right-6 hidden md:block float">
              <Dots />
            </div>
          </motion.div>
        </div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card border-gradient-animated p-3 sm:p-4 inline-flex items-center gap-3 mt-6 rounded-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full glow-primary shrink-0"
          />
          <span className="font-fira text-xs sm:text-sm text-gray">
            Currently working on{" "}
            <span className="text-white font-semibold">
              {currentWorking}
            </span>
          </span>
        </motion.div>
      </RevealSlide>
    </section>
  );
}
