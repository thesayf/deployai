import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { withCampaignTracking } from "./campaign-links";

type SiteLinkProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

// Internal path routes ("/services") use next/link for client-side nav;
// on-page anchors ("#final") and placeholders ("#") stay plain anchors.
export function SiteLink({ href, children, ...rest }: SiteLinkProps) {
  const router = useRouter();
  const [sourcePath, setSourcePath] = useState("");

  // Keep server and initial client markup identical on statically built pages.
  useEffect(() => {
    if (router.isReady) setSourcePath(router.asPath);
  }, [router.isReady, router.asPath]);

  const trackedHref = withCampaignTracking(href, sourcePath);
  if (href.startsWith("/")) {
    return (
      <Link href={trackedHref} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={trackedHref} {...rest}>
      {children}
    </a>
  );
}
