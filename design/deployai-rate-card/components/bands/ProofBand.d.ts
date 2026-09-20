/**
 * P09 proof stat band — prose + big 300-weight stat numerals.
 * @startingPoint section="Bands" subtitle="Stat band with lime numerals" viewport="1280x520"
 */
export interface ProofBandProps {
  /** Optional uppercase credential strip rendered above the band */
  credStrip?: React.ReactNode[];
  heading: React.ReactNode;
  /** Left-column prose paragraphs */
  prose: React.ReactNode[];
  /** Bold lead above the stat rows */
  statsIntro?: React.ReactNode;
  stats: { n: React.ReactNode; d: React.ReactNode }[];
  /** Italic fine-print under the stats */
  fine?: React.ReactNode;
  /** "statnavy" dark + lime numerals (default) or "lavender" light + navy numerals */
  ground?: "statnavy" | "lavender";
}
