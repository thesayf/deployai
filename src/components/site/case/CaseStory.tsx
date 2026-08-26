import type { ReactNode } from "react";

type Chapter = { head: ReactNode; body: ReactNode[] };

/** M22 narrative body (white) — sentence-style sub-heads as chapter breaks,
 *  with one optional image interruption. */
export function CaseStory({
  chapters,
  image,
}: {
  chapters: Chapter[];
  image?: { src: string; caption?: string };
}) {
  return (
    <section className="case-story" id="story">
      <div className="wrap story-col">
        {chapters.map((c, i) => (
          <div className="chapter" key={i}>
            <h2>{c.head}</h2>
            {c.body.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
            {image && i === 0 && (
              <figure className="story-fig">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={image.src} alt="" />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
