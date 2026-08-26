const SITE = "https://www.deployai.studio";

/** BreadcrumbList JSON-LD for inner pages (case studies). Hierarchy signal for
 *  search: feeds breadcrumb trails in results and sitelinks selection. */
export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name, item: SITE + path },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
