"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import StatusBadge from "./StatusBadge";
import { ArrowRightIcon, ImagesIcon } from "./icons";
import type { StatusKey } from "@/i18n/dictionaries";

export interface ProjectCardData {
  title: string;
  location: string;
  category: string;
  status: string;
  statusKey: StatusKey;
  images?: string[];
}

// Shows the cover image at rest and steps through the gallery only while the
// card is hovered, so the grid stays calm until someone shows interest.
function ProjectPhoto({
  title,
  images,
  playing,
}: {
  title: string;
  images?: string[];
  playing: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!playing || !images || images.length < 2) return;
    const timer = setInterval(() => setActive((a) => (a + 1) % images.length), 1400);
    return () => clearInterval(timer);
  }, [images, playing]);

  if (!images || images.length === 0) {
    return <PlaceholderPhoto label={title} />;
  }

  const shown = playing ? active : 0;

  return (
    <>
      {images.map((src, i) =>
        i === 0 || playing ? (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? title : ""}
            fill
            quality={90}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="photo-bw object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03]"
            style={{ opacity: i === shown ? 1 : 0 }}
          />
        ) : null
      )}
    </>
  );
}

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectCardData;
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const count = project.images?.length ?? 0;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group text-left"
    >
      <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-neutral-200">
        <ProjectPhoto title={project.title} images={project.images} playing={hovered} />
        <div className="absolute left-3 top-3">
          <StatusBadge completed={project.statusKey === "completed"} tone="overlay">
            {project.status}
          </StatusBadge>
        </div>
        {count > 1 && (
          <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-black/55 px-2 py-1 text-[11px] font-semibold tabular-nums text-white/90 backdrop-blur-sm">
            <ImagesIcon className="h-3.5 w-3.5" />
            {count}
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 border-t border-[#111111]/15 pt-4">
        <div>
          <div className="font-sans text-[18px] font-bold leading-snug text-[#111111]">{project.title}</div>
          <div className="mt-1.5 font-sans text-[13px] text-[#666666]">
            {project.category} · {project.location}
          </div>
        </div>
        <ArrowRightIcon className="mt-1 h-5 w-5 shrink-0 text-[#111111] opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
    </motion.button>
  );
}
