import PlaceholderPhoto from "./PlaceholderPhoto";
import CtaButton from "./CtaButton";

export default function CareerSection() {
  return (
    <section id="kariyer" className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-64 overflow-hidden md:h-[440px]">
        <PlaceholderPhoto label="Saha ekibi fotoğrafı" />
      </div>
      <div className="flex flex-col justify-center bg-[#F5F5F5] px-6 py-16 md:px-16">
        <h2 className="mb-4.5 max-w-[420px] font-sans text-[28px] font-extrabold leading-tight text-[#111111] md:text-[32px]">
          Geleceğin yapılarını birlikte inşa edelim.
        </h2>
        <p className="mb-7 max-w-[400px] font-sans text-[15px] leading-relaxed text-[#555555]">
          BAZ ekibine katılın, Türkiye&apos;nin büyük mühendislik
          projelerinde yer alın.
        </p>
        <CtaButton href="#iletisim" variant="dark" className="w-fit">
          Açık Pozisyonları Gör
        </CtaButton>
      </div>
    </section>
  );
}
