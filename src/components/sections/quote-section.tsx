"use client";

import Reveal from "@/components/ui/reveal";
import QuoteSlider from "@/components/ui/quote-slider";
import { inspirationalQuotes } from "@/data/quotes";

export default function QuoteSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-[1em] sm:px-[2em]">
        <Reveal delay={0.2}>
          <div className="max-w-[50em] mx-auto">
            <QuoteSlider
              quotes={inspirationalQuotes}
              interval={6000}
              autoPlay
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
