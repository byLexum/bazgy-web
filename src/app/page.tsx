import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import GeographySection from "@/components/GeographySection";
import SustainabilitySection from "@/components/SustainabilitySection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME,
  alternateName: "BAZ",
  url: SITE_URL,
  logo: `${SITE_URL}/images/baz-logo.svg`,
  email: "info@bazgy.com",
  telephone: "+90 216 693 03 52",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kavacık Mah. Ertürk Sk. No: 1/1",
    addressLocality: "Beykoz",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-[#F5F5F5] text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Header />
      <HeroSlider />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <GeographySection />
      <SustainabilitySection />
      <CareerSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
