import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "İletişim | BAZ Mühendislik ve Yapı A.Ş.",
  description:
    "BAZ Mühendislik ve Yapı ile iletişime geçin — proje teklifleri, sorularınız ve iş birlikleri için bize ulaşın.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
