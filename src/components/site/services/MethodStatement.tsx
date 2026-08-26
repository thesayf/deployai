import { SiteLink } from "../SiteLink";

/** 7 · M22 method statement (navy, dark pivot, centered). Teases the Diagnostic, no diagram. */
export function MethodStatement() {
  return (
    <section className="bg-navy">
      <div className="wrap mstate">
        <h2>
          The constraint is <em>execution</em>.
        </h2>
        <p className="body">
          Organisations understand the potential. Production is where plans meet
          infrastructure, governance, and real processes. We build for
          production from day one: every system ships with evaluations,
          monitoring, and cost controls. And the job continues after go-live: we
          watch adoption, measure quality, control spend, and expand what works.
        </p>
        <SiteLink className="pill p-white" href="/deployment-diagnostic">
          See how the Diagnostic works
        </SiteLink>
      </div>
    </section>
  );
}
