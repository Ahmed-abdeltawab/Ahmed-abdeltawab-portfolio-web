"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteItem {
  text: string;
  author: string;
  role?: string;
}

interface QuoteSliderProps {
  quotes: QuoteItem[];
  interval?: number; // in milliseconds
  autoPlay?: boolean;
}

export default function QuoteSlider({
  quotes,
  interval = 5000,
  autoPlay = true,
}: QuoteSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused || quotes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, quotes.length, interval]);

  const currentQuote = quotes[currentIndex];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Glass Card Container */}
      <div className="glass-strong rounded-[1.5em] border border-white/10 p-[2em] sm:p-[3em] shadow-2xl min-h-[15em] flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Quote Icon - Top Left */}
        <motion.div
          className="absolute top-[1em] left-[1em] opacity-10"
          initial={{ rotate: 0, scale: 1 }}
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Quote className="w-[4em] h-[4em] text-primary" />
        </motion.div>

        {/* Decorative Quote Icon - Bottom Right */}
        <motion.div
          className="absolute bottom-[1em] right-[1em] opacity-10 rotate-180"
          initial={{ rotate: 180, scale: 1 }}
          animate={{
            rotate: [180, 185, 175, 180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <Quote className="w-[4em] h-[4em] text-accent" />
        </motion.div>

        {/* Quote Content with AnimatePresence for smooth transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            {/* Quote Text */}
            <blockquote className="mb-[1.5em]">
              <p className="text-[1.2em] sm:text-[1.5em] md:text-[1.8em] font-light leading-relaxed text-foreground/90 text-center italic">
                "{currentQuote.text}"
              </p>
            </blockquote>

            {/* Author Info */}
            <div className="flex flex-col items-center gap-[0.25em]">
              <motion.div
                className="h-[0.2em] w-[3em] bg-linear-to-r from-transparent via-primary to-transparent mb-[0.75em]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <cite className="not-italic text-[1.1em] sm:text-[1.2em] font-semibold text-gradient-animated">
                {currentQuote.author}
              </cite>
              {currentQuote.role && (
                <span className="text-[0.9em] text-foreground/60">
                  {currentQuote.role}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators (Dots) */}
        {quotes.length > 1 && (
          <div className="absolute bottom-[1em] left-1/2 -translate-x-1/2 flex gap-[0.5em] z-20">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-[0.4em] rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-[2em] bg-primary glow-primary"
                    : "w-[0.4em] bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {autoPlay && quotes.length > 1 && (
          <motion.div
            className="absolute top-[1em] right-[1em] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isPaused ? 0.5 : 0.2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-card rounded-full px-[0.75em] py-[0.4em] text-[0.7em] text-foreground/60 flex items-center gap-[0.4em]">
              <motion.div
                className="w-[0.5em] h-[0.5em] rounded-full bg-primary"
                animate={
                  isPaused
                    ? {}
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              <span>{isPaused ? "Paused" : "Auto"}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
