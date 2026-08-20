/**
 * 3 · A9 residency control panel (white). Prose left, a vertical titled list of
 * ticked, verifiable residency facts right (inline-SVG blue ticks). Residency-only
 * scope. Ported from mock-data-residency.html §3.
 */
export function ResidencyControl() {
  const facts = [
    "Deployed inside your own cloud account, no new vendor infrastructure.",
    "Data stored in the region you choose.",
    "Requests processed in that same region.",
    "You remain the data controller; the model runs as your processor.",
  ];
  return (
    <section className="arch" id="where">
      <div className="wrap">
        <h2>
          Where your data <em>lives</em> is a deployment decision, not a fixed
          default.
        </h2>
        <div className="grid">
          <div className="prose">
            <p>
              The model runs in every major cloud. It can be deployed inside your
              own AWS account through Amazon Bedrock, your Google Cloud project
              through Vertex AI, or your Microsoft Azure tenant, each keeping
              inference in the region and account you already govern. Where a
              first-party deployment fits better, inference can be pinned to a
              named region instead.
            </p>
            <p>
              We pick the option that matches your data-residency rules. We do
              not ask you to change them to fit a tool.
            </p>
          </div>
          <div className="schem">
            <p className="rcp-title">Residency, in your control</p>
            <ul className="rcp-list">
              {facts.map((f) => (
                <li key={f} className="rcp-item">
                  <svg className="rcp-tick" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  <span className="rcp-line">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
