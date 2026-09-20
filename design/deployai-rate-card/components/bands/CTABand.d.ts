/**
 * M17 final CTA band — the single warm coral moment on a page.
 * @startingPoint section="Bands" subtitle="Coral final CTA with calendar slot" viewport="1280x520"
 */
export interface CTABandProps {
  id?: string;
  heading: React.ReactNode;
  paragraphs: React.ReactNode[];
  /** e.g. { label, href, className: "pill p-ink" } or "tert ink" */
  ctas: { label: string; href: string; className: string }[];
  /** Bold fine-print under the paragraphs */
  fineNote?: React.ReactNode;
  /** Right-hand slot; defaults to a calendar placeholder */
  calendarSlot?: React.ReactNode;
}
