"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import PageIntro from "./PageIntro";
import CareerApplicationForm, { positionLabel } from "./CareerApplicationForm";
import { ArrowRightIcon } from "./icons";
import { useLanguage } from "@/i18n/LanguageContext";

export default function CareerPageContent() {
  const { t, language } = useLanguage();
  const c = t.careerPage;
  const [position, setPosition] = useState<string | null>(null);
  // Labels change with the language, so an earlier pick may no longer exist;
  // fall back to "general application" in whichever language is active.
  const options = [...c.positions.map(positionLabel), c.form.general];
  const selected = position && options.includes(position) ? position : c.form.general;

  const applyFor = (label: string) => {
    setPosition(label);
    document.getElementById("basvuru")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <PageIntro title={c.heading} intro={c.intro}>
        <Reveal delay={0.12} className="relative mt-12 h-64 overflow-hidden md:mt-16 md:h-[520px]">
          <Image
            src="/images/team/baz-ekip.jpg"
            alt={t.career.photoLabel}
            fill
            priority
            quality={100}
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="photo-bw object-cover object-top"
          />
        </Reveal>
      </PageIntro>

      <section className="bg-[#111111] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
          <Reveal>
            <h2 className="max-w-[420px] font-sans text-[30px] font-extrabold leading-[1.1] text-[#F5F4F0] md:text-[40px]">
              {c.valuesHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="border-t border-white/20">
            {c.values.map((v) => (
              <div
                key={v.title}
                className="grid grid-cols-1 gap-2 border-b border-white/20 py-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8 md:py-7"
              >
                <h3 className="font-sans text-[17px] font-bold text-[#F5F4F0]">{v.title}</h3>
                <p className="font-sans text-[15px] leading-relaxed text-white/65">{v.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-28">
        <Reveal>
          <h2 className="mb-10 font-sans text-[30px] font-extrabold leading-tight text-[#111111] md:mb-14 md:text-[40px]">
            {c.openPositionsHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="border-t border-[#111111]/15">
          {c.positions.map((pos) => (
            <div
              key={pos.title}
              className="group flex flex-wrap items-center justify-between gap-4 border-b border-[#111111]/15 py-6"
            >
              <div>
                <div className="font-sans text-[19px] font-bold text-[#111111]">{pos.title}</div>
                <div className="mt-1 font-sans text-sm text-[#666666]">
                  {pos.location} · {pos.type}
                </div>
              </div>
              <button
                type="button"
                onClick={() => applyFor(positionLabel(pos))}
                className="inline-flex items-center gap-2 border border-[#111111] px-5 py-2.5 font-sans text-[13px] font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
              >
                {c.applyCta}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="basvuru" className="scroll-mt-24 border-t border-[#111111]/10 bg-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32">
              <h2 className="mb-5 font-sans text-[30px] font-extrabold leading-[1.1] text-[#111111] md:text-[40px]">
                {c.applyHeading}
              </h2>
              <p className="max-w-[420px] font-sans text-[15px] leading-relaxed text-[#555555] md:text-base">
                {c.applyIntro}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <CareerApplicationForm
              key={language}
              position={selected}
              onPositionChange={setPosition}
            />
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
