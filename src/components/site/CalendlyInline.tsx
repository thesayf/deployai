import { useEffect, useRef } from "react";

type CalendlyGlobal = {
  Calendly?: {
    initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
  };
};

/**
 * Inline Calendly booking widget (no popup). Loads Calendly's widget.js once,
 * then mounts the scheduler into this container. Reused wherever a booking
 * calendar is embedded (home final band, services, /book). Fixed height via
 * `.cal-embed`; fills the surrounding white card.
 */
export function CalendlyInline({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as unknown as CalendlyGlobal;
    let cancelled = false;

    const mount = () => {
      if (cancelled || !ref.current || !w.Calendly) return;
      ref.current.innerHTML = "";
      w.Calendly.initInlineWidget({ url, parentElement: ref.current });
    };

    const id = "calendly-widget-js";
    const existing = document.getElementById(id) as HTMLScriptElement | null;

    if (w.Calendly) {
      mount();
    } else if (existing) {
      existing.addEventListener("load", mount);
    } else {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.addEventListener("load", mount);
      document.body.appendChild(s);
    }

    return () => {
      cancelled = true;
    };
  }, [url]);

  return <div className="cal-embed" ref={ref} aria-label="Booking calendar" />;
}
