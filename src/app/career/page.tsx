import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import CareerPageContent from "@/components/CareerPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Kariyer",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi ekibine katılın — açık pozisyonları keşfedin ve Türkiye'nin büyük mühendislik projelerinde yer alın.",
  path: "/career",
});

export default function CareerPage() {
  return <CareerPageContent />;
}
