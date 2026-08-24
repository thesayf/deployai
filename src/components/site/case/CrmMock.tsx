/* CRM dashboard mockup — JB Luxe Detailing. Self-contained Tailwind. */
import type { ReactNode } from "react";

const customers = [
  { name: "Marcus Reid", car: "Ferrari F8", stat: "Due for re-detail", tone: "gold", last: "9 weeks ago" },
  { name: "Priya Shah", car: "Range Rover Sport", stat: "Booked Sat", tone: "black", last: "Today" },
  { name: "Tom Ellison", car: "Porsche Cayenne", stat: "Quote sent", tone: "zinc", last: "2 days ago" },
  { name: "Aisha Khan", car: "Tesla Model S", stat: "Repeat · 4th detail", tone: "goldOutline", last: "3 weeks ago" },
];
/* JB's 2-hue status system (gold + zinc/black), matching the diary's conventions:
   filled gold = needs action, solid black = confirmed, zinc = pending, gold outline = loyalty. */
const tone: Record<string, string> = {
  gold: "bg-[#faf6ea] text-[#9A7B2E] ring-[#C9A24B]/40",
  black: "bg-zinc-900 text-white ring-zinc-900",
  zinc: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  goldOutline: "bg-white text-[#9A7B2E] ring-[#C9A24B]/60",
};

export function CrmMock() {
  return (
    <div className="flex h-full w-full bg-white">
      {/* left nav rail — proves this is an app, not a card */}
      <nav className="flex w-[52px] flex-shrink-0 flex-col items-center gap-1 bg-zinc-900 py-3">
        <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-[#C9A24B] text-[11px] font-extrabold text-black">
          JB
        </span>
        <RailIcon active><path d="M3 12h7V3H3v9zm0 9h7v-7H3v7zm11 0h7V12h-7v9zm0-18v7h7V3h-7z" /></RailIcon>
        <RailIcon><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></RailIcon>
        <RailIcon><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" /></RailIcon>
        <RailIcon><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" /></RailIcon>
        <span className="mt-auto flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80">
          JB
        </span>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-900 px-5 py-3 text-white">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/jblogo.png" alt="JB Luxe Detailing" className="h-6 w-auto" />
            <span className="text-[14px] font-semibold">Customer CRM</span>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
            This month
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </span>
        </div>

        {/* toolbar: search + filter */}
        <div className="flex items-center gap-2 border-b border-zinc-100 bg-white px-5 py-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 text-zinc-400">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            <span className="text-[11.5px]">Search customers or cars&hellip;</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-600 ring-1 ring-zinc-200">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" /></svg>
            Filter
          </span>
        </div>

        {/* stat strip */}
        <div className="grid grid-cols-3 gap-px bg-zinc-100">
          <div className="bg-white px-4 py-3.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[19px] font-bold tracking-tight text-zinc-900">£11,240</span>
              <span className="text-[10px] font-semibold text-[#9A7B2E]">↑ 12%</span>
            </div>
            <div className="text-[11px] text-zinc-500">Booked revenue</div>
          </div>
          <div className="bg-white px-4 py-3.5">
            <div className="text-[19px] font-bold tracking-tight text-zinc-900">38</div>
            <div className="text-[11px] text-zinc-500">Details completed</div>
          </div>
          <div className="bg-white px-4 py-3.5">
            <div className="text-[19px] font-bold tracking-tight text-zinc-900">12</div>
            <div className="text-[11px] text-zinc-500">Follow-ups due</div>
          </div>
        </div>

        {/* customer rows */}
        <div className="flex-1 divide-y divide-zinc-100">
          {customers.map((c) => (
            <div key={c.name} className="flex items-center gap-3 px-5 py-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[12px] font-semibold text-[#C9A24B]">
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
              <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          ))}
        </div>

        {/* overflow footer — implies the 500+ book behind these four */}
        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-5 py-2.5">
          <span className="text-[11px] text-zinc-400">Showing 4 of 214 customers</span>
          <span className="text-[11px] font-semibold text-[#9A7B2E]">View all</span>
        </div>
      </div>
    </div>
  );
}

function RailIcon({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        active ? "bg-white/10 text-[#C9A24B]" : "text-white/45"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}
