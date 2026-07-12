import Image from "next/image";
import { smallProjects } from "@/data/content";
import PlaceholderPhoto from "./PlaceholderPhoto";

export default function ProjectsSection() {
  return (
    <section
      id="projeler"
      className="mx-auto max-w-[1280px] px-6 pb-24 md:px-12 md:pb-[140px]"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
        <div>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            SEÇİLİ PROJELER
          </div>
          <h2 className="max-w-[600px] font-sans text-[28px] font-extrabold leading-tight text-[#111111] md:text-[34px]">
            İmzamızı taşıyan yapılar.
          </h2>
        </div>
        <a
          href="#projeler"
          className="whitespace-nowrap border-b border-[#111111] font-sans text-sm font-semibold text-[#111111]"
        >
          Tüm Projeleri Keşfet →
        </a>
      </div>

      <div className="relative mb-6 h-72 overflow-hidden md:h-[520px]">
        <Image
          src="/images/karlitepe-project.png"
          alt="Beykoz Karlıtepe"
          fill
          sizes="100vw"
          className="photo-bw object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between md:inset-x-9 md:bottom-8">
          <div>
            <div className="mb-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/80">
              ÜSTYAPI / KONUT · DEVAM EDİYOR
            </div>
            <div className="font-sans text-2xl font-bold text-[#F5F4F0] md:text-[30px]">
              Beykoz Karlıtepe
            </div>
            <div className="mt-1 font-sans text-sm text-white/65">
              İstanbul, Beykoz
            </div>
          </div>
          <div className="font-sans text-2xl font-bold text-[#F5F4F0]">→</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {smallProjects.map((proj) => (
          <div key={proj.title}>
            <div className="relative mb-3.5 h-56 overflow-hidden">
              <PlaceholderPhoto label={proj.title} />
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
          </div>
        ))}
      </div>
    </section>
  );
}
