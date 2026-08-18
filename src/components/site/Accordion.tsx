import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

type AccordionProps = {
  items: AccordionItem[];
};

/** M16 FAQ accordion. Each item toggles independently (multiple can be open). */
export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className={cn("acc-item", isOpen && "open")}>
            <button
              className="acc-btn"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              <span className="acc-icon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
              <span className="acc-title">{item.q}</span>
            </button>
            <div className="acc-panel">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
