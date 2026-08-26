import { Seo } from "@/components/site/Seo";
import { BreadcrumbJsonLd } from "@/components/site/BreadcrumbJsonLd";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CaseNext } from "@/components/site/case/CaseNext";
import { CaseHero } from "@/components/site/case/CaseHero";
import { CaseGlance } from "@/components/site/case/CaseGlance";
import { CaseInterlude } from "@/components/site/case/CaseInterlude";
import { CaseStory } from "@/components/site/case/CaseStory";
import { CaseProduct } from "@/components/site/case/CaseProduct";
import { CaseResults } from "@/components/site/case/CaseResults";
import { CaseQuote } from "@/components/site/case/CaseQuote";
import { CaseCTA } from "@/components/site/case/CaseCTA";

/* Real product screenshots (16:10 crops) fill the locked P05 rail's 900×562
   viewport. */
function Shot({ src, alt }: { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="h-full w-full object-cover" src={src} alt={alt} />;
}

export default function ShowcaseCase() {
  return (
    <>
      <Seo
        title="Showcase Cinemas: AI scheduling across the chain"
        description="How we built a Claude-powered scheduling platform for Showcase Cinemas: scheduling time down 95%, revenue per screen up 18%, live in four weeks."
        path="/work/showcase-cinemas"
        ogImage="/site/og-case-showcase.jpg"
      />
      <BreadcrumbJsonLd name="Showcase Cinemas" path="/work/showcase-cinemas" />
      <div className="site">
        <Navbar />
        <main id="main">
          {/* TEMP hero photo: foyer shot standing in until the licensed
            auditorium image is sourced. */}
          <CaseHero
            client="Showcase Cinemas"
            title={
              <>
                Forty hours of scheduling, down to{" "}
                <em className="accent">two</em>.
              </>
            }
            photo="/site/case-showcase.jpg"
            logo="/logos/showcase-white.png"
            metric={{ value: "18%", label: "more revenue per screen" }}
          />

          <CaseGlance
            vision="Showcase Cinemas wanted schedules that kept pace with actual performance: rebuilt from real results, across the chain, without a team losing more than forty hours a week to the job."
            impact="In four weeks we shipped an AI scheduling platform powered by Claude. Scheduling time fell 95%, from more than forty hours a week to under two, and average revenue per screen rose 18%."
            services={[
              "AI scheduling platform",
              "Revenue optimisation",
              "Multi-site rollout",
            ]}
            industry="Cinema · UK multiplex chain"
            tech={[
              "React",
              "Node.js",
              "Anthropic Claude API",
              "PostgreSQL",
              "AWS",
            ]}
          />

          <CaseInterlude
            tone="lavender"
            heading="How many of this week's decisions are running on last week's numbers?"
            label="Let's talk"
            href="/book"
          />

          <CaseStory
            chapters={[
              {
                head: (
                  <>
                    It started with a call about{" "}
                    <em className="accent">Mondays</em>.
                  </>
                ),
                body: [
                  "The first conversation was with Remy Keenan, who looks after operations at Showcase Cinemas. The ask was not about AI. It was about Mondays: every site's showtime schedule had to be rebuilt at the start of the week, the team was losing more than forty hours a week to it, and when a weekend went sideways the rework could not be done fast enough to matter.",
                  "Showcase runs multiplexes across the UK, with its Cinema de Lux venues at the premium end. Each site needs a plan for the week: which film, on which screen, at what time, from first matinee to last showing. That plan was built by hand, in spreadsheets, and a strong Saturday could leave it out of date before Monday's coffee.",
                  "That is an expensive way to plan a week. The hours went in, one weekend's results could prove them wrong, and the reschedule that mattered most was the one the process could not deliver.",
                ],
              },
              {
                head: (
                  <>
                    We started with an audit, not a{" "}
                    <em className="accent">demo</em>.
                  </>
                ),
                body: [
                  "The first job was to map the week as it actually ran. We shadowed the scheduling team through a full cycle: the weekend numbers landing, the spreadsheet build, the emails between sites, the point on Monday where the plan met reality. We timed where the hours went and logged every handoff and every workaround.",
                  "The conversations mattered as much as the shadowing. Schedulers and site teams carry rules that are written nowhere: how far apart show starts should sit, what a changeover really takes, which releases earn the IMAX and Dolby screens, what changes over the holidays. We wrote them all down.",
                  "By the end we had a bottleneck map of the week: which steps created the value, which existed only because spreadsheets cannot reschedule a chain, and exactly where forty hours went.",
                ],
              },
              {
                head: (
                  <>
                    We chose the engine by what it had to{" "}
                    <em className="accent">keep</em>.
                  </>
                ),
                body: [
                  "With the map, we scoped the options. Off-the-shelf scheduling modules were quickest and were ruled out first: the chain's edge is its own rules, and a template system would have flattened them. A classical rules engine could hold the rules but not the judgment: the messy spreadsheets, the one-off instructions, the reading of a strange weekend. A forecasting model built from scratch would have needed months of data work before it earned anything.",
                  "We recommended a Claude-based platform instead: the team's rules written down where they can be read and changed, and Claude applying them across the real-world inputs the team already produces, at the speed the chain needed. It fitted the job because the knowledge already existed. It just lived in people's heads and needed to run at scale.",
                  "Four weeks after that recommendation, the platform was live.",
                ],
              },
              {
                head: (
                  <>
                    What runs <em className="accent">now</em>.
                  </>
                ),
                body: [
                  "Monday starts with a run of the generator. Pick a site, load the weekend's sales, ticket sales and occupancy, add the new releases and anything unusual about the week ahead, and an optimised schedule comes back in seconds. The rules it applies are the team's own, held in Best Practices, where anyone can read and change them. Each site's settings take precedence over the chain's.",
                  "When a weekend surprises, that is no longer a crisis. Schedules regenerate from the real numbers, site by site, in time for the morning meeting.",
                ],
              },
              {
                head: (
                  <>
                    Then we watched it <em className="accent">work</em>.
                  </>
                ),
                body: [
                  "No system is right on day one, so we did not ask the team to trust this one. For the first weeks the platform ran in shadow: it generated its schedule alongside the one built by hand, and every difference had to be explained. Where the platform was right, the manual step retired. Where it was wrong, the miss was written into Best Practices and stayed fixed.",
                  "Behind that sits the discipline Anthropic recommends for systems like this: an evaluation set built from past weekends with known outcomes, every change to the rules scored against it before it ships, and every generation logged with the data and instructions that produced it, so an odd schedule can be traced rather than argued about.",
                  "The edge cases came as expected: holiday weeks, one-off event screenings, premium-format clashes. Each one was caught in review, became a rule, and stayed solved. The 95% and the 18% are measured after that process, not before it.",
                ],
              },
            ]}
          />

          <CaseProduct
            heading={
              <>
                The platform that plans the <em className="accent">week</em>.
              </>
            }
            intro="Three surfaces run the week: one generates the schedule, one holds the house rules, one tracks the estate."
            surfaces={[
              {
                label: "Generator",
                desc: "Pick a site and load the weekend just gone: sales, ticket sales, occupancy, plus the week's new releases. Anything unusual goes in as a typed instruction. Claude applies the rules in Best Practices and returns a revenue-optimised schedule in seconds.",
                bullets: [
                  "A revenue-optimised schedule for a whole site in seconds, not days",
                  "Last weekend's sales, tickets and occupancy shape this week's plan",
                  "One-off requirements go in as typed instructions, not workarounds",
                  "When results change, the schedule can be regenerated the same morning",
                ],
                railName: "Schedule Generator",
                railDesc:
                  "The generator mid-run: a site selected, the weekend's performance and new releases loaded, an instruction typed beneath, and the optimised schedule seconds away.",
                device: "laptop",
                node: (
                  <Shot
                    src="/site/showcase-generator.jpg"
                    alt="Schedule Generator screen"
                  />
                ),
              },
              {
                label: "Best Practices",
                desc: "The rules a good scheduler carries in their head, written down and editable: thirty minutes between show starts, twenty to thirty for changeovers, matinee and holiday strategy, which releases get the IMAX and Dolby screens. Site-specific settings take precedence over the chain's defaults.",
                bullets: [
                  "The chain's scheduling knowledge lives in one editable place, not in heads",
                  "Change a rule once and every schedule after it follows",
                  "Site-specific settings take precedence over chain-wide defaults",
                  "Spacing, changeovers, matinees, holidays and premium formats, all set out as rules",
                ],
                railName: "Best Practices",
                railDesc:
                  "The rulebook: each practice listed with its guidance, spacing at thirty minutes, changeovers at twenty to thirty, premium formats and holidays covered, every line editable.",
                device: "laptop",
                node: (
                  <Shot
                    src="/site/showcase-practices.jpg"
                    alt="Best Practices screen"
                  />
                ),
              },
              {
                label: "Sites",
                desc: "Every cinema in the chain on one list: name, location, screen count, status, and when its schedule was last updated. The estate view the Monday run works through, and the place a new venue joins the platform.",
                bullets: [
                  "Every venue on one screen: location, screens, status, last updated",
                  "The Monday run works through the chain from one place",
                  "Cinema de Lux and standard sites run through the same platform",
                  "A glance shows which schedules are current and which need a run",
                ],
                railName: "Sites",
                railDesc:
                  "The estate list: each cinema with its location, screen count and status, plus the date its schedule last changed, the whole chain checked in one look.",
                device: "laptop",
                node: (
                  <Shot src="/site/showcase-sites.jpg" alt="Sites screen" />
                ),
              },
            ]}
          />

          <CaseResults
            heading={
              <>
                What four weeks <em className="accent">bought</em>.
              </>
            }
            stats={[
              {
                n: "95%",
                label: "less scheduling time, 40+ hours down to under 2",
              },
              { n: "18%", label: "more revenue per screen, on average" },
              { n: "4 weeks", label: "from start to live across the chain" },
            ]}
          />

          <CaseQuote
            quote="Scheduling used to eat our Mondays: a full day, every site, and one busy weekend could throw the whole thing out. Now there's an optimised schedule waiting before the morning meeting, and it makes calls we'd never have found by hand. My team runs cinemas now, not spreadsheets."
            name="Remy Keenan"
            role="Operations, Showcase Cinemas"
          />

          <CaseCTA
            heading={
              <>
                Bring us the <em className="accent">job</em> that takes all
                week.
              </>
            }
          />

          <CaseNext
            next="Centric Community Research"
            nextHref="/work/centric-community-research"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
