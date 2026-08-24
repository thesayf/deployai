/* CRM dashboard mockup — JB Luxe Detailing. Self-contained Tailwind. */
const customers = [
  { name: "Marcus Reid", car: "Ferrari F8", stat: "Due for re-detail", tone: "amber", last: "9 weeks ago" },
  { name: "Priya Shah", car: "Range Rover Sport", stat: "Booked Sat", tone: "green", last: "Today" },
  { name: "Tom Ellison", car: "Porsche Cayenne", stat: "Quote sent", tone: "blue", last: "2 days ago" },
  { name: "Aisha Khan", car: "Tesla Model S", stat: "Repeat · 4th detail", tone: "green", last: "3 weeks ago" },
];
const tone: Record<string, string> = {
  amber: "bg-[#fef3c7] text-[#b45309] ring-[#fcd34d]",
  green: "bg-[#d1fae5] text-[#047857] ring-[#6ee7b7]",
  blue: "bg-[#dbeafe] text-[#1d4ed8] ring-[#93c5fd]",
};

export function CrmMock() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-5 py-3.5 text-white">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/jblogo.png" alt="JB Luxe Detailing" className="h-6 w-auto" />
          <span className="text-[14px] font-semibold">Customer CRM</span>
        </div>
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/70">This month</span>
      </div>

      {/* stat strip */}
      <div className="grid grid-cols-3 gap-px bg-zinc-100">
        {[
          ["£11,240", "Booked revenue"],
          ["38", "Details completed"],
          ["12", "Follow-ups due"],
        ].map(([n, l]) => (
          <div key={l} className="bg-white px-4 py-3.5">
            <div className="text-[19px] font-bold tracking-tight text-zinc-900">{n}</div>
            <div className="text-[11px] text-zinc-500">{l}</div>
          </div>
        ))}
      </div>

      {/* customer rows */}
      <div className="divide-y divide-zinc-100">
        {customers.map((c) => (
          <div key={c.name} className="flex items-center gap-3 px-5 py-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[12px] font-semibold text-[#DEFF4D]">
              {c.name.split(" ").map((w) => w[0]).join("")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13.5px] font-semibold text-zinc-900">{c.name}</div>
              <div className="truncate text-[11.5px] text-zinc-500">{c.car}</div>
            </div>
            <span className={`hidden sm:inline rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${tone[c.tone]}`}>
              {c.stat}
            </span>
            <span className="w-16 text-right text-[11px] text-zinc-400">{c.last}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
