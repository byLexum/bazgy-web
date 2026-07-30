import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | BAZ Mühendislik ve Yapı A.Ş.",
  description:
    "BAZ Yatırım ve İnşaat A.Ş. gizlilik politikası — kişisel verilerin işlenmesi, veri güvenliği ve üçüncü taraf bağlantıları hakkında bilgilendirme.",
};

export default function GizlilikPolitikasiPage() {
  return <LegalPageContent doc="gizlilik" />;
}
