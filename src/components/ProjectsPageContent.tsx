"use client";

import { AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PageIntro from "./PageIntro";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import type { StatusKey } from "@/i18n/dictionaries";

const STATUS_ORDER: StatusKey[] = ["completed", "ongoing", "upcoming"];

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 border px-4 py-2 font-sans text-[13px] font-semibold transition-colors ${
        active
          ? "border-[#111111] bg-[#111111] text-[#F5F4F0]"
          : "border-[#111111]/20 text-[#333333] hover:border-[#111111]"
      }`}
    >
      {children}
      {count !== undefined && (
        <span className={`tabular-nums ${active ? "text-white/60" : "text-neutral-400"}`}>{count}</span>
      )}
    </button>
  );
}

export default function ProjectsPageContent() {
  const { t } = useLanguage();
  const c = t.projects;
  const p = c.page;
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusKey | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = useMemo(
    () => [
      {
        title: c.flagship.title,
        location: c.flagship.location,
        category: c.flagship.category,
        status: c.flagship.status,
        statusKey: c.flagship.statusKey,
        images: c.flagship.images,
        detail: c.flagship.detail,
      },
      ...c.items,
    ],
    [c]
  );

  const categories = useMemo(
    () => Array.from(new Set(projects.map((proj) => proj.category))),
    [projects]
  );
  // A category picked in the other language no longer exists; treat it as "all".
  const activeCategory = category && categories.includes(category) ? category : null;

  const filtered = projects
    .map((proj, i) => ({ proj, i }))
    .filter(
      ({ proj }) =>
        (!activeCategory || proj.category === activeCategory) &&
        (!status || proj.statusKey === status)
    );

  const countBy = (pred: (proj: (typeof projects)[number]) => boolean) =>
    projects.filter(pred).length;

  const reset = () => {
    setCategory(null);
    setStatus(null);
  };

  const openProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <PageIntro title={p.heading} intro={p.intro} />

      <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-12 md:pb-32">
        <Reveal className="mb-10 flex flex-col gap-5 border-y border-[#111111]/15 py-6 md:mb-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <span className="w-24 shrink-0 font-sans text-[13px] font-semibold text-neutral-500">
              {p.categoryLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              <Chip active={!activeCategory} onClick={() => setCategory(null)} count={projects.length}>
                {p.all}
              </Chip>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  active={activeCategory === cat}
                  onClick={() => setCategory(cat)}
                  count={countBy((proj) => proj.category === cat)}
                >
                  {cat}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <span className="w-24 shrink-0 font-sans text-[13px] font-semibold text-neutral-500">
              {p.statusLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              <Chip active={!status} onClick={() => setStatus(null)}>
                {p.all}
              </Chip>
              {STATUS_ORDER.map((key) => (
                <Chip
                  key={key}
                  active={status === key}
                  onClick={() => setStatus(key)}
                  count={countBy((proj) => proj.statusKey === key)}
                >
                  {p.statuses[key]}
                </Chip>
              ))}
            </div>
          </div>
        </Reveal>

        <div aria-live="polite" className="mb-8 font-sans text-sm text-[#666666]">
          <span className="font-semibold tabular-nums text-[#111111]">{filtered.length}</span> {p.count}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(({ proj, i }, n) => (
              <ProjectCard key={proj.title} project={proj} index={n} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 border border-dashed border-[#111111]/20 px-6 py-14">
            <p className="font-sans text-[17px] font-semibold text-[#111111]">{p.empty}</p>
            <button
              type="button"
              onClick={reset}
              className="border-b border-[#111111] pb-1 font-sans text-sm font-semibold text-[#111111]"
            >
              {p.reset}
            </button>
          </div>
        )}
      </section>

      <AnimatePresence>
        {openProject && (
          <ProjectDetailModal
            project={openProject}
            labels={c.detailLabels}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
