import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "İletişim | BAZ Yatırım ve İnşaat Anonim Şirketi",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi ile iletişime geçin — proje teklifleri, sorularınız ve iş birlikleri için bize ulaşın.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
