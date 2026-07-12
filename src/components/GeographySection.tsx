import { regions } from "@/data/content";
import Reveal from "./Reveal";

export default function GeographySection() {
  return (
    <section className="bg-black px-6 py-20 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-white/60">
            PROJE COĞRAFYASI
          </div>
          <h2 className="mb-12 max-w-[640px] font-sans text-[28px] font-extrabold leading-tight text-[#F5F4F0] md:mb-14 md:text-[34px]">
            Türkiye&apos;nin dört bir yanında kalıcı yapılar inşa ediyoruz.
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="grid grid-cols-1 gap-px bg-white/12 md:grid-cols-3"
        >
          {regions.map((region) => (
            <div key={region.name} className="bg-black p-8">
              <div className="mb-2.5 font-sans text-[28px] font-bold text-[#F5F4F0]">
                {region.name}
              </div>
              <div className="mb-1.5 font-mono text-[13px] font-semibold text-white/70">
                {region.count}
              </div>
              <div className="font-sans text-[13px] text-white/55">
                {region.focus}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
