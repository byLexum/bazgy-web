"use client";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import Reveal from "./Reveal";
import StatusBadge from "./StatusBadge";
import { ArrowRightIcon } from "./icons";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const c = t.projects;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [flagshipOpen, setFlagshipOpen] = useState(false);
  const openProject = openIndex !== null ? c.items[openIndex] : null;
  const flagshipProject = {
    title: c.flagship.title,
    location: c.flagship.location,
    category: c.flagship.category,
    status: c.flagship.status,
    statusKey: c.flagship.statusKey,
    images: c.flagship.images,
    detail: c.flagship.detail,
  };

  return (
    <section
      id="projeler"
      className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-[140px]"
    >
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
        <h2 className="max-w-[560px] font-sans text-[32px] font-extrabold leading-[1.08] text-[#111111] md:text-[48px]">
          {c.heading}
        </h2>
        <a
          href="/projeler"
          className="group inline-flex items-center gap-2 whitespace-nowrap border-b border-[#111111] pb-1 font-sans text-sm font-semibold text-[#111111]"
        >
          {c.exploreLink}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Reveal>

      <Reveal className="relative mb-10 h-80 overflow-hidden md:mb-14 md:h-[560px]">
        <button
          type="button"
          onClick={() => setFlagshipOpen(true)}
          className="group block h-full w-full text-left"
        >
          <Image
            src="/images/karlitepe-project.png"
            alt={c.flagship.title}
            fill
            sizes="(min-width: 1280px) 1184px, 100vw"
            quality={100}
            className="photo-bw object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 md:inset-x-10 md:bottom-10">
            <div>
              <div className="mb-3">
                <StatusBadge tone="overlay">{c.flagship.status}</StatusBadge>
              </div>
              <div className="font-sans text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[#F5F4F0] md:text-[44px]">
                {c.flagship.title}
              </div>
              <div className="mt-2.5 font-sans text-sm text-white/70">
                {c.flagship.category} — {c.flagship.location}
              </div>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </div>
        </button>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((proj, i) => (
          <ProjectCard key={proj.title} project={proj} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectDetailModal
            project={openProject}
            labels={c.detailLabels}
            onClose={() => setOpenIndex(null)}
          />
        )}
        {flagshipOpen && (
          <ProjectDetailModal
            project={flagshipProject}
            labels={c.detailLabels}
            onClose={() => setFlagshipOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
