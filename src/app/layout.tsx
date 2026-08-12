import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BAZ Yatırım ve İnşaat Anonim Şirketi",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi; su arıtma altyapısından kamu ve kurumsal binalara uzanan geniş bir yelpazede mühendislik ve yapım hizmeti sunar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${manrope.variable} ${plexMono.variable}`}>
      <body className="antialiased bg-[#F5F5F5] text-[#111111]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
