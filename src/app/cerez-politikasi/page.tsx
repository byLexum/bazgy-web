import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "Çerez Politikası | BAZ Mühendislik ve Yapı A.Ş.",
  description:
    "www.bazgy.com üzerinde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.",
};

export default function CerezPolitikasiPage() {
  return <LegalPageContent doc="cerez" />;
}
