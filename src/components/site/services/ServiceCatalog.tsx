import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "../SiteLink";

/** 4 · P05 tabbed service catalogue (white ground, M07). Seven engagements, one bar.
 *  Same locked P05 anatomy as home OffersTabs; rails carry a proof-stat card
 *  (or capability card) instead of an image, per the aitx solutions precedent. */
type Service = {
  id: string;
  tab: string;
  name: string;
  line: string;
  desc: string;
  bullets: string[];
  after: string;
  ctaLabel: string;
  rail: string[];
  proof?: { stat: string; source?: string };
};

const services: Service[] = [
  {
    id: "s1",
    tab: "Proof of Value",
    name: "Proof of Value",
    line: "Thirty days to prove one AI use case pays.",
    desc: "For any organisation asking whether AI can actually do this for them. Most pilots never prove their worth: MIT found only around 5% reach rapid revenue impact. We build a working Claude solution, instrument it against a KPI you choose, and end with a go, pivot, or stop decision. Not a demo. Not a science project.",
    bullets: [
      "Discovery: pick the use case, the sponsor, and the KPI",
      "Sprint one: stand up the solution, wire in your data",
      "Sprint two: iterate on real data, run evaluations, measure",
      "Readout: measured results, a clear decision, a costed route to production",
    ],
    after: "Then: production build and ongoing operation",
    ctaLabel: "Let's talk Proof of Value",
    rail: [
      "A working, instrumented Claude solution",
      "Measured performance against your KPI",
      "A decision with the evidence behind it",
      "The code and the evaluation harness",
      "A costed route to production",
    ],
    proof: { stat: "20+ minute waits to near-instant, costs down 30%+", source: "StubHub" },
  },
  {
    id: "s2",
    tab: "Claude Code",
    name: "Claude Code Enablement",
    line: "Turn Claude Code licences into measured engineering delivery.",
    desc: "For engineering organisations where adoption is patchy, security is blocking rollout, or nobody can measure the gain. Faros found AI-adopting developers complete 21% more tasks and merge 98% more pull requests. That return arrives when deployment is secure, conventions are shared, and adoption is tracked.",
    bullets: [
      "Technical setup: SSO, provisioning, allowlists, telemetry",
      "Phased launch: pilot group first, champions in each department",
      "Training: team sessions, project conventions, custom commands, CI integration",
      "Scaling: expansion across teams with office hours and support",
    ],
    after: "Then: ongoing enablement and measurement at scale",
    ctaLabel: "Let's talk Claude Code",
    rail: [
      "A secure, configured deployment",
      "Developers trained to shared conventions",
      "Custom commands and skills for your stack",
      "An adoption dashboard that proves the return",
    ],
    proof: { stat: "Up to 40% productivity increase", source: "HubSpot" },
  },
  {
    id: "s3",
    tab: "Modernization",
    name: "Code Modernization",
    line: "Migrate the legacy system nobody fully understands.",
    desc: "For organisations stuck on ageing systems, losing the people who maintain them, or paying maintenance that blocks every move. Understanding old code used to cost more than rewriting it. That equation has flipped: AI reads the whole codebase, extracts the business logic, and documents what static analysis misses.",
    bullets: [
      "Assess: extract the logic, map dependencies, prove one subsystem",
      "Migrate: structure-preserving translation with generated test suites",
      "Validate: run old and new in parallel, compare outputs",
      "Scale: reuse proven conversion patterns across the estate",
    ],
    after: "Then: the wider programme and ongoing support",
    ctaLabel: "Let's talk Modernization",
    rail: [
      "Business logic recovered and documented",
      "A tested migration to a modern stack",
      "Parallel-run proof the new matches the old",
      "A phased cutover plan",
    ],
    proof: {
      stat: "10,000 lines of Scala to Java in 4 days, against 10 estimated engineer-weeks",
      source: "Stripe",
    },
  },
  {
    id: "s4",
    tab: "Readiness",
    name: "AI Readiness Assessment",
    line: "Know exactly where you stand, and what to do first.",
    desc: "For organisations that want AI but do not know where to begin, or whose board is asking for a strategy. McKinsey found 60% of C-suite executives receive AI advice too vague to use. This assessment scores you across six dimensions and replaces the vague score with a ranked plan.",
    bullets: [
      "Scope: objectives, documentation, interview plan",
      "Discovery: stakeholder interviews, infrastructure and data review",
      "Scoring: each dimension benchmarked, gaps ranked by impact",
      "Readout: executive summary and a 90-day action plan",
    ],
    after: "Then: your first Proof of Value",
    ctaLabel: "Let's talk Readiness",
    rail: [
      "A readiness scorecard across six dimensions",
      "A gap analysis your board can read",
      "Peer benchmarking",
      "A prioritised 90-day roadmap",
    ],
  },
  {
    id: "s5",
    tab: "Adoption",
    name: "AI Enablement & Change Management",
    line: "Turn deployed AI tools into daily habits.",
    desc: "For organisations that rolled out AI and saw little uptake, or whose people are nervous. The barrier is rarely the technology. Prosci found 43% of AI-adoption failures stem from weak executive sponsorship, and active sponsorship lifts the odds of success by 72%. We build the people side.",
    bullets: [
      "Sponsors: secure active, visible executive backing",
      "Segment: map impacted groups, skill gaps, resistance points",
      "Enable: role-based training on real tasks, champions in each team",
      "Reinforce: office hours, adoption measurement, continuous refresh",
    ],
    after: "Then: a standing reinforcement programme",
    ctaLabel: "Let's talk Adoption",
    rail: [
      "An adoption plan for your rollout",
      "Role-based training tied to real work",
      "A champion network",
      "Launch communications",
      "An adoption dashboard",
    ],
  },
  {
    id: "s6",
    tab: "Shadow AI",
    name: "Shadow AI Assessment",
    line: "Find the AI your staff already use, and make it safe.",
    desc: "For organisations that know staff are using AI but cannot see what, or that have no AI policy. LayerX found 82% of sensitive pastes into AI tools come from unmanaged personal accounts. We build the inventory, score the risk, and stand up a sanctioned alternative.",
    bullets: [
      "Discovery: network, software, and expense signals build the inventory",
      "Amnesty survey: a no-punishment self-report catches the rest",
      "Risk scoring: every tool mapped to business unit and data class",
      "Governance: acceptable-use policy, incident playbook, safe default",
    ],
    after: "Then: sanctioned rollout and ongoing monitoring",
    ctaLabel: "Let's talk Shadow AI",
    rail: [
      "A ranked inventory of every AI tool in use",
      "A risk register",
      "An acceptable-use policy",
      "An incident-response playbook",
      "A recommended safe alternative",
    ],
  },
  {
    id: "s7",
    tab: "Managed AI",
    name: "Managed AI Services",
    line: "We keep your production AI working, safe, and improving.",
    desc: "For organisations running AI in production with nobody to operate it: token costs climbing, quality drifting silently, no team watching. We operate your systems under an agreed service level, with monitoring, evaluation, guardrails, and incident response, so you never have to staff an AI operations team.",
    bullets: [
      "Onboard: map models, agents, and pipelines, stand up service levels",
      "Instrument: tracing, evaluation suites, cost attribution, guardrails",
      "Operate: real-time alerts, incident management, human review where regulated",
      "Improve: continuous evaluation, model routing, monthly reviews",
    ],
    after: "The operate step behind every build",
    ctaLabel: "Let's talk Managed AI",
    rail: [
      "A monitored system under an agreed service level",
      "Cost control and safety guardrails",
      "Incident response",
      "Monthly service reviews",
    ],
    proof: { stat: "Works even for systems you did not build" },
  },
];

