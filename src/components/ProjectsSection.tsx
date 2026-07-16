"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import Reveal from "./Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

function ProjectPhoto({ title, images }: { title: string; images?: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) return;
    const timer = setInterval(
      () => setActive((a) => (a + 1) % images.length),
      2800
    );
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return <PlaceholderPhoto label={title} />;
  }

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="photo-bw object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
    </>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const c = t.projects;
  return (
    <section
      id="projeler"
      className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-[140px]"
    >
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            {c.eyebrow}
          </div>
          <h2 className="max-w-[600px] font-sans text-[28px] font-extrabold leading-tight text-[#111111] md:text-[34px]">
            {c.heading}
          </h2>
        </div>
        <a
          href="#projeler"
          className="whitespace-nowrap border-b border-[#111111] font-sans text-sm font-semibold text-[#111111]"
        >
          {c.exploreLink}
        </a>
      </Reveal>

      <Reveal className="relative mb-6 h-72 overflow-hidden md:h-[520px]">
        <Image
          src="/images/karlitepe-project.png"
          alt={c.flagship.title}
          fill
          sizes="100vw"
          className="photo-bw object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between md:inset-x-9 md:bottom-8">
          <div>
            <div className="mb-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/80">
              {c.flagship.eyebrow}
            </div>
            <div className="font-sans text-2xl font-bold text-[#F5F4F0] md:text-[30px]">
              {c.flagship.title}
            </div>
            <div className="mt-1 font-sans text-sm text-white/65">
              {c.flagship.location}
            </div>
          </div>
          <div className="font-sans text-2xl font-bold text-[#F5F4F0]">→</div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((proj, i) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: (i % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative mb-3.5 h-56 overflow-hidden">
              <ProjectPhoto title={proj.title} images={proj.images} />
              <div className="absolute left-3 top-3 bg-black px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[#F5F4F0]">
                {proj.status}
              </div>
            </div>
            <div className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-wide text-neutral-500">
              {proj.category}
            </div>
            <div className="font-sans text-[17px] font-semibold text-[#111111]">
              {proj.title}
            </div>
            <div className="mt-1 font-sans text-[13px] text-[#666666]">
              {proj.location}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
