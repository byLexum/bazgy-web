"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectDetailModal from "./ProjectDetailModal";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { useLanguage } from "@/i18n/LanguageContext";

// Slide categories are stored in caps for the old label style; read them as
// a sentence instead, with Turkish-aware casing (İ/ı).
function sentenceCase(text: string, locale: string) {
  const lower = text.toLocaleLowerCase(locale);
  return lower.charAt(0).toLocaleUpperCase(locale) + lower.slice(1);
}

export default function HeroSlider() {
  const { t, language } = useLanguage();
  const locale = language === "tr" ? "tr-TR" : "en-US";
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
      style={{ minHeight: "max(600px, 88svh)" }}
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
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ backgroundColor: slide.color }}
          >
            <Image
              src={slide.image}
              alt=""
              aria-hidden="true"
              fill
              priority={i === 0}
              sizes="100vw"
              quality={100}
              className="scale-125 object-cover object-center blur-[45px] brightness-[0.5] saturate-[1.2]"
            />
            <div
              className="absolute inset-0 mix-blend-multiply"
              style={{
                background: `linear-gradient(135deg, ${slide.color}, transparent 65%)`,
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={100}
            className="photo-bw object-cover object-center md:object-contain"
          />
          {/* Phones fill the frame with the photo, so the copy needs a bottom-up scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 md:bg-gradient-to-r md:from-black/90 md:via-black/45 md:to-black/15" />

          <div className="absolute inset-x-6 bottom-24 mx-auto max-w-[1280px] md:inset-x-12 md:bottom-28">
            <div className="mb-4 font-sans text-[13px] font-medium text-white/75">
              {slide.city}
              <span className="mx-2 text-white/35">/</span>
              <span className="text-white/55">{sentenceCase(slide.eyebrow, locale)}</span>
            </div>
            <h1 className="mb-6 max-w-[820px] font-sans text-[30px] font-extrabold leading-[1.08] text-[#F5F4F0] md:text-[52px]">
              {slide.title}
            </h1>
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
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-6 bottom-8 z-10 mx-auto flex max-w-[1280px] items-center justify-between md:inset-x-12">
        <div className="font-sans text-[13px] font-semibold tabular-nums tracking-wide text-white">
          {idx}
          <span className="text-white/45"> / {total}</span>
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
        className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/25 text-[#F5F4F0] backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black sm:flex md:left-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => {
          next();
          setPaused(true);
        }}
        aria-label="Sonraki slayt"
        className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/25 text-[#F5F4F0] backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black sm:flex md:right-6"
      >
        <ArrowRightIcon className="h-5 w-5" />
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
