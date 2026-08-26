import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type SiteLinkProps = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

// Internal path routes ("/services") use next/link for client-side nav;
// on-page anchors ("#final") and placeholders ("#") stay plain anchors.
export function SiteLink({ href, children, ...rest }: SiteLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
