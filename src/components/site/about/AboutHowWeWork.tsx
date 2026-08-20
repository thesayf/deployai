import { SiteLink } from "@/components/site/SiteLink";

/** 7 · M22 narrow pointer / breather (field): how we work — one-line pointer. */
export function AboutHowWeWork() {
  return (
    <section className="bg-field regime" id="how">
      <div className="wrap">
        <h2>
          How we <em className="accent">work</em>.
        </h2>
        <p className="lead">
          Everything runs on a four-step path you control, priced and scoped as
          a fixed fee before we start. The full method, step by step, lives on
          the Services page.
        </p>
        <div className="ctas">
          <SiteLink className="arrow" href="/deployment-diagnostic">
            See how the Diagnostic works
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
