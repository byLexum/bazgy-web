"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./icons";
import StatusBadge from "./StatusBadge";
import type { StatusKey } from "@/i18n/dictionaries";

interface ProjectDetail {
  employerLabel: string;
  employer: string;
  projectType: string;
  constructionArea?: string;
  duration?: string;
  startDate?: string;
  capacity?: string;
  description: string[];
  scope: string[];
}

interface ProjectItem {
  title: string;
  location: string;
  category: string;
  status: string;
  statusKey?: StatusKey;
  images?: string[];
  detail?: ProjectDetail;
}

interface DetailLabels {
  location: string;
  projectType: string;
  constructionArea: string;
  duration: string;
  startDate: string;
  capacity: string;
  status: string;
  descriptionHeading: string;
  scopeHeading: string;
  close: string;
}

export default function ProjectDetailModal({
  project,
  labels,
  onClose,
}: {
  project: ProjectItem;
  labels: DetailLabels;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const count = images.length;
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) =>
    setActive((a) => (count ? (a + dir + count) % count : 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!count) return;
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % count);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, count]);

  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  const d = project.detail;

  const rows: { label: string; value: string }[] = [
    { label: labels.location, value: project.location },
    ...(d
      ? [
          { label: d.employerLabel, value: d.employer },
          { label: labels.projectType, value: d.projectType },
          ...(d.constructionArea ? [{ label: labels.constructionArea, value: d.constructionArea }] : []),
          ...(d.capacity ? [{ label: labels.capacity, value: d.capacity }] : []),
          ...(d.duration ? [{ label: labels.duration, value: d.duration }] : []),
          ...(d.startDate ? [{ label: labels.startDate, value: d.startDate }] : []),
        ]
      : []),
  ];

  const current = images[active];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b]/85 p-0 backdrop-blur-sm sm:p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid h-full w-full max-w-[1180px] grid-cols-1 grid-rows-[auto_1fr] overflow-hidden bg-[#111111] text-[#F5F4F0] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:h-auto sm:max-h-[92vh] md:h-[min(760px,88vh)] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:grid-rows-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center bg-black/55 text-white/80 backdrop-blur transition-colors hover:bg-white hover:text-black md:right-4 md:top-4"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Gallery */}
        <div className="flex min-h-0 min-w-0 flex-col bg-black">
          <div
            className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:aspect-auto md:min-h-0 md:flex-1"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx > 40) step(-1);
              else if (dx < -40) step(1);
              touchX.current = null;
            }}
          >
            {current ? (
              <>
                {/* Blurred fill so portrait site photos and landscape renders share one frame */}
                <Image
                  key={`bg-${current}`}
                  src={current}
                  alt=""
                  aria-hidden="true"
                  fill
                  quality={75}
                  sizes="40vw"
                  className="scale-110 object-cover opacity-50 blur-2xl"
                />
                {images.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 660px, 100vw"
                    className="object-contain transition-opacity duration-500 ease-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                  />
                ))}

                {count > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Önceki görsel / Previous image"
                      onClick={() => step(-1)}
                      className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/45 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Sonraki görsel / Next image"
                      onClick={() => step(1)}
                      className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-black/45 text-white backdrop-blur transition-colors hover:bg-white hover:text-black"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-black/55 px-2.5 py-1 text-[12px] font-semibold tabular-nums tracking-wide text-white/85 backdrop-blur">
                      {String(active + 1).padStart(2, "0")}
                      <span className="text-white/40"> / {String(count).padStart(2, "0")}</span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-white/40">
                {project.title}
              </div>
            )}
          </div>

          {count > 1 && (
            <div
              ref={thumbsRef}
              className="scrollbar-none flex shrink-0 gap-1.5 overflow-x-auto border-t border-white/10 bg-black p-2"
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`${i + 1}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden transition-opacity md:h-14 md:w-[72px] ${
                    i === active
                      ? "opacity-100 outline outline-2 -outline-offset-2 outline-white"
                      : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    quality={75}
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="scrollbar-dark min-h-0 min-w-0 overflow-y-auto overscroll-contain px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-12">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <StatusBadge completed={project.statusKey === "completed"} tone="dark">
              {project.status}
            </StatusBadge>
            <span className="text-[12px] font-medium text-white/50">{project.category}</span>
          </div>
          <h3 className="mb-7 pr-10 font-sans text-[26px] font-bold leading-[1.15] text-[#F5F4F0] md:text-[32px]">
            {project.title}
          </h3>

          <dl className="mb-9 border-t border-white/10">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] gap-4 border-b border-white/10 py-3"
              >
                <dt className="text-[12px] font-medium leading-5 text-white/45">{row.label}</dt>
                <dd className="text-[14px] leading-5 text-white/90">{row.value}</dd>
              </div>
            ))}
          </dl>

          {d && d.description.length > 0 && (
            <section className="mb-9">
              <h4 className="mb-3 text-[13px] font-bold text-white">{labels.descriptionHeading}</h4>
              <div className="space-y-3">
                {d.description.map((p, i) => (
                  <p key={i} className="max-w-[62ch] text-[14.5px] leading-[1.7] text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {d && d.scope.length > 0 && (
            <section>
              <h4 className="mb-3 text-[13px] font-bold text-white">{labels.scopeHeading}</h4>
              <ul className="border-t border-white/10">
                {d.scope.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/10 py-2.5 text-[13.5px] leading-snug text-white/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
