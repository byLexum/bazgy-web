// Public origin used for canonical URLs, the sitemap and social previews.
// Override with NEXT_PUBLIC_SITE_URL if the site moves to another domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.bazgy.com").replace(/\/$/, "");

export const COMPANY_NAME = "BAZ Yatırım ve İnşaat Anonim Şirketi";

// Child segments replace the parent's openGraph object instead of merging it,
// so every page builds its own share tags from the same base.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website" as const,
      siteName: COMPANY_NAME,
      locale: "tr_TR",
      alternateLocale: ["en_US"],
      url: path,
      title: `${title} | ${COMPANY_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${title} | ${COMPANY_NAME}`,
      description,
    },
  };
}
