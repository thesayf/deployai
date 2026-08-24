/** M23-style pull-quote (coral) — oversized serif quote + attribution. */
export function CaseQuote({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <section className="bg-coral case-quote" id="quote">
      <div className="wrap">
        <blockquote>&ldquo;{quote}&rdquo;</blockquote>
        <div className="cq-attr">
          <span className="cq-name">{name}</span>
          <span className="cq-role">{role}</span>
        </div>
      </div>
    </section>
  );
}
