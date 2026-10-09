"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { ArrowRightIcon } from "./icons";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const c = t.about;
  return (
    <section
      id="kurumsal"
      className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-[140px]"
    >
      <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <Reveal>
          <h2 className="max-w-[460px] font-sans text-[32px] font-extrabold leading-[1.08] text-[#111111] md:text-[48px]">
            {c.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col justify-center gap-5">
          <p className="max-w-[520px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            {c.p1}
          </p>
          <p className="max-w-[520px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            {c.p2}
          </p>
          <a
            href="/hakkimizda"
            className="group inline-flex w-fit items-center gap-2 border-b border-[#111111] pb-1 font-sans text-sm font-semibold text-[#111111]"
          >
            {c.link}
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
      <Reveal
        delay={0.1}
        className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]"
      >
        <div className="relative h-64 overflow-hidden md:h-[420px]">
          <Image
            src="/images/karlitepe-about-large.png"
            alt="Beykoz Karlıtepe"
            fill
            quality={100}
            sizes="(min-width: 768px) 60vw, 100vw"
            className="photo-bw object-cover"
          />
        </div>
        <div className="relative h-64 overflow-hidden md:h-[420px]">
          <Image
            src="/images/karlitepe-about-detail.png"
            alt="Beykoz Karlıtepe"
            fill
            quality={100}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="photo-bw object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
