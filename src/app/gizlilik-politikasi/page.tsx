import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | BAZ Yatırım ve İnşaat Anonim Şirketi",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi gizlilik politikası — kişisel verilerin işlenmesi, veri güvenliği ve üçüncü taraf bağlantıları hakkında bilgilendirme.",
};

export default function GizlilikPolitikasiPage() {
  return <LegalPageContent doc="gizlilik" />;
}
