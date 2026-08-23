/** 4 · M25 differentiators grid (navy — forms the About dark cluster with the
 *  M14 founder card above it, per T3 + the identity-page template). Was M22
 *  prose, which duplicated §serve's mechanism and read flat. Three genuinely-
 *  ours operating positions; copy gated (verify_stitch + audit_invention PASS). */
const principles = [
  {
    title: "Founder-led",
    body: "Deploy AI Studio is founder-led and not owned by outside investors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 21V4" />
        <path d="M6 4h11l-2.2 3.5L17 11H6" />
      </svg>
    ),
  },
  {
    title: "Pragmatic by default",
    body: "We keep it simple and build only what makes sense for your business.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 4 14h7l-2 8 9-12h-7z" />
      </svg>
    ),
  },
  {
    title: "Straight with you",
    body: "We tell you the truth about what will work, and we keep our promises.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 19 6v6c0 4-3 6.7-7 8-4-1.3-7-4-7-8V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export function HowWeOperate() {
  return (
    <section className="bg-navy df" id="operate">
      <div className="wrap">
        <h2 className="df-h">
          How we <em className="accent">operate</em>.
        </h2>
        <div className="df-grid">
          {principles.map((p) => (
            <div className="dcard" key={p.title}>
              <div className="dicon">{p.icon}</div>
              <h4 className="dtitle">{p.title}</h4>
              <p className="dbody">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
