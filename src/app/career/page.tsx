import type { Metadata } from "next";
import CareerPageContent from "@/components/CareerPageContent";

export const metadata: Metadata = {
  title: "Kariyer | BAZ Yatırım ve İnşaat Anonim Şirketi",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi ekibine katılın — açık pozisyonları keşfedin ve Türkiye'nin büyük mühendislik projelerinde yer alın.",
};

export default function CareerPage() {
  return <CareerPageContent />;
}
