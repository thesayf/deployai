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

export default function CentricCase() {
  return (
    <>
      <Seo
        title="Centric Community Research: tenders out in days"
        description="How we built an AI research platform for Centric Community Research: 50+ projects searchable, proposal drafts in minutes, tenders out in days."
        path="/work/centric-community-research"
        ogImage="/site/og-case-centric.jpg"
      />
      <BreadcrumbJsonLd name="Centric Community Research" path="/work/centric-community-research" />
      <div className="site">
        <Navbar />
        <main id="main">
          <CaseHero
            client="Centric Community Research"
            title={
              <>
                Tenders out in days, community in the{" "}
                <em className="accent">room</em>.
              </>
            }
            photo="/site/hero-centric.jpg"
            photoPos="50% 12%"
            logo="/logos/centric-white.png"
            metric={{ value: "15 min", label: "to a proposal draft" }}
          />

          <CaseGlance
            vision="Centric Community Research wanted the three to four weeks of manual proposal assembly cut to days, insight from fifty-plus past projects within reach of every field team, and authentic community voice kept in every bid."
            impact="In five weeks we shipped an AI-powered research platform: a searchable knowledge base, automated proposal generation, and a collaborative review workspace. A draft now takes about fifteen minutes, tenders go out in days, and every proposal ships with community input."
            services={[
              "AI knowledge base",
              "Proposal generation",
              "Collaborative review",
            ]}
            industry="Research · Community-led organisation"
            tech={[
              "React",
              "Node.js",
              "OpenAI GPT-4",
              "PostgreSQL",
              "WebSockets",
            ]}
          />

          <CaseInterlude
            tone="lime"
            heading="Are the answers available when your teams need them?"
            label="Let's talk"
            href="/book"
          />

          <CaseStory
            image={{
              src: "/site/case-centric.jpg",
              caption:
                "Centric at the UK and Ireland Implementation Science Research Conference.",
            }}
            chapters={[
              {
                head: (
                  <>
                    Every tender started with a{" "}
                    <em className="accent">scramble</em>.
                  </>
                ),
                body: [
                  "Dr Shaun Danquah runs Centric Community Research, and when he got in touch the subject was tenders. Every submission meant three to four weeks of manual assembly that, in his words, gave him panic attacks. The organisation had the track record to go after serious funding. Getting a credible proposal out of the building inside a deadline was the problem.",
                  "Centric is a community-led research organisation: its research is designed and carried out with the communities being studied, not just about them, and it delivers that work alongside institutional partners, a university health-research institute among them. Its own shorthand for the mission is Moments to Movements. That model is the point of the organisation. It is also what a rushed proposal puts at risk.",
                  "The pressure showed in three places. Insight from more than fifty past community engagement projects was hard to reach when a bid needed it. Field teams called Shaun for past research, every five minutes by his own count. And the community input that makes Centric's work credible was the hardest thing to protect on a deadline. All three had the same cause: the organisation knew far more than it could use.",
                ],
              },
              {
                head: (
                  <>
                    So we followed one bid, start to{" "}
                    <em className="accent">finish</em>.
                  </>
                ),
                body: [
                  "Before recommending anything, we followed a proposal being put together. The pattern repeated at every stage: the funder's call lands, the hunt begins through folders and inboxes for past reports, a budget is rebuilt from an old spreadsheet, an engagement plan is rewritten from memory of a bid that already contained it, and reviews are chased as the deadline closes. We logged where the days went, and how often someone stopped writing to go searching.",
                  "Field teams knew the material existed, often they had produced it themselves, but finding it meant asking around, and asking around ended at the CEO's desk. Community reviewers came into the process last, when the deadline was tightest and their comments were hardest to act on. The voice the bid depended on was the part the rush squeezed hardest.",
                  "By the end, the three to four weeks had an anatomy. Most of the time went on retrieval and reassembly: finding what Centric already knew, and rebuilding documents that existed in earlier bids. The work that actually persuades a funder, fitting the proposal to this community and this call, got whatever time was left. Any fix had to reverse that ratio.",
                ],
              },
              {
                head: (
                  <>
                    Nothing off the shelf knew their{" "}
                    <em className="accent">work</em>.
                  </>
                ),
                body: [
                  "What to build came out of that anatomy. Off-the-shelf bid-writing tools were the quick option and fell first: they draft from generic templates, they carry nothing of Centric's projects or its communities, and a proposal that reads like anyone's cuts against the one thing that makes Centric worth funding. Plain document search fell next: files would surface faster, and the team would still assemble every proposal by hand, exactly as before.",
                  "Training a model from scratch was the long way round, months of preparation before the first useful draft, for a team that needed relief now. What fitted was a language model working over Centric's own material, because the finding held: the value was in the fifty-plus projects Centric had already run. It sat in reports and old bids where nobody could find it and nothing could reuse it.",
                  "So that is what we built. A platform with the archive at its centre: a knowledge base that makes those projects searchable, a generator that drafts proposals from templates proven in past bids, and a collaborative workspace that keeps community reviewers inside the process rather than at the end of it. The build, start to live, took five weeks.",
                ],
              },
              {
                head: (
                  <>
                    From first search to submission, in{" "}
                    <em className="accent">days</em>.
                  </>
                ),
                body: [
                  "A bid now starts in the Partnership Dashboard, the searchable knowledge base built from Centric's past work. Type what you need, youth engagement in Birmingham, say, and the relevant projects come back as cards: who led them, their status, how strong the partner relationship is, and an ethics flag showing community-led, needs review, or high risk. Field teams answer their own questions now.",
                  "The Proposal Generator turns that past work into a draft. Four steps: choose a template, each listed with its funding range and a match score for this bid, import data from a past project, add the project details, name the collaborators. The model drafts the rest: executive summary, an engagement plan adapted from projects that already worked, budget breakdown, impact metrics, evaluation framework, risk assessment. From first step to full draft is about fifteen minutes.",
                  "The draft then opens in Collaborative Review, where the days now go, and where they belong. Community and institutional partners work in the same live document: highlights and comment threads on the text itself, the budget grid alongside, an ethics checklist covering consent and data, cleared before submission. A tender that took three to four weeks goes out in days, and the community has been in it from the first draft.",
                ],
              },
              {
                head: (
                  <>
                    The last word stays with the{" "}
                    <em className="accent">community</em>.
                  </>
                ),
                body: [
                  "A system that writes first drafts earns trust by being read, so for the first submissions the platform worked on probation. Every generated draft was checked against what the team would have produced themselves. What the draft got right meant one less stage done by hand next time. What it got wrong went back into the templates and the knowledge base.",
                  "What stayed after probation is the discipline any generative system needs in production. A reference set of past proposals that every template change is scored against before it ships. A log of every generation, with the project data and template that produced it, so when a paragraph reads oddly the team can see exactly what fed it. Quality stays a measurement, not an impression.",
                  "The strongest check is the one a bid cannot go around: no proposal leaves the platform without passing Collaborative Review, community and institutional reviewers together, with the ethics checklist cleared. That gate is what kept the speed honest: every proposal has gone out with community input built in, which is what the hundred per cent means. Edge cases, a funder's unusual format, a budget outside a template's range, were caught at that gate and folded into the templates, so the next bid inherited the fix.",
                ],
              },
            ]}
          />

          <CaseProduct
            heading={
              <>
                How a tender gets out of the{" "}
                <em className="accent">building</em>.
              </>
            }
            intro="A tender starts in the knowledge base, takes shape in the generator, and leaves through review."
            surfaces={[
              {
                label: "Knowledge base",
                desc: "Centric's past work, searchable at last: more than fifty projects and the partners behind them. Search by theme or place, get back project cards with lead and status, relationship strength, and an ethics flag before a bid leans on the work.",
                bullets: [
                  "Projects that lived in folders and inboxes, one search away",
                  "Each project card carries its lead, status, and relationship strength",
                  "Ethics flags up front: community-led, needs review, or high risk",
                  "Field teams find research themselves, without calling the CEO",
                ],
                railName: "Partnership Dashboard",
                railDesc:
                  "The dashboard mid-search: a query in the bar, project cards back with leads, status and relationship strength, ethics flags marked, and the archive's stats along the top.",
                device: "laptop",
                node: (
                  <Shot
                    src="/site/centric-dashboard.jpg"
                    alt="Partnership Dashboard screen"
                  />
                ),
              },
              {
                label: "Proposals",
                desc: "Four steps stand between a funding call and a working draft: pick a template with its funding range and match score, import a past project, add the details, name the collaborators. The model writes the rest in about fifteen minutes.",
                bullets: [
                  "Templates carry funding ranges and an AI match score per bid",
                  "The engagement plan comes from a bid that worked, adapted to this one",
                  "Summary, budget, impact metrics, evaluation framework and risks, drafted together",
                  "£150K+ of proposals generated, with budgets allocated automatically",
                ],
                railName: "Proposal Generator",
                railDesc:
                  "The generator's first step: templates listed with funding ranges and match scores, a past project selected for import, details and collaborators the two steps beyond.",
                device: "laptop",
                node: (
                  <Shot
                    src="/site/centric-generator.jpg"
                    alt="Proposal Generator screen"
                  />
                ),
              },
              {
                label: "Review",
                desc: "The live workspace where a draft becomes a submission. Community and institutional partners read the same document at the same time, comment in threads pinned to the text, settle the budget grid, and clear the ethics checklist before anything ships.",
                bullets: [
                  "Community and institutional reviewers in the same draft, live",
                  "Comment threads and highlights sit inline on the draft",
                  "An ethics checklist gates submission until consent and data are cleared",
                  "Community input on every proposal that goes out: 100% voice integration",
                ],
                railName: "Collaborative Review",
                railDesc:
                  "The review room in session: a highlighted draft with open comment threads, reviewers present and typing, budget allocation grid and ethics checklist down the side.",
                device: "laptop",
                node: (
                  <Shot
                    src="/site/centric-review.jpg"
                    alt="Collaborative Review screen"
                  />
                ),
              },
            ]}
          />

          <CaseResults
            heading={
              <>
                The change, <em className="accent">measured</em>.
              </>
            }
            stats={[
              {
                n: "15 min",
                label: "to a proposal draft, the full tender out in days",
              },
              { n: "50+", label: "past projects, instantly searchable" },
              { n: "5 weeks", label: "from start to a live platform" },
            ]}
          />

          <CaseQuote
            quote="Tender deadlines used to give me panic attacks. We'd scramble for weeks pulling together proposals. Now we knock them out in days, and our field teams can actually find the research they need without calling me every five minutes."
            name="Dr Shaun Danquah"
            role="Founder, Centric Community Research"
          />

          <CaseCTA
            heading={
              <>
                Put everything you <em className="accent">know</em> to work.
              </>
            }
          />

          <CaseNext
            next="JB Luxe Detailing"
            nextHref="/work/jb-luxe-detailing"
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
