"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Check,
  Copy,
} from "lucide-react";
import { personalInfo } from "@/data/personalInfo";

interface ContactInfoItem {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  color: string;
  copyable?: boolean;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "#00f7ff",
    copyable: true,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
    color: "#bf5af2",
    copyable: true,
  },
  // TODO: Add location field to personalInfo.ts if needed
  {
    icon: MapPin,
    label: "Location",
    value: "Fayoum, Egypt", // From education data
    href: "https://maps.google.com/?q=Fayoum,Egypt",
    color: "#4dabf7",
    copyable: false,
  },
];

const socialLinks: ContactInfoItem[] = [
  {
    icon: Github,
    label: "GitHub",
    value: "@" + personalInfo.github.split("/").pop(), // Extract username from URL
    href: personalInfo.github,
    color: "#00f7ff",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/" + personalInfo.linkedin.split("/in/").pop()?.split("/")[0], // Extract username
    href: personalInfo.linkedin,
    color: "#bf5af2",
  },
  // TODO: Add Twitter/X to personalInfo.ts if you have a profile
  // {
  //   icon: Twitter,
  //   label: "Twitter",
  //   value: "@yourusername",
  //   href: "https://twitter.com/yourusername",
  //   color: "#4dabf7",
  // },
];

export default function ContactInfo() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-[2em]">
      {/* Contact Information */}
      <div>
        <motion.h3
          className="mb-[1.5em] text-[1.5em] font-bold text-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h3>

        <div className="grid gap-[1em] sm:grid-cols-1">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={item.href}
                target={item.copyable ? undefined : "_blank"}
                rel={item.copyable ? undefined : "noopener noreferrer"}
                onClick={(e) => {
                  if (item.copyable) {
                    e.preventDefault();
                    handleCopy(item.value);
                  }
                }}
                className="glass-card group relative flex items-center gap-[1em] rounded-[1em] border border-white/10 p-[1.5em] transition-all hover:scale-[1.02] hover:border-white/20"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 rounded-[1em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${item.color}30 0%, transparent 70%)`,
                    filter: "blur(15px)",
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10 flex h-[3em] w-[3em] shrink-0 items-center justify-center rounded-[0.75em]"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                  }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon
                    className="h-[1.5em] w-[1.5em]"
                    style={{ color: item.color }}
                  />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 flex-1 min-w-0">
                  <p className="mb-[0.25em] text-[0.85em] font-medium text-foreground/60">
                    {item.label}
                  </p>
                  <p className="text-[1em] font-semibold text-foreground truncate">
                    {item.value}
                  </p>
                </div>

                {/* Copy button */}
                {item.copyable && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(item.value);
                    }}
                    className="glass-card relative z-10 rounded-[0.5em] p-[0.5em] transition-all hover:bg-white/15"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedValue === item.value ? (
                      <Check className="h-[1.2em] w-[1.2em] text-green-400" />
                    ) : (
                      <Copy className="h-[1.2em] w-[1.2em] text-foreground/60" />
                    )}
                  </motion.button>
                )}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div>
        <motion.h3
          className="mb-[1.5em] text-[1.5em] font-bold text-foreground/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Connect With Me
        </motion.h3>

        <div className="grid gap-[1em] sm:grid-cols-1">
          {socialLinks.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative flex items-center gap-[1em] rounded-[1em] border border-white/10 p-[1.5em] transition-all hover:scale-[1.02] hover:border-white/20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 rounded-[1em] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${item.color}30 0%, transparent 70%)`,
                  filter: "blur(15px)",
                }}
              />

              {/* Icon */}
              <motion.div
                className="relative z-10 flex h-[3em] w-[3em] shrink-0 items-center justify-center rounded-[0.75em]"
                style={{
                  background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon
                  className="h-[1.5em] w-[1.5em]"
                  style={{ color: item.color }}
                />
              </motion.div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <p className="mb-[0.25em] text-[0.85em] font-medium text-foreground/60">
                  {item.label}
                </p>
                <p className="text-[1em] font-semibold text-foreground">
                  {item.value}
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                className="relative z-10 text-foreground/40 group-hover:text-foreground/70 transition-colors"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Availability Badge */}
      <motion.div
        className="glass-strong rounded-[1em] border-gradient-animated p-[1.5em] text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-[0.5em] flex items-center justify-center gap-[0.5em]">
          <motion.div
            className="h-[0.75em] w-[0.75em] rounded-full bg-green-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[0.9em] font-semibold text-green-400">
            Available for Freelance
          </span>
        </div>
        <p className="text-[0.85em] text-foreground/60">
          Currently accepting new projects. Let's create something amazing
          together!
        </p>
      </motion.div>
    </div>
  );
}
