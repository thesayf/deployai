import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./PhoneFrame";
import { SiteLink } from "../SiteLink";

type Surface = {
  label: string;
  desc: string;
  bullets: string[];
  railName: string;
  railDesc: string;
  device: "phone" | "laptop";
  node: ReactNode;
};

/** LOCKED 2026-08-24 · Product proof — P05/M07 tabbed solutions (aitx-04).
 *  This is the reusable case-page product section. Compose it; do not re-derive.
 *
 *  Anatomy (all measured against the aitx-04 capture + M07.json):
 *  - centered display heading (em serif accent) + balanced centered intro;
 *  - tab bar at the panel's 1344px width, tabs flex:1 (equal thirds), active =
 *    blue pill;
 *  - grey field panel (1344 max, 80/96 inset, 30px radius, no border);
 *  - LEFT: tp-name 26/700 · plain tp-desc 20/32 (62ch) · bold "What changed:"
 *    help line · 4 disc bullets 20/32 · solid-blue pill CTA with arrow;
 *  - RIGHT rail 420px: fixed 380px transparent media slot (phone fills it,
 *    desktop shots centre in it) · "Product screen" eyebrow · bold name ·
 *    plain description. Desktop screens render in a 900×562 (16:10) viewport
 *    scaled to 404×252 — real screenshot proportions, never square.
 *  - Panels render STACKED in one grid cell (.cp-panels), so the tallest sets
 *    the height for all: switching tabs never moves the page, with any copy.
 *
 *  Per-surface contract: { label, desc, bullets[4], railName, railDesc,
 *  device: "phone"|"laptop", node }. Screens are self-contained mock
 *  components in the CLIENT'S brand, not ours. */
export function CaseProduct({
  heading,
  intro,
  surfaces,
}: {
  heading: ReactNode;
  intro: ReactNode;
  surfaces: Surface[];
}) {
  const [active, setActive] = useState(0);

  return (
    <section className="caseprod" id="product">
      <div className="wrap">
        <h2>{heading}</h2>
        <p className="cp-intro">{intro}</p>

        <div className="tabbar" role="tablist">
          {surfaces.map((s, i) => (
            <button
              key={s.label}
              className={cn("tabbtn", active === i && "on")}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* all panels render stacked in one grid cell — the tallest sets the
            height, so switching tabs never moves the page, with any content */}
        <div className="cp-panels">
          {surfaces.map((s, i) => (
            <div
              key={s.label}
              className={cn("tabpanel", active === i && "on")}
              role="tabpanel"
              aria-hidden={active !== i}
            >
              <div className="cp-copy">
                <div className="tp-name">{s.label}</div>
                <p className="tp-desc">{s.desc}</p>
                <div className="tp-help">What changed:</div>
                <ul className="tp-bullets">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tp-cta">
                  <SiteLink className="pill p-blue" href="/book">
                    Let&rsquo;s talk about yours
                    {"  →"}
                  </SiteLink>
                </div>
              </div>

              <div className="cp-rail">
                {/* fixed-size media slot: identical silhouette on every tab, so the
                  eyebrow/name/desc below start at the same y whether the screen
                  is a portrait phone or a landscape desktop shot */}
                <div className="cp-slot">
                  {s.device === "phone" ? (
                    <div className="cp-phone-thumb">
                      <PhoneFrame>{s.node}</PhoneFrame>
                    </div>
                  ) : (
                    <div className="cp-shot">
                      <div className="cp-shot-inner">{s.node}</div>
                    </div>
                  )}
                </div>
                <div className="cp-rail-eyebrow">Product screen</div>
                <div className="cp-rail-name">{s.railName}</div>
                <p className="cp-rail-desc">{s.railDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
