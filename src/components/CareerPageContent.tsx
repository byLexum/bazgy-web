"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import CtaButton from "./CtaButton";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";

export default function CareerPageContent() {
  const { t } = useLanguage();
  const c = t.careerPage;

  return (
    <div className="bg-[#F5F5F5] text-[#111111]">
      <Header />
      <section className="mx-auto max-w-[1280px] px-6 pb-20 pt-40 md:px-12 md:pb-24 md:pt-48">
        <Reveal>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            {c.eyebrow}
          </div>
          <h1 className="mb-6 max-w-[640px] font-sans text-4xl font-extrabold leading-[1.1] text-[#111111] md:text-[52px]">
            {c.heading}
          </h1>
          <p className="max-w-[600px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            {c.intro}
          </p>
        </Reveal>
        <Reveal delay={0.12} className="relative mt-12 h-64 overflow-hidden md:mt-16 md:h-[480px]">
          <Image
            src="/images/team/baz-ekip.jpg"
            alt={t.career.photoLabel}
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="photo-bw object-cover object-top"
          />
        </Reveal>
      </section>

      <section className="bg-black px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <h2 className="mb-12 max-w-[560px] font-sans text-2xl font-extrabold leading-tight text-[#F5F4F0] md:mb-14 md:text-[32px]">
              {c.valuesHeading}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-10">
            {c.values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-t border-white/15 pt-6"
              >
                <div className="mb-2.5 font-mono text-xs font-semibold text-white/40">
                  0{i + 1}
                </div>
                <div className="mb-2.5 font-sans text-base font-bold text-[#F5F4F0]">
                  {v.title}
                </div>
                <div className="font-sans text-sm leading-relaxed text-white/65">
                  {v.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-20 md:px-12 md:py-24">
        <Reveal>
          <h2 className="mb-10 font-sans text-2xl font-extrabold leading-tight text-[#111111] md:mb-14 md:text-[32px]">
            {c.openPositionsHeading}
          </h2>
        </Reveal>
        <div className="flex flex-col">
          {c.positions.map((pos, i) => (
            <motion.div
              key={pos.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-[#111111]/10 py-6"
            >
              <div>
                <div className="font-sans text-lg font-semibold text-[#111111]">
                  {pos.title}
                </div>
                <div className="mt-1 font-sans text-sm text-[#666666]">
                  {pos.location} · {pos.type}
                </div>
              </div>
              <CtaButton href="/contact" variant="dark" size="sm">
                {c.applyCta}
              </CtaButton>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-center md:px-12 md:py-28">
        <Reveal className="mx-auto flex max-w-[600px] flex-col items-center">
          <h2 className="mb-4 font-sans text-2xl font-extrabold leading-tight text-[#F5F4F0] md:text-[32px]">
            {c.noPositionHeading}
          </h2>
          <p className="mb-8 font-sans text-sm leading-relaxed text-white/65 md:text-[15px]">
            {c.noPositionCopy}
          </p>
          <CtaButton href="mailto:info@bazgy.com" variant="light">
            {c.noPositionCta}
          </CtaButton>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
