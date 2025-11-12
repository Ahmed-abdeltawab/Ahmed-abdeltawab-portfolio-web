"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import Reveal from "@/components/ui/reveal";
import { MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-[6em] sm:py-[8em] overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
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
          <Reveal>
            <div className="mx-auto max-w-[50em] text-center">
              {/* Icon */}
              <motion.div
                className="mb-[2em] inline-flex h-[5em] w-[5em] items-center justify-center rounded-full bg-primary/10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <MessageCircle className="h-[2.5em] w-[2.5em] text-primary" />
              </motion.div>

              {/* Heading */}
              <h1 className="text-gradient-animated mb-[0.5em] text-[2.5em] sm:text-[4em] font-bold leading-tight">
                Let's Work Together
              </h1>

              {/* Description */}
              <p className="text-[1.1em] sm:text-[1.3em] leading-relaxed text-foreground/70">
                Have a project in mind or just want to say hi? Drop me a message
                and I'll get back to you as soon as possible.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-[4em] sm:py-[6em]">
        <div className="container mx-auto px-[1em] sm:px-[2em]">
          <div className="grid gap-[3em] lg:grid-cols-5 lg:gap-[4em]">
            {/* Contact Info - Left Column */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ContactInfo />
            </motion.div>

            {/* Contact Form - Right Column */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}


