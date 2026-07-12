import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import StatsBand from "@/components/StatsBand";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import GeographySection from "@/components/GeographySection";
import SustainabilitySection from "@/components/SustainabilitySection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-[#F5F5F5] text-[#111111]">
      <Header />
      <HeroSlider />
      <StatsBand />
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
