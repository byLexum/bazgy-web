"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function StatsBand() {
  const { t } = useLanguage();
  const stats = t.stats;
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !ref.current) {
      setProgress(1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              setProgress(p);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-b border-white/10 bg-black px-6 py-9 md:px-12"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => {
          const display = Math.round(stat.target * progress) + stat.suffix;
          return (
            <div
              key={stat.label}
              className="flex items-baseline gap-2.5 border-l border-white/12 px-5"
            >
              <span
                aria-hidden="true"
                className="font-mono text-2xl font-bold text-[#F5F4F0] md:text-[30px]"
              >
                {display}
              </span>
              <span className="sr-only">
                {stat.target}
                {stat.suffix} {stat.label}
              </span>
              <span
                aria-hidden="true"
                className="font-sans text-[13px] text-white/55"
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
