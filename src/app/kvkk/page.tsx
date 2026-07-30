import type { Metadata } from "next";
import LegalPageContent from "@/components/LegalPageContent";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | BAZ Mühendislik ve Yapı A.Ş.",
  description:
    "BAZ Yatırım ve İnşaat A.Ş. kişisel verilerin korunmasına ilişkin aydınlatma metni — 6698 sayılı KVKK kapsamında veri işleme amaçları ve haklarınız.",
};

export default function KvkkPage() {
  return <LegalPageContent doc="kvkk" />;
}
