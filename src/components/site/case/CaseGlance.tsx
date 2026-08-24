/** A "at a glance" band (navy) — the Slalom precedent: a serif heading, then
 *  Vision / Impact / Key services / Industry + Technologies columns. Leads the
 *  page straight after the hero; front-loads the proof before the story. */
export function CaseGlance({
  vision,
  impact,
  services,
  industry,
  tech,
}: {
  vision: React.ReactNode;
  impact: React.ReactNode;
  services: string[];
  industry: string;
  tech: string[];
}) {
  return (
    <section className="bg-navy case-glance facet" id="glance">
      <div className="wrap">
        <h2 className="cg-h">
          At a <em className="accent">glance</em>.
        </h2>
        <div className="cg-cols">
          <div className="cg-col">
            <h3>Vision</h3>
            <p>{vision}</p>
          </div>
          <div className="cg-col">
            <h3>Impact</h3>
            <p>{impact}</p>
          </div>
          <div className="cg-col">
            <h3>Key services</h3>
            <ul className="cg-chips">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="cg-col">
            <h3>Industry</h3>
            <p>{industry}</p>
            <h3 className="cg-mt">Technologies</h3>
            <ul className="cg-list">
              {tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
