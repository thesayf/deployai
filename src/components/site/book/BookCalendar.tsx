import { CalendlyInline } from "@/components/site/CalendlyInline";

/** 3 · A6 inline booking — the calendar embeds on the page, no bare form. */
export function BookCalendar() {
  return (
    <section className="bg-royal book" id="book-calendar">
      <div className="wrap">
        <h2>
          Book a <em className="accent">meeting</em>.
        </h2>
        <div className="cal-ph">
          <CalendlyInline url="https://calendly.com/hello-deployai/introduction-to-consult-kit-clone?hide_event_type_details=1" />
        </div>
        <p className="lead">
          Your meeting confirmation link is sent to your inbox instantly.
        </p>
      </div>
    </section>
  );
}
