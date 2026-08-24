import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./PhoneFrame";
import { LaptopFrame } from "./LaptopFrame";

type Surface = {
  label: string;
  desc: string;
  device: "phone" | "laptop";
  node: ReactNode;
};

/** Product proof (navy + .facet). One static device composition — a laptop
 *  (CRM / Diary) with a phone docked at its corner, both always visible at real
 *  proportions. The selector shifts FOCUS between devices rather than swapping
 *  shapes, and crossfades the laptop's own content. Per ui-ux-designer spec. */
export function CaseProduct({
  heading,
  intro,
  surfaces,
}: {
  heading: ReactNode;
  intro: ReactNode;
  surfaces: Surface[];
}) {
  const phoneIdx = surfaces.findIndex((s) => s.device === "phone");
  const laptopIdxs = surfaces
    .map((s, i) => ({ s, i }))
    .filter((x) => x.s.device === "laptop")
    .map((x) => x.i);

  const [active, setActive] = useState(0);
  const [laptopIdx, setLaptopIdx] = useState(laptopIdxs[0] ?? 0);
  const activeDevice = surfaces[active]?.device;

  function select(i: number) {
    setActive(i);
    if (surfaces[i].device === "laptop") setLaptopIdx(i);
  }

  return (
    <section className="bg-navy facet caseprod" id="product">
      <div className="wrap cp-grid">
        <div className="cp-side">
          <h2>{heading}</h2>
          <p className="cp-intro">{intro}</p>
          <div className="cp-menu" role="tablist">
            {surfaces.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={active === i}
                className={cn("cp-item", active === i && "on")}
                onClick={() => select(i)}
              >
                <span className="cp-item-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="cp-item-body">
                  <span className="cp-item-label">{s.label}</span>
                  <span className="cp-item-desc">{s.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="cp-stage">
          <div className="cp-glow" aria-hidden="true" />
          <div
            className={cn(
              "cp-device laptop",
              activeDevice === "laptop" ? "focus" : "dim"
            )}
          >
            <LaptopFrame>
              <div className="cp-laptop-content">
                {laptopIdxs.map((idx) => (
                  <div key={idx} className={cn(idx === laptopIdx && "on")}>
                    {surfaces[idx].node}
                  </div>
                ))}
              </div>
            </LaptopFrame>
          </div>
          <div
            className={cn(
              "cp-device phone",
              activeDevice === "phone" ? "focus" : "dim"
            )}
          >
            <div className="dv-phone-slot">
              <PhoneFrame>{surfaces[phoneIdx]?.node}</PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
