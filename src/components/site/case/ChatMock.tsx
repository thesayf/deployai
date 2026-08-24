/* Production-looking AI booking assistant, JB Luxe Detailing. Self-contained
   Tailwind; sits inside the M07 product band on the case-study page. */
export function ChatMock() {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* app header */}
      <div className="flex items-center justify-between bg-black px-5 py-3.5 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DEFF4D] text-[13px] font-extrabold text-black">
            JB
          </span>
          <span className="whitespace-nowrap text-[14.5px] font-semibold">
            JB Luxe Assistant
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
        </span>
      </div>

      {/* conversation */}
      <div className="space-y-3 bg-[#f6f7f9] px-3.5 py-4 text-[13px] leading-snug">
        {/* assistant welcome */}
        <div className="flex items-end gap-2">
          <Avatar />
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-zinc-800 shadow-sm ring-1 ring-black/5">
            Welcome to JB Luxe Detailing. What are we detailing today, and what do
            you drive?
          </div>
        </div>

        {/* user */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#0C62FB] px-3.5 py-2.5 text-white shadow-sm">
            Full detail on a 2023 Mercedes S-Class please
          </div>
        </div>

        {/* assistant quote card */}
        <div className="flex items-end gap-2">
          <Avatar />
          <div className="max-w-[86%] space-y-2">
            <div className="overflow-hidden rounded-2xl rounded-bl-md bg-white shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between bg-zinc-900 px-3.5 py-2 text-white">
                <span className="text-[12px] font-semibold tracking-wide">
                  LUXE PACKAGE
                </span>
                <span className="text-[15px] font-bold text-[#DEFF4D]">£249</span>
              </div>
              <ul className="space-y-1.5 px-3.5 py-3 text-[12px] text-zinc-600">
                <li className="flex gap-2"><Tick /> Interior + exterior deep clean</li>
                <li className="flex gap-2"><Tick /> Machine polish &amp; paint enhancement</li>
                <li className="flex gap-2"><Tick /> Ceramic-infused wax, 3-month protection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* booking confirmed */}
        <div className="flex items-end gap-2">
          <Avatar />
          <div className="max-w-[86%] overflow-hidden rounded-2xl rounded-bl-md bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2.5 text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
              </span>
              <span className="text-[12px] font-semibold">Booked in — Sat 24 Aug, 9:00 AM</span>
            </div>
            <div className="px-3.5 py-2.5 text-[12px] text-zinc-600">
              You&rsquo;re all set. I&rsquo;ve sent a confirmation and a deposit link
              to your phone. See you Saturday.
            </div>
          </div>
        </div>
      </div>

      {/* input */}
      <div className="flex items-center gap-2 border-t border-zinc-200/80 bg-white px-3.5 py-3">
        <div className="flex-1 rounded-full bg-zinc-100 px-4 py-2.5 text-[13px] text-zinc-400">
          Message JB Luxe&hellip;
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0C62FB] text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></svg>
        </button>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold text-[#DEFF4D]">
      JB
    </span>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
  );
}
