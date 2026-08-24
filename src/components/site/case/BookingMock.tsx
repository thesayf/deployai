/* Booking / day-view diary mockup — JB Luxe Detailing. Self-contained Tailwind.
   A real calendar day view: a time axis with proportional gaps, hour gridlines,
   a "now" line, and jobs positioned by their start time + duration. */
const HOUR_PX = 50; // vertical pixels per hour (fills a 16:10 desktop viewport)
const START = 8; // 08:00
const END = 17; // 17:00
const NOW = 10 + 42 / 60; // 10:42, lands on the just-booked slot

const slots = [
  { time: "8:00", label: "Ceramic coating · BMW M4", who: "Daniel O.", loc: "Chelsea", start: 8, dur: 2, state: "done" },
  { time: "10:30", label: "Luxe detail · Mercedes S-Class", who: "New booking", loc: "Kensington", start: 10.5, dur: 2, state: "live" },
  { time: "1:00", label: "Interior deep clean · Audi Q7", who: "Sofia M.", loc: "Richmond", start: 13, dur: 1.5, state: "set" },
  { time: "3:30", label: "Paint correction · Ferrari F8", who: "Marcus R.", loc: "Mayfair", start: 15.5, dur: 1.5, state: "set" },
];

const hours = Array.from({ length: END - START + 1 }, (_, i) => START + i);
const label = (h: number) => (((h + 11) % 12) + 1).toString();
const bodyH = (END - START) * HOUR_PX;

export function BookingMock() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-5 py-3 text-white">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/jblogo.png" alt="JB Luxe Detailing" className="h-6 w-auto" />
          <span className="text-[14px] font-semibold">Diary</span>
        </div>
        <div className="flex items-center gap-2 text-white/85">
          <Chevron dir="left" />
          <span className="text-[11px] font-medium">Sat 24 Aug</span>
          <Chevron dir="right" />
        </div>
      </div>

      {/* summary + legend */}
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-5 py-2 text-[11px]">
        <span className="text-zinc-500">4 jobs · fully booked</span>
        <span className="flex items-center gap-3">
          <Key color="bg-zinc-300" text="Done" />
          <Key color="bg-[#C9A24B]" text="New" />
          <Key color="bg-zinc-800" text="Confirmed" />
        </span>
      </div>

      {/* day timeline */}
      <div className="relative px-5 py-3" style={{ height: bodyH + 24 }}>
        {/* hour gridlines + labels */}
        {hours.map((h, i) => (
          <div key={h} className="absolute left-5 right-5 flex items-center" style={{ top: 12 + i * HOUR_PX }}>
            <span className="w-8 flex-shrink-0 text-[10px] font-medium text-zinc-400">{label(h)}</span>
            <span className="h-px flex-1 bg-zinc-100" />
          </div>
        ))}

        {/* jobs, positioned by start time */}
        {slots.map((s) => {
          const top = 12 + (s.start - START) * HOUR_PX;
          const height = s.dur * HOUR_PX - 6;
          const accent =
            s.state === "live" ? "border-[#C9A24B] bg-[#faf6ea]" : s.state === "done" ? "border-zinc-300 bg-zinc-50" : "border-zinc-800 bg-white ring-1 ring-black/5";
          return (
            <div
              key={s.time}
              className={`absolute left-[52px] right-5 overflow-hidden rounded-lg border-l-4 px-3 py-1.5 ${accent}`}
              style={{ top, height }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[12px] font-semibold text-zinc-900">{s.label}</span>
                <span className="flex-shrink-0 text-[10px] text-zinc-400">{s.time}</span>
              </div>
              <div className="mt-0.5 truncate text-[10.5px] text-zinc-500">
                {s.state === "live" ? (
                  <span className="font-medium text-[#9A7B2E]">{s.who} · 10:38</span>
                ) : (
                  <span>{s.who}</span>
                )}
                <span className="text-zinc-400"> · {s.dur}h · {s.loc}</span>
              </div>
            </div>
          );
        })}

        {/* now line */}
        <div className="absolute left-5 right-5 z-10 flex items-center" style={{ top: 12 + (NOW - START) * HOUR_PX }}>
          <span className="-ml-1 flex items-center gap-1">
            <span className="rounded bg-[#C9A24B] px-1 py-px text-[9px] font-bold text-black">10:42</span>
          </span>
          <span className="h-px flex-1 bg-[#C9A24B]" />
        </div>
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function Key({ color, text }: { color: string; text: string }) {
  return (
    <span className="flex items-center gap-1 text-zinc-400">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {text}
    </span>
  );
}
