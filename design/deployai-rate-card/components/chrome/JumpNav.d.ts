/** M03 sticky in-page jump-nav — 56px periwinkle band, uppercase tracked anchors. */
export interface JumpNavProps {
  sections: { label: string; anchor: string }[];
  /** Optional CTA that fades in once the bar sticks */
  cta?: { label: string; href: string };
}
