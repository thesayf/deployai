import { SiteLink } from "../SiteLink";

/** 8 · M15 segment qualifier (royal ground). Who this is (and isn't) for. */
export function Segment() {
  return (
    <section className="bg-royal seg">
      <div className="wrap">
        <h2>
          Running 50 or more seats, or working under sector <em>rules</em>?
        </h2>
        <p>
          We scope, build, and deliver AI systems for mid-market companies, and we choose
          the right models for the job, whether that is Claude, another model, or a mix.
        </p>
        <p>
          If you need a global AI operating model across dozens of business units, use a
          large firm. If you run 50 or more seats and need AI working this quarter, that
          is us. Either way, we will tell you honestly whether we are the right size for
          it.
        </p>
        <SiteLink className="pill p-white" href="#final">
          Book a 30-minute call
        </SiteLink>
      </div>
    </section>
  );
}
