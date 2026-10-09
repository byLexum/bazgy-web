import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi ile iletişime geçin — proje teklifleri, sorularınız ve iş birlikleri için bize ulaşın.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
