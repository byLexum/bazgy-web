import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import ProjectsPageContent from "@/components/ProjectsPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Projeler",
  description:
    "BAZ Yatırım ve İnşaat Anonim Şirketi'nin atık su arıtma, kamu, kurumsal, eğitim ve konut alanlarında tamamladığı, sürdürdüğü ve başlayacağı projeler.",
  path: "/projeler",
});

export default function ProjelerPage() {
  return <ProjectsPageContent />;
}
