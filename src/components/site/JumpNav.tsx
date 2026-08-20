import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "./SiteLink";

export type JumpSection = { label: string; anchor: string };

type JumpNavProps = {
  /** In-page anchors — fully replaceable per page. */
  sections: JumpSection[];
  /**
   * Optional right-aligned CTA that stays hidden until the bar sticks to the
   * top of the viewport (i.e. once the site header has scrolled away). Desktop
   * behaviour; hidden on mobile.
   */
  cta?: { label: string; href: string };
};

/**
 * M03 in-page jump-nav (periwinkle cleanser band). Sticks to the top on scroll
 * (desktop); when stuck, an optional "Let's talk" CTA fades in on the right —
 * modelled on Slalom's jump-links. Section names are driven by the `sections`
 * prop. Not used on Home.
 */
export function JumpNav({ sections, cta }: JumpNavProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="jn-sentinel" />
      <div className={cn("jn", stuck && "jn-stuck")}>
        <div className="wrap">
          <div className="jn-links">
            {sections.map((s) => (
              <a key={s.anchor} href={s.anchor}>
                {s.label}
              </a>
            ))}
          </div>
          {cta && (
            <SiteLink className="jn-cta" href={cta.href}>
              {cta.label}
            </SiteLink>
          )}
        </div>
      </div>
    </>
  );
}
