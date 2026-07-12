import { services } from "@/data/content";
import PlaceholderPhoto from "./PlaceholderPhoto";
import { BuildingIcon, DropletIcon, MosqueIcon, RoadIcon } from "./icons";

const iconMap = {
  droplet: DropletIcon,
  building: BuildingIcon,
  mosque: MosqueIcon,
  road: RoadIcon,
};

export default function ServicesSection() {
  return (
    <section
      id="hizmetler"
      className="relative overflow-hidden bg-black px-6 py-20 md:px-12 md:py-[120px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_900px_500px_at_25%_0%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1280px] text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/75">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          FAALİYET ALANLARIMIZ
        </div>
        <h2 className="mb-4 font-sans text-3xl font-extrabold leading-tight text-[#F5F4F0] md:text-4xl">
          Farklı Faaliyet Alanlarında
          <br />
          <span className="text-white/70">Aynı Kusursuzluk Hedefi</span>
        </h2>
        <p className="mb-14 font-sans text-[15px] text-white/55 md:mb-16">
          Bir projenin her aşamasında, tek ve güvenilir çözüm ortağı.
        </p>
        <div className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => {
            const Icon = iconMap[svc.icon];
            return (
            <div
              key={svc.name}
              className="relative h-[340px] overflow-hidden rounded-[10px] md:h-[400px]"
            >
              <PlaceholderPhoto label={`${svc.name} — proje fotoğrafı`} />
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
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
