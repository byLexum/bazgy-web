"use client";

import PlaceholderPhoto from "./PlaceholderPhoto";
import { BuildingIcon, DropletIcon, MosqueIcon, RoadIcon } from "./icons";
import Reveal from "./Reveal";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const iconMap = {
  droplet: DropletIcon,
  building: BuildingIcon,
  mosque: MosqueIcon,
  road: RoadIcon,
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const c = t.services;
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-[120px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_900px_500px_at_25%_0%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1280px] text-center">
        <Reveal>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {c.eyebrow}
          </div>
          <h2 className="mb-4 font-sans text-3xl font-extrabold leading-tight text-[#F5F4F0] md:text-4xl">
            {c.heading1}
            <br />
            <span className="text-white/70">{c.heading2}</span>
          </h2>
          <p className="mb-14 font-sans text-[15px] text-white/55 md:mb-16">
            {c.subtext}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((svc, i) => {
            const Icon = iconMap[svc.icon];
            return (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-[340px] overflow-hidden rounded-[10px] md:h-[400px]"
              >
                <PlaceholderPhoto label={svc.name} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/5 to-black/85" />
                <div className="absolute left-[22px] top-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-white/15 backdrop-blur-sm">
                  <Icon className="h-[22px] w-[22px] text-white" />
                </div>
                <div className="absolute inset-x-[22px] bottom-6">
                  <div className="mb-1.5 font-sans text-lg font-bold text-[#F5F4F0]">
                    {svc.name}
                  </div>
                  <div className="font-sans text-[13px] leading-relaxed text-white/70">
                    {svc.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
