import React, { useState } from "react";

/** M16 FAQ accordion. Items toggle independently; grid-rows collapse animation. */
export function Accordion({ items = [] }) {
  const [open, setOpen] = useState(() => new Set());
  function toggle(i) {
    setOpen(prev => { const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next; });
  }
  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={item.q} className={"acc-item" + (isOpen ? " open" : "")}>
            <button className="acc-btn" aria-expanded={isOpen} onClick={() => toggle(i)}>
              <span className="acc-icon" aria-hidden="true">
                <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M2 2 L11 11.5 L20 2" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>
              </span>
              <span className="acc-title">{item.q}</span>
            </button>
            <div className="acc-panel"><div className="acc-clip"><p>{item.a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
