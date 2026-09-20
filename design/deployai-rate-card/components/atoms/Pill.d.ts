/**
 * Pill button/link — the brand's only button. 48px tall, 50px radius, 2px border, weight 700.
 * @startingPoint section="Atoms" subtitle="Pill buttons and text links" viewport="700x260"
 */
export interface PillProps {
  /** Visual variant: "blue" solid primary, "white" (on dark), "ghost" outline-on-dark, "ink" outline-on-light */
  variant?: "blue" | "white" | "ghost" | "ink";
  href?: string;
  onClick?: () => void;
  /** Compact 36px nav-CTA size */
  small?: boolean;
  className?: string;
  children?: React.ReactNode;
}
