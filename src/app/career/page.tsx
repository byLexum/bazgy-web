import type { Metadata } from "next";
import CareerPageContent from "@/components/CareerPageContent";

export const metadata: Metadata = {
  title: "Kariyer | BAZ Mühendislik ve Yapı A.Ş.",
  description:
    "BAZ Mühendislik ve Yapı ekibine katılın — açık pozisyonları keşfedin ve Türkiye'nin büyük mühendislik projelerinde yer alın.",
};

export default function CareerPage() {
  return <CareerPageContent />;
}
