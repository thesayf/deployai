/** Site header — transparent overlay nav for navy heroes, lime hover underline, pill CTA. */
export interface NavbarProps {
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
  /** "dark" transparent overlay (default); "light" solid on light grounds */
  variant?: "dark" | "light";
  /** Pill class for the CTA */
  ctaVariant?: "p-ghost" | "p-blue" | "p-white";
  /** Relative path to the assets directory holding the logo PNGs */
  logoBase?: string;
}
