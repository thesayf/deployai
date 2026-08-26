import { Seo } from "@/components/site/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SiteLink } from "@/components/site/SiteLink";

/** Privacy policy — plain-language, accurate to what the site actually runs
 *  (GTM/Meta Pixel/Google Ads tags, Calendly booking, hosted Fit Check, Vercel). */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy | Deploy AI Studio"
        description="What Deploy AI Studio collects when you use this site, why, who it is shared with, and the choices you have."
        path="/privacy"
      />
      <div className="site">
        <Navbar />
        <main id="main">
          <section className="nf legal-hero bg-navy">
            <div className="wrap">
              <h1>
                Privacy, in plain <em>English</em>.
              </h1>
              <p className="sub">
                What we collect when you use this site, why, who it is shared
                with, and the choices you have. Last updated 26 August 2026.
              </p>
            </div>
          </section>

          <section className="bg-white">
            <div className="wrap legal">
              <h2>Who we are</h2>
              <p>
                Deploy AI Studio is the trading name of Hinds Tech and
                Artificial Intelligence LLC. This policy covers
                www.deployai.studio and the tools linked from it. If you have
                any question about it, or want us to do something with your
                data, email{" "}
                <a href="mailto:hello@deployai.studio">hello@deployai.studio</a>
                .
              </p>

              <h2>What we collect, and why</h2>
              <p>
                <strong>Booking a call.</strong> The booking calendar on this
                site is provided by Calendly. When you book, we receive the
                name, email address, and anything else you choose to enter. We
                use it to hold the call and follow up, nothing else.
              </p>
              <p>
                <strong>The AI Fit Check.</strong> The Fit Check runs on a
                hosted assessment platform. Your answers and the email address
                you add at the end are used to score the assessment and send you
                your verdict and write-up. That is the only thing the email is
                used for.
              </p>
              <p>
                <strong>Analytics and advertising.</strong> The site loads
                Google Tag Manager, a Google Ads tag, and the Meta Pixel. These
                set cookies and collect device identifiers and the pages you
                visit, so we can understand how the site is used and measure
                whether our marketing works. None of it identifies you by name.
              </p>
              <p>
                <strong>Hosting.</strong> The site runs on Vercel, which keeps
                standard server logs (IP address, request time, pages served)
                for security and reliability.
              </p>

              <h2>Who it is shared with</h2>
              <p>
                We share data only with the providers that run the services
                above: Vercel (hosting), Calendly (booking), Google and Meta
                (analytics and advertising), the assessment platform behind the
                Fit Check, and our email provider. Each processes it to provide
                their service to us. We do not sell personal data, and we do not
                share it with anyone else unless the law requires it.
              </p>

              <h2>Cookies and your choices</h2>
              <p>
                The analytics and advertising tags above are the only things
                that set non-essential cookies here. You can block or clear
                cookies in your browser settings, browse with an ad or tracker
                blocker, and control ad personalisation directly at{" "}
                <a
                  href="https://adssettings.google.com"
                  rel="noopener"
                  target="_blank"
                >
                  adssettings.google.com
                </a>{" "}
                and in your Meta ad preferences. The site works fine without
                these cookies.
              </p>

              <h2>How long we keep it</h2>
              <p>
                Booking and Fit Check details are kept for as long as we are
                talking to you, and deleted when there is no longer a reason to
                hold them. Analytics data is retained on the providers&rsquo;
                standard schedules.
              </p>

              <h2>Your rights</h2>
              <p>
                Depending on where you live, you can ask us for a copy of the
                personal data we hold about you, ask us to correct it or delete
                it, and object to how it is used. Email{" "}
                <a href="mailto:hello@deployai.studio">hello@deployai.studio</a>{" "}
                and we will sort it out. Our providers may process data outside
                your country; where they do, they rely on recognised safeguards
                for international transfers.
              </p>

              <h2>Changes</h2>
              <p>
                If this policy changes, the new version appears here with a new
                date at the top.
              </p>

              <p className="legal-back">
                <SiteLink className="arrow" href="/">
                  Back to the home page
                </SiteLink>
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
