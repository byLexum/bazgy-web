import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = pageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi kişisel verilerin korunmasına ilişkin aydınlatma metni — 6698 sayılı KVKK kapsamında veri işleme amaçları ve haklarınız.",
  path: "/kvkk",
});

export default function KvkkPage() {
  return <LegalPageContent doc="kvkk" />;
}
