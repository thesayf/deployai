/* Booking / calendar mockup — JB Luxe Detailing. Self-contained Tailwind. */
const slots = [
  { time: "8:00", label: "Ceramic coating · BMW M4", who: "Daniel O.", state: "done" },
  { time: "10:30", label: "Luxe detail · Mercedes S-Class", who: "New booking", state: "live" },
  { time: "1:00", label: "Interior deep clean · Audi Q7", who: "Sofia M.", state: "set" },
  { time: "3:30", label: "Paint correction · Ferrari F8", who: "Marcus R.", state: "set" },
];

export function BookingMock() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-5 py-3.5 text-white">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/jblogo.png" alt="JB Luxe Detailing" className="h-6 w-auto" />
          <span className="text-[14px] font-semibold">Diary</span>
        </div>
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/70">Sat 24 Aug</span>
      </div>

      <div className="flex items-center justify-between bg-zinc-50 px-5 py-2.5 text-[11.5px] text-zinc-500">
        <span>4 jobs · fully booked</span>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Auto-scheduled by assistant
        </span>
      </div>

      <div className="divide-y divide-zinc-100">
        {slots.map((s) => (
          <div key={s.time} className="flex items-center gap-4 px-5 py-2">
            <span className="w-12 flex-shrink-0 text-[12px] font-semibold text-zinc-400">{s.time}</span>
            <div
              className={`min-w-0 flex-1 rounded-xl border-l-4 px-3.5 py-2 ${
                s.state === "live"
                  ? "border-[#0C62FB] bg-blue-50"
                  : s.state === "done"
                  ? "border-zinc-300 bg-zinc-50"
                  : "border-zinc-900 bg-white ring-1 ring-black/5"
              }`}
            >
              <div className="truncate text-[13px] font-semibold text-zinc-900">{s.label}</div>
              <div className="text-[11.5px] text-zinc-500">
                {s.state === "live" ? (
                  <span className="font-medium text-[#0C62FB]">{s.who} · just booked itself</span>
                ) : (
                  s.who
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
