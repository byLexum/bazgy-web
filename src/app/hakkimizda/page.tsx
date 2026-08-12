import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "Hakkımızda | BAZ Yatırım ve İnşaat Anonim Şirketi",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi'nin kurumsal profili, vizyonu, misyonu, değerleri ve sürdürülebilirlik yaklaşımı hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return <AboutPageContent />;
}
