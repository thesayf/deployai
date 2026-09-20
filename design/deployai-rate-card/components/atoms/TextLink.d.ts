/** Tertiary text link — bold blue text link, or arrow link with a → suffix. */
export interface TextLinkProps {
  /** "tert" plain bold link; "arrow" appends a → glyph */
  kind?: "tert" | "arrow";
  /** "blue" default; "dark" white+underline for navy grounds; "ink" for light accent grounds */
  tone?: "blue" | "dark" | "ink";
  href?: string;
  children?: React.ReactNode;
}
