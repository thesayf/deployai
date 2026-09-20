/** Site footer — royal link-columns band over an indigo uppercase legal strip. */
export interface FooterProps {
  columns?: { title: string; links: { label: string; href: string }[] }[];
  /** Optional uppercase credential line under the Trust column */
  tagline?: string;
  legalName?: string;
}
