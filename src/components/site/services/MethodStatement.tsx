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
          Organizations understand the potential of AI. AI systems must integrate with
          existing infrastructure, operate within governance frameworks, and handle
          complex processes at scale. We move beyond discovery and pilots to systems that
          operate in production. Our job doesn&rsquo;t end with deployment: we monitor
          adoption, optimize performance, and expand successful use cases.
        </p>
        <SiteLink className="pill p-white" href="/deployment-diagnostic">
          See how the Diagnostic works
        </SiteLink>
      </div>
    </section>
  );
}
