/* JB Luxe booking assistant — approved conversation slice (workflow-signed copy).
   Opens mid-thread (clipped at the top, as if scrolled up) and lands on the quote
   moment: the one thing a contact form can't do. JB brand: black + gold, no
   lime/blue. Self-contained Tailwind. */
const GOLD = "#C9A24B";

export function ChatMock() {
  return (
    <div className="flex w-full flex-col bg-white">
      {/* phone status bar */}
      <div className="flex items-center justify-between bg-black px-5 pt-2 pb-1 text-white">
        <span className="text-[11px] font-semibold tracking-tight">9:41</span>
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 14" className="h-2.5 w-3.5" fill="currentColor" aria-hidden="true">
            <rect x="0" y="9" width="3" height="5" rx="1" />
            <rect x="5" y="6" width="3" height="8" rx="1" />
            <rect x="10" y="3" width="3" height="11" rx="1" />
            <rect x="15" y="0" width="3" height="14" rx="1" />
          </svg>
          <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M8 12l2-2.5a3 3 0 00-4 0L8 12z" />
            <path d="M8 5.5a6.5 6.5 0 00-4.6 1.9l1.2 1.3A4.6 4.6 0 018 8.4a4.6 4.6 0 013.4 1.3l1.2-1.3A6.5 6.5 0 008 5.5z" />
            <path d="M8 1.5A10.5 10.5 0 00.6 4.6l1.3 1.3A8.6 8.6 0 018 3.4a8.6 8.6 0 016.1 2.5l1.3-1.3A10.5 10.5 0 008 1.5z" />
          </svg>
          <span className="flex items-center gap-0.5">
            <span className="flex h-[11px] w-[20px] items-center rounded-[3px] p-[1.5px] ring-1 ring-white/60">
              <span className="h-full w-[72%] rounded-[1.5px] bg-white" />
            </span>
            <span className="h-[4px] w-[1.5px] rounded-r bg-white/60" />
          </span>
        </span>
      </div>

      {/* app header */}
      <div className="flex items-center justify-between bg-black px-5 pb-3 pt-1 text-white">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A24B] text-[13px] font-extrabold text-black">
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

      {/* conversation — starts mid-thread, clipped at the top */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4 bg-gradient-to-b from-[#f6f7f9] to-transparent" />
        <div className="space-y-3 bg-[#f6f7f9] px-3.5 pb-4 pt-3 text-[13px] leading-snug">
          {/* tail of the assistant's quote line */}
          <div className="flex items-end gap-2">
            <Avatar />
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-zinc-800 shadow-sm ring-1 ring-black/5">
              &hellip;for the 911, that&rsquo;s our Luxe Detail:
            </div>
          </div>

          {/* quote card */}
          <div className="flex items-end gap-2">
            <Avatar />
            <div className="max-w-[88%] overflow-hidden rounded-2xl rounded-bl-md bg-white shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between bg-zinc-900 px-3.5 py-2 text-white">
                <span className="text-[12px] font-semibold tracking-wide">LUXE DETAIL</span>
                <span className="text-[15px] font-bold text-[#E4C77A]">£249</span>
              </div>
              <div className="border-b border-zinc-100 px-3.5 py-2 text-[11.5px] text-zinc-500">
                Porsche 911 · approx 4 hrs · Putney, SW15
              </div>
              <ul className="space-y-1.5 px-3.5 py-3 text-[12px] text-zinc-600">
                <li className="flex gap-2"><Tick /> machine polish to lift the swirls</li>
                <li className="flex gap-2"><Tick /> full interior deep clean</li>
                <li className="flex gap-2"><Tick /> protective seal</li>
              </ul>
            </div>
          </div>

          {/* customer */}
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-zinc-900 px-3.5 py-2.5 text-white shadow-sm">
              that&rsquo;s the one. when can you come?
            </div>
          </div>

          {/* assistant, peeking at the fold */}
          <div className="flex items-end gap-2">
            <Avatar />
            <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-zinc-800 shadow-sm ring-1 ring-black/5">
              How&rsquo;s this week looking for you?
            </div>
          </div>
        </div>
      </div>

      {/* input */}
      <div className="flex items-center gap-2 border-t border-zinc-200/80 bg-white px-3.5 py-3">
        <div className="flex-1 rounded-full bg-zinc-100 px-4 py-2.5 text-[13px] text-zinc-400">
          Message JB Luxe&hellip;
        </div>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A24B] text-black"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></svg>
        </button>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A24B] text-[9px] font-bold text-black">
      JB
    </span>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#9A7B2E]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 13 4 4L19 7" /></svg>
  );
}
