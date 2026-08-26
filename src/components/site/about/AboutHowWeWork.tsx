import { SiteLink } from "@/components/site/SiteLink";

/** 7 · M22 narrow pointer / breather (field): how we work — one-line pointer. */
export function AboutHowWeWork() {
  return (
    <section className="regime bg-field" id="how">
      <div className="wrap">
        <h2>
          How we <em className="accent">work</em>.
        </h2>
        <p className="lead">
          Everything runs on a path you control, priced and scoped as a fixed
          fee before we start. We build only what makes sense for your business,
          and we tell you the truth about what will work. The full picture lives
          on the services page.
        </p>
        <div className="ctas">
          <SiteLink className="arrow" href="/services">
            See the services
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
