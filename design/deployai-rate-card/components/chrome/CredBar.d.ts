/** Credential badge wall (A1 cred band) — grayscale badges that colourize on hover. */
export interface CredBarProps {
  /** Uppercase label above the badges */
  label?: string;
  /** Badge list; `src` renders an image, absent renders a text badge */
  badges?: { alt: string; src?: string }[];
}
