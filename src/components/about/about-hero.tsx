"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Download } from "lucide-react";
import { PersonalInfo } from "@/data/about";
import Link from "next/link";
interface AboutHeroProps {
  info: PersonalInfo;
}

export default function AboutHero({ info }: AboutHeroProps) {
  const socialLinks = [
    ...(info.github
      ? [{ icon: Github, href: info.github, label: "GitHub" }]
      : []),
    ...(info.linkedin
      ? [{ icon: Linkedin, href: info.linkedin, label: "LinkedIn" }]
      : []),
    { icon: Mail, href: `mailto:${info.email}`, label: "Email" },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-[4em] overflow-hidden">
      {/* Particle background (decorative) */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[0.25em] w-[0.25em] rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-[1em] sm:px-[2em]">
        <div className="grid gap-[3em] lg:grid-cols-2 lg:gap-[4em] items-center">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.75 0.25 195 / 0.4) 0%, oklch(0.75 0.22 320 / 0.3) 50%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Image container */}
              <div className="glass-strong relative h-[20em] w-[20em] sm:h-[25em] sm:w-[25em] overflow-hidden rounded-full border-gradient-animated p-[0.5em]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={info.profileImage}
                    alt={info.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-[2em]"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="glass-card inline-block rounded-[0.75em] px-[1.25em] py-[0.5em] text-[0.9em] font-medium text-primary mb-[1em]">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-gradient-animated text-[2.5em] sm:text-[3.5em] font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {info.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              className="text-[1.5em] sm:text-[2em] font-semibold text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {info.title}
            </motion.h2>

            {/* Bio */}
            <motion.p
              className="text-[1.1em] leading-relaxed text-foreground/70 max-w-[35em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {info.bio}
            </motion.p>

            {/* Location - Optional */}
            {info.location && (
              <motion.div
                className="flex items-center gap-[0.5em] text-foreground/60"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <MapPin className="h-[1.2em] w-[1.2em] text-primary/70" />
                <span className="text-[0.95em]">{info.location}</span>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-[1em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/cv/ahmed-abdelTawab-frontend-developer.pdf"
                download={"ahmed-abdelTawab-frontend-developer.pdf"}
                className="glass-button flex items-center gap-[0.5em] bg-primary/20 px-[1.5em] py-[0.75em] text-[0.95em] font-medium transition-all hover:scale-105 hover:bg-primary/30 rounded-[0.75em]"
              >
                <Download className="h-[1.2em] w-[1.2em]" />
                Download CV
              </Link>
              <Link
                href="/contact"
                className="glass-button flex items-center gap-[0.5em] px-[1.5em] py-[0.75em] text-[0.95em] font-medium transition-all hover:scale-105 hover:bg-white/10 rounded-[0.75em]"
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-[1em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card flex h-[3em] w-[3em] items-center justify-center rounded-[0.75em] transition-all hover:scale-110 hover:bg-white/15"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                >
                  <social.icon className="h-[1.5em] w-[1.5em] text-foreground/70" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
