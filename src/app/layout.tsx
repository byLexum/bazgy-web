import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "BAZ Yatırım ve İnşaat Anonim Şirketi; atık su arıtma tesislerinden kamu, kurumsal ve konut yapılarına uzanan geniş bir yelpazede mühendislik ve yapım hizmeti sunar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description,
  applicationName: "BAZ",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: COMPANY_NAME,
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    url: "/",
    title: COMPANY_NAME,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={manrope.variable}>
      <body className="antialiased bg-[#F5F5F5] text-[#111111]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
