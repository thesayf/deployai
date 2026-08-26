/** Organization + WebSite JSON-LD (@graph), rendered on the home page only.
 *  Schema mirrors on-page facts — nothing here that the site doesn't say. */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.deployai.studio/#organization",
      name: "Deploy AI Studio",
      legalName: "Hinds Tech and Artificial Intelligence LLC",
      url: "https://www.deployai.studio",
      logo: "https://www.deployai.studio/favicon/web-app-manifest-512x512.png",
      description:
        "A boutique applied-AI consultancy. We show you where AI fits inside your business and make it work.",
      founder: { "@type": "Person", name: "Rudi Hinds" },
      sameAs: ["https://www.linkedin.com/in/rudi-hinds-3b25b6137/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.deployai.studio/#website",
      name: "Deploy AI Studio",
      url: "https://www.deployai.studio",
      publisher: { "@id": "https://www.deployai.studio/#organization" },
    },
  ],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
