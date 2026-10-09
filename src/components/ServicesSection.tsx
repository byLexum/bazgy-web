"use client";

import Image from "next/image";
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

const imageMap = {
  droplet: "/images/services/atik-su-su-aritma.png",
  building: "/images/services/ustyapi-insaatlari.png",
  mosque: "/images/services/kamu-binalari.png",
  road: "/images/services/altyapi.png",
};

export default function ServicesSection() {
  const { t } = useLanguage();
  const c = t.services;
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-[120px]"
    >
      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="mb-12 grid grid-cols-1 items-end gap-6 md:mb-16 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <h2 className="font-sans text-[32px] font-extrabold leading-[1.08] text-[#F5F4F0] md:text-[48px]">
            {c.heading1}
            <br />
            <span className="text-white/55">{c.heading2}</span>
          </h2>
          <p className="max-w-[380px] font-sans text-[15px] leading-relaxed text-white/60 md:justify-self-end md:pb-2">
            {c.subtext}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group relative h-[340px] overflow-hidden md:h-[440px]"
              >
                <Image
                  src={imageMap[svc.icon]}
                  alt={svc.name}
                  fill
                  quality={100}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="photo-bw object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/90" />
                <div className="absolute inset-x-6 bottom-6">
                  <Icon className="mb-4 h-7 w-7 text-white/85" />
                  <div className="mb-2 border-t border-white/25 pt-4 font-sans text-[19px] font-bold leading-snug text-[#F5F4F0]">
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
