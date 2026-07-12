import Image from "next/image";
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section
      id="kurumsal"
      className="mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-[140px]"
    >
      <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <Reveal>
          <div className="mb-5 font-mono text-xs font-semibold tracking-[0.12em] text-neutral-500">
            BAZ HAKKINDA
          </div>
          <h2 className="max-w-[420px] font-sans text-3xl font-extrabold leading-[1.15] text-[#111111] md:text-[44px]">
            Yarının altyapısını bugünden inşa ediyoruz.
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col justify-center gap-5">
          <p className="max-w-[520px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            BAZ; su arıtma altyapısından kamu ve kurumsal binalara uzanan
            geniş bir yelpazede mühendislik ve yapım hizmeti sunar.
          </p>
          <p className="max-w-[520px] font-sans text-base leading-relaxed text-[#555555] md:text-[17px]">
            Deneyimimiz, teknik uzmanlığımız ve kalite odaklı yaklaşımımızla
            projelerinizi güvenilir ve sürdürülebilir şekilde hayata
            geçiririz.
          </p>
          <a
            href="#projeler"
            className="w-fit border-b border-[#111111] font-sans text-sm font-semibold text-[#111111]"
          >
            BAZ&apos;ı Tanıyın →
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
            alt="Beykoz Karlıtepe projesinden havadan görünüm"
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="photo-bw object-cover"
          />
        </div>
        <div className="relative h-64 overflow-hidden md:h-[420px]">
          <Image
            src="/images/karlitepe-about-detail.png"
            alt="Saha uygulamasından malzeme detayı"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="photo-bw object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
