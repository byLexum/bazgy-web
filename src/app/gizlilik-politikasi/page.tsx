import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Gizlilik Politikası",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi gizlilik politikası — kişisel verilerin işlenmesi, veri güvenliği ve üçüncü taraf bağlantıları hakkında bilgilendirme.",
  path: "/gizlilik-politikasi",
});

export default function GizlilikPolitikasiPage() {
  return <LegalPageContent doc="gizlilik" />;
}
