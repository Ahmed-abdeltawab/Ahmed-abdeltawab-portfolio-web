"use client";

import Reveal from "@/components/ui/reveal";

export default function QuoteSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 flex justify-center px-4">
      <Reveal delay={0.2}>
        <div className="glass-card border-gradient-animated p-6 sm:p-8 md:p-10 max-w-full sm:max-w-3xl relative rounded-3xl">
          {/* Quote marks with gradient */}
          <svg
            className="absolute -top-3 sm:-top-4 left-4 sm:left-6 w-10 h-8 sm:w-12 sm:h-10"
            viewBox="0 0 42 29"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18.56 19.616C18.56 21.0453 18.0373 22.2507 16.992 23.232C15.968 24.2133 14.72 24.704 13.248 24.704C11.7333 24.704 10.4747 24.2133 9.472 23.232C8.49067 22.2507 8 21.0453 8 19.616C8 18.9333 8.096 18.208 8.288 17.44C8.48 16.672 8.864 15.68 9.44 14.464L14.4 4H19.2L16.544 15.584C17.1413 16.0107 17.6213 16.576 17.984 17.28C18.368 17.9627 18.56 18.7413 18.56 19.616ZM32.8 19.616C32.8 21.0453 32.2773 22.2507 31.232 23.232C30.1867 24.2133 28.9387 24.704 27.488 24.704C26.016 24.704 24.768 24.2133 23.744 23.232C22.7413 22.2507 22.24 21.0453 22.24 19.616C22.24 18.9333 22.336 18.208 22.528 17.44C22.72 16.672 23.1147 15.68 23.712 14.464L28.704 4H33.472L30.784 15.584C31.4027 16.0107 31.8933 16.576 32.256 17.28C32.6187 17.9627 32.8 18.7413 32.8 19.616Z"
              className="fill-primary/60"
            />
          </svg>

          <p className="font-fira text-lg sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-8 text-center px-4 sm:px-8 text-white leading-relaxed">
            With great power comes great electricity bill
          </p>

          <svg
            className="absolute -bottom-3 sm:-bottom-4 right-4 sm:right-6 w-10 h-8 sm:w-12 sm:h-10 rotate-180"
            viewBox="0 0 42 29"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18.56 19.616C18.56 21.0453 18.0373 22.2507 16.992 23.232C15.968 24.2133 14.72 24.704 13.248 24.704C11.7333 24.704 10.4747 24.2133 9.472 23.232C8.49067 22.2507 8 21.0453 8 19.616C8 18.9333 8.096 18.208 8.288 17.44C8.48 16.672 8.864 15.68 9.44 14.464L14.4 4H19.2L16.544 15.584C17.1413 16.0107 17.6213 16.576 17.984 17.28C18.368 17.9627 18.56 18.7413 18.56 19.616ZM32.8 19.616C32.8 21.0453 32.2773 22.2507 31.232 23.232C30.1867 24.2133 28.9387 24.704 27.488 24.704C26.016 24.704 24.768 24.2133 23.744 23.232C22.7413 22.2507 22.24 21.0453 22.24 19.616C22.24 18.9333 22.336 18.208 22.528 17.44C22.72 16.672 23.1147 15.68 23.712 14.464L28.704 4H33.472L30.784 15.584C31.4027 16.0107 31.8933 16.576 32.256 17.28C32.6187 17.9627 32.8 18.7413 32.8 19.616Z"
              className="fill-accent/60"
            />
          </svg>

          <div className="glass rounded-2xl p-3 sm:p-4 inline-block ml-auto border border-primary/30">
            <p className="font-fira text-base sm:text-xl md:text-2xl text-gradient font-semibold">
              - Dr. Who
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
