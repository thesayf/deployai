/**
 * 4 · A8 Anthropic-commitment citation card on navy (the one dominant accent
 * band). M23 serif-citation treatment, photo omitted. The signature trust
 * moment, centered heading (T3). Ported from mock-data-residency.html §4.
 */
export function Commitments() {
  return (
    <section className="commit bg-navy" id="commitments">
      <div className="wrap">
        <h2>
          What the model does with your <em>data</em>.
        </h2>
        <div className="cite">
          <p>
            By default, your inputs and outputs are never used to train the
            model. API data is deleted from Anthropic&rsquo;s systems within
            thirty days, and zero-retention is available for workloads where
            even that is too long.
          </p>
        </div>
        <p className="close">
          Every line here is Anthropic&rsquo;s written policy, verifiable on its
          own privacy pages at privacy.claude.com, something your compliance
          team can read for themselves. And when the model runs inside your own
          cloud, retention is governed by your policies, not ours.
        </p>
      </div>
    </section>
  );
}