export function ServiceCatalog() {
  const [active, setActive] = useState("s1");

  return (
    <section id="services">
      <div className="wrap">
        <h2>
          What we <em>do</em>.
        </h2>
        <div className="tabbar" role="tablist">
          {services.map((s) => (
            <button
              key={s.id}
              className={cn("tabbtn", active === s.id && "on")}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
            >
              {s.tab}
            </button>
          ))}
        </div>
        {services.map((s) => (
          <div
            key={s.id}
            className={cn("tabpanel", active === s.id && "on")}
            id={s.id}
            role="tabpanel"
          >
            <div>
              <div className="tp-name">{s.name}</div>
              <div className="tp-line">{s.line}</div>
              <p className="tp-desc">{s.desc}</p>
              <div className="tp-help">How it&rsquo;s delivered:</div>
              <ul className="tp-bullets">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tp-dur">{s.after}</div>
              <div className="tp-cta">
                <SiteLink className="pill p-blue" href="#final">
                  {s.ctaLabel}
                  {"  →"}
                </SiteLink>
              </div>
            </div>
            <div className="rail">
              <div className="eyebrow">What you get</div>
              <ul>
                {s.rail.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              {s.proof && (
                <div className="rail-proof">
                  <div className="rp-stat">{s.proof.stat}</div>
                  {s.proof.source && <div className="rp-src">{s.proof.source}</div>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
