export default function ContactSection() {
  return (
    <section
      id="iletisim"
      className="bg-black px-6 py-24 text-center md:px-12 md:py-[140px]"
    >
      <h2 className="mx-auto mb-6 max-w-[700px] font-sans text-3xl font-extrabold leading-tight text-[#F5F4F0] md:text-[40px]">
        Bir sonraki büyük proje için konuşalım.
      </h2>
      <a
        href="mailto:info@bazgy.com"
        className="inline-block bg-white px-8 py-[17px] font-sans text-[15px] font-semibold text-black"
      >
        İletişime Geç — info@bazgy.com
      </a>
    </section>
  );
}
