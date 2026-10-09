import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi'nin kurumsal profili, vizyonu, misyonu, değerleri ve sürdürülebilirlik yaklaşımı hakkında bilgi edinin.",
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  return <AboutPageContent />;
}
