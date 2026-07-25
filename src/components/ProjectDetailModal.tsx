"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % Math.max(images.length, 1));
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + images.length) % Math.max(images.length, 1));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, images.length]);

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
    { label: labels.status, value: project.status },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-[860px] max-h-[92vh] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-black text-[#F5F4F0] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>

        <div className="relative aspect-video w-full shrink-0 bg-neutral-900">
          {images.length > 0 ? (
            <>
              {images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={project.title}
                  fill
                  sizes="(min-width: 860px) 860px, 100vw"
                  className="photo-bw object-cover transition-opacity duration-500 ease-in-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                {images.length > 1 && (
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-1.5">
                      {images.map((src, i) => (
                        <button
                          key={src}
                          type="button"
                          aria-label={`${i + 1}`}
                          onClick={() => setActive(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => setActive((a) => (a + 1) % images.length)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-wider text-white/40">
              {project.title}
            </div>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-9">
          <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            {project.category}
          </div>
          <h3 className="mb-5 font-sans text-2xl font-bold leading-tight text-[#F5F4F0] md:text-[28px]">
            {project.title}
          </h3>

          <dl className="mb-7 grid grid-cols-1 gap-x-6 gap-y-3 border-y border-white/10 py-5 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                  {row.label}
                </dt>
                <dd className="mt-0.5 font-sans text-sm text-white/85">{row.value}</dd>
              </div>
            ))}
          </dl>

          {d && d.description.length > 0 && (
            <div className="mb-7">
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
                {labels.descriptionHeading}
              </div>
              <div className="space-y-3">
                {d.description.map((p, i) => (
                  <p key={i} className="font-sans text-[14px] leading-relaxed text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}

          {d && d.scope.length > 0 && (
            <div>
              <div className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
                {labels.scopeHeading}
              </div>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {d.scope.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-sans text-[13px] leading-snug text-white/70"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
