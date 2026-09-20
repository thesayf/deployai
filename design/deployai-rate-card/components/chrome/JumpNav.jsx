import React, { useEffect, useRef, useState } from "react";

/** M03 in-page jump-nav (periwinkle cleanser band). Sticks on scroll; optional CTA fades in when stuck. */
export function JumpNav({ sections = [], cta }) {
  const sentinelRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="jn-sentinel" />
      <div className={"jn" + (stuck ? " jn-stuck" : "")}>
        <div className="wrap">
          <div className="jn-links">
            {sections.map(s => <a key={s.anchor} href={s.anchor}>{s.label}</a>)}
          </div>
          {cta && <a className="jn-cta" href={cta.href}>{cta.label}</a>}
        </div>
      </div>
    </>
  );
}
