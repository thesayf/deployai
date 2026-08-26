import Head from "next/head";

const SITE = "https://deployai.studio";
const DEFAULT_OG = "/site/og-default.jpg";

type SeoProps = {
  /** Full document title, already including any brand suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical + og:url. */
  path: string;
  /** Absolute-from-root image path, 1200×630. Falls back to the site default. */
  ogImage?: string;
};

/** Shared head block: title, description, self-canonical, Open Graph + Twitter
 *  cards. One instance per page, replacing bare next/head title/meta pairs. */
export function Seo({ title, description, path, ogImage = DEFAULT_OG }: SeoProps) {
  const url = SITE + (path === "/" ? "" : path);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Deploy AI Studio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE + ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE + ogImage} />
    </Head>
  );
}
