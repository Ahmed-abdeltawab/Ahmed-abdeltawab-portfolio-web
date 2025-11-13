"use client";

import QuoteSlider from "@/components/ui/quote-slider";
import { inspirationalQuotes, techQuotes } from "@/data/quotes";
import Reveal from "@/components/ui/reveal";

export default function QuotesTestPage() {
  return (
    <div className="min-h-screen py-[4em] sm:py-[6em]">
      <div className="container mx-auto px-[1em] sm:px-[2em] space-y-[4em]">
        {/* Page Header */}
        <Reveal>
          <div className="text-center mb-[3em]">
            <h1 className="text-[3em] sm:text-[4em] font-bold text-gradient-animated mb-[0.5em]">
              Quote Carousel
            </h1>
            <p className="text-[1.2em] text-foreground/70">
              كارت أنيق متحرك مع تأثيرات fade-in/out احترافية
            </p>
          </div>
        </Reveal>

        {/* Inspirational Quotes */}
        <section>
          <Reveal>
            <h2 className="text-[2em] font-bold mb-[1.5em] text-center">
              Inspirational Quotes
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="max-w-[50em] mx-auto">
              <QuoteSlider quotes={inspirationalQuotes} interval={5000} />
            </div>
          </Reveal>
        </section>

        {/* Tech Quotes */}
        <section>
          <Reveal>
            <h2 className="text-[2em] font-bold mb-[1.5em] text-center">
              Tech Quotes
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="max-w-[50em] mx-auto">
              <QuoteSlider quotes={techQuotes} interval={4000} />
            </div>
          </Reveal>
        </section>

        {/* Manual Control Example */}
        <section>
          <Reveal>
            <h2 className="text-[2em] font-bold mb-[1.5em] text-center">
              Manual Control (No Auto-play)
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="max-w-[50em] mx-auto">
              <QuoteSlider
                quotes={inspirationalQuotes.slice(0, 3)}
                autoPlay={false}
              />
            </div>
          </Reveal>
        </section>

        {/* Features Section */}
        <Reveal>
          <div className="glass-card rounded-[1.5em] p-[2em] max-w-[50em] mx-auto">
            <h3 className="text-[1.5em] font-bold mb-[1em]">المميزات ✨</h3>
            <ul className="space-y-[0.75em] text-foreground/80">
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>تأثيرات fade-in/out احترافية مع blur للنعومة</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>تبديل تلقائي كل بضع ثواني (قابل للتخصيص)</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>إيقاف مؤقت عند التمرير بالماوس على الكارت</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>مؤشرات (dots) للتنقل اليدوي بين الاقتباسات</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>أيقونات تزيينية متحركة للاقتباس</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>مؤشر للحالة (Auto/Paused)</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>تصميم Glass morphism أنيق يتماشى مع نمط البورتفوليو</span>
              </li>
              <li className="flex items-start gap-[0.5em]">
                <span className="text-primary">✓</span>
                <span>مسؤول بالكامل (Responsive) على جميع الشاشات</span>
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Usage Example */}
        <Reveal>
          <div className="glass-card rounded-[1.5em] p-[2em] max-w-[50em] mx-auto">
            <h3 className="text-[1.5em] font-bold mb-[1em]">
              طريقة الاستخدام 📝
            </h3>
            <pre className="glass rounded-[0.5em] p-[1em] overflow-x-auto text-[0.9em]">
              <code>{`import QuoteSlider from "@/components/ui/quote-slider";
import { inspirationalQuotes } from "@/data/quotes";

<QuoteSlider 
  quotes={inspirationalQuotes} 
  interval={5000}    // مدة عرض كل اقتباس (بالملي ثانية)
  autoPlay={true}    // تفعيل/إيقاف التبديل التلقائي
/>`}</code>
            </pre>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
