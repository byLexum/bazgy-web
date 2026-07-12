import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-8 pt-16 md:px-12 md:pt-20">
      <Image
        src="/images/karlitepe-project.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ filter: "grayscale(1) brightness(.4)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/90 to-black/97" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <Image
              src="/images/baz-logo.svg"
              alt="BAZ"
              height={20}
              width={84}
              className="mb-4.5 block h-5 w-auto"
            />
            <div className="max-w-[280px] font-sans text-sm leading-relaxed text-white/55">
              Altyapı, üstyapı ve kamu projelerinde güvenilir mühendislik
              çözümleri.
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              KURUMSAL
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              <a href="#kurumsal">Hakkımızda</a>
              <a href="#surdurulebilirlik">Sürdürülebilirlik</a>
              <a href="#kariyer">Kariyer</a>
              <a href="#iletisim">İletişim</a>
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              FAALİYET ALANLARI
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              <a href="#hizmetler">Atık Su / Su Arıtma</a>
              <a href="#hizmetler">Üstyapı İnşaatları</a>
              <a href="#hizmetler">Kamu Binaları</a>
              <a href="#hizmetler">Altyapı</a>
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-white/40">
              İLETİŞİM
            </div>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/75">
              <span>Adres bilgisi eklenecek</span>
              <span>+90 (___) ___ __ __</span>
              <a href="mailto:info@bazgy.com">info@bazgy.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-7">
          <div className="font-sans text-xs text-white/40">
            © 2026 BAZ Mühendislik ve Yapı A.Ş. Tüm hakları saklıdır.
          </div>
          <div className="flex gap-6 font-sans text-xs text-white/40">
            <a href="#">KVKK Aydınlatma Metni</a>
            <a href="#">Çerez Politikası</a>
            <a href="#">Gizlilik</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
