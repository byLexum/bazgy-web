"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectDetailModal from "./ProjectDetailModal";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HeroSlider() {
  const { t } = useLanguage();
  const slides = t.hero.slides;
  const projectItems = t.projects.items;
  const detailLabels = t.projects.detailLabels;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + count) % count),
    [count]
  );

  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {}
    if (reduced) return;
    const timer = setInterval(() => {
      if (!paused) next();
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, next]);

  const goTo = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      next();
      setPaused(true);
    }
    if (e.key === "ArrowLeft") {
      prev();
      setPaused(true);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 50) {
      prev();
      setPaused(true);
    } else if (dx < -50) {
      next();
      setPaused(true);
    }
    touchX.current = null;
  };

  const idx = String(active + 1).padStart(2, "0");
  const total = String(count).padStart(2, "0");

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={t.hero.ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full overflow-hidden bg-black outline-none"
      style={{ minHeight: "max(640px, 88vh)" }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          className="absolute inset-0 transition-opacity duration-900 ease-in-out"
          style={{
            opacity: i === active ? 1 : 0,
            pointerEvents: i === active ? "auto" : "none",
            zIndex: i === active ? 2 : 1,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="photo-bw scale-[1.03] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-black/15" />

          <div className="absolute inset-x-6 bottom-24 mx-auto max-w-[1280px] md:inset-x-12 md:bottom-28">
            <div className="mb-3 font-mono text-xs font-semibold tracking-[0.12em] text-white/70">
              {slide.eyebrow} · {slide.city}
            </div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 bg-white" />
              <h1 className="max-w-[780px] font-sans text-2xl font-bold leading-[1.15] text-[#F5F4F0] md:text-[32px]">
                {slide.title}
              </h1>
            </div>
            <div className="mb-5 h-px w-full bg-white/25" />
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="max-w-[560px] font-sans text-sm leading-relaxed text-white/70 md:text-[15px]">
                {slide.copy}
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpenProjectIndex(slide.projectIndex);
                  setPaused(true);
                }}
                className="group inline-flex shrink-0 items-center gap-2 border-b border-white/50 pb-1 font-sans text-sm font-semibold text-[#F5F4F0] transition-colors hover:border-white"
              >
                {t.hero.daha}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-6 bottom-8 z-10 mx-auto flex max-w-[1280px] items-center justify-between md:inset-x-12">
        <div className="font-mono text-[13px] font-semibold tracking-wide text-white/70">
          {idx} / {total}
        </div>
        <div role="tablist" aria-label="Slaytlar" className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Slayt ${i + 1}'e git`}
              className="h-[3px] cursor-pointer border-none p-0 transition-all duration-300"
              style={{
                width: i === active ? 32 : 8,
                background: i === active ? "#ffffff" : "rgba(245,244,240,0.35)",
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          prev();
          setPaused(true);
        }}
        aria-label="Önceki slayt"
        className="absolute left-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 text-xl text-[#F5F4F0] md:left-5"
      >
        ←
      </button>
      <button
        onClick={() => {
          next();
          setPaused(true);
        }}
        aria-label="Sonraki slayt"
        className="absolute right-3 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-white/35 bg-black/35 text-xl text-[#F5F4F0] md:right-5"
      >
        →
      </button>

      <AnimatePresence>
        {openProjectIndex !== null && (
          <ProjectDetailModal
            project={projectItems[openProjectIndex]}
            labels={detailLabels}
            onClose={() => setOpenProjectIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
