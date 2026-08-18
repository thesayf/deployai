import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "./SiteLink";

export type CtaLink = {
  label: string;
  href: string;
  /** e.g. "pill p-ink" or "tert ink" */
  className: string;
};

type CTABandProps = {
  id?: string;
  heading: ReactNode;
  paragraphs: ReactNode[];
  ctas: CtaLink[];
  /** Right-hand slot; defaults to the inline-calendar placeholder marker. */
  calendarSlot?: ReactNode;
};

/** M17 final CTA — the one warm (coral) moment. */
export function CTABand({
  id = "final",
  heading,
  paragraphs,
  ctas,
  calendarSlot,
}: CTABandProps) {
  return (
    <section className="bg-coral" id={id}>
      <div className="wrap final">
        <div>
          <h2>{heading}</h2>
          {paragraphs.map((p, i) => (
            <p key={i} style={i === 0 ? { marginTop: 18 } : undefined}>
              {p}
            </p>
          ))}
          <div className="ctas">
            {ctas.map((c) => (
              <SiteLink key={c.label} href={c.href} className={cn(c.className)}>
                {c.label}
              </SiteLink>
            ))}
          </div>
        </div>
        <div className="cal-ph">
          {calendarSlot ?? (
            <span className="slot-label">
              INLINE CALENDAR EMBED — wired in Stage 2 build.
              <br />
              No bare forms (brief rule 2).
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
