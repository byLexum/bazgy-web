import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Çerez Politikası",
  description:
    "www.bazgy.com üzerinde kullanılan çerezler, kullanım amaçları ve çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgilendirme.",
  path: "/cerez-politikasi",
});

export default function CerezPolitikasiPage() {
  return <LegalPageContent doc="cerez" />;
}
