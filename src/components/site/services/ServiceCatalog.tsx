import { useState } from "react";
import { cn } from "@/lib/utils";
import { SiteLink } from "../SiteLink";

/** 4 · P05 tabbed service catalogue (white ground, M07). Seven engagements, one bar.
 *  Rubric anatomy (FEATURE-SEGMENT-ANATOMY.md): buyer outcomes hold the main
 *  column under one fixed benefit stem; delivery process lives in the rail.
 *  Names are the industry-standard service names, ratified 2026-08-26. */
type Service = {
  id: string;
  /** Tab label — canonical name, short form only where the bar demands it. */
  tab: string;
  name: string;
  line: string;
  desc?: string;
  /** Four verb-first buyer outcomes under the fixed stem. */
  bullets: string[];
  after: string;
  ctaLabel: string;
  /** Delivery process steps — the detail layer. */
  rail: string[];
};

const STEM = "This work can help your organisation:";
const RAIL_LABEL = "How it's delivered";

const services: Service[] = [
  {
    id: "s1",
    tab: "AI Proof of Value",
    name: "AI Proof of Value",
    line: "Prove one AI use case pays, before you commit to more.",
    desc: "For any organisation still asking whether AI can do this. Not a demo. Not a science project.",
    bullets: [
      "See a working Claude build run on your own data.",
      "Measure it against a KPI that you choose.",
      "End with a clear go, pivot, or stop decision.",
      "Leave with the code and a costed route to production.",
    ],
    after: "Then: production build and ongoing operation.",
    ctaLabel: "Let's talk AI Proof of Value",
    rail: [
      "Discovery: the use case, the sponsor, the KPI",
      "Sprint one: stand up the build, wire in your data",
      "Sprint two: iterate on real data, run evaluations",
      "Readout: the numbers and a costed route to production",
    ],
  },
  {
    id: "s2",
    tab: "Claude Code",
    name: "Claude Code Enablement",
    line: "Turn Claude Code licences into measured engineering delivery.",
    desc: "For engineering organisations where adoption is patchy, security blocks rollout, or nobody can measure the gain.",
    bullets: [
      "Roll out Claude Code securely, with the right access and controls.",
      "Get developers working to shared conventions across your teams.",
      "Add custom commands and skills shaped to your stack.",
      "Track adoption on a dashboard that shows the real return.",
    ],
    after: "Then: ongoing enablement and measurement at scale.",
    ctaLabel: "Let's talk Claude Code Enablement",
    rail: [
      "Technical setup: SSO, provisioning, allowlists, telemetry",
      "Phased launch: a pilot group first, then champions per team",
      "Training: sessions, project conventions, custom commands, CI",
      "Scaling: rollout across teams, with office hours and support",
    ],
  },
  {
    id: "s3",
    tab: "Legacy Modernisation",
    name: "Legacy Modernisation",
    line: "Get off the legacy system without losing what it knows.",
    bullets: [
      "Recover the business logic buried in the code, documented at last.",
      "Move onto a modern stack, tests built as you go.",
      "Prove the new matches the old, run side by side.",
      "Cut over in phases, reusing what works across the estate.",
    ],
    after: "Then: the wider programme and ongoing support.",
    ctaLabel: "Let's talk Legacy Modernisation",
    rail: [
      "Assess: extract the logic, map dependencies, prove one subsystem",
      "Migrate: structure-preserving translation, with generated tests",
      "Validate: run old and new in parallel, compare outputs",
      "Scale: reuse proven patterns across the estate",
    ],
  },
  {
    id: "s4",
    tab: "AI Readiness",
    name: "AI Readiness Assessment",
    line: "Know exactly where you stand, and what to do first.",
    desc: "For any organisation that wants AI but isn't sure where to begin.",
    bullets: [
      "Get a clear score across the dimensions that matter.",
      "See your gaps ranked by the impact of fixing them.",
      "Compare yourself against peers who have done this already.",
      "Leave with a prioritised roadmap your leadership can act on.",
    ],
    after: "Then: your first AI Proof of Value.",
    ctaLabel: "Let's talk AI Readiness Assessment",
    rail: [
      "Scope: objectives, documents, interview plan",
      "Discovery: stakeholder interviews, infrastructure and data review",
      "Scoring: each dimension benchmarked, gaps ranked by impact",
      "Readout: an executive summary and a prioritised action plan",
    ],
  },
  {
    id: "s8",
    tab: "AI Workshops",
    name: "AI Workshops",
    line: "Get your teams genuinely good at AI, on their own work.",
    desc: "For organisations whose people are using AI ad hoc, or whose training so far changed nothing.",
    bullets: [
      "Get every team trained on their real work, role by role.",
      "Take people from curious to fluent on the tools you pay for.",
      "Grow in-house champions who keep the momentum going.",
      "Leave with reusable role guides and adoption you can measure.",
    ],
    after: "Then: a standing enablement and change programme.",
    ctaLabel: "Let's talk AI Workshops",
    rail: [
      "Scope: pick the departments, roles, and use cases",
      "Install: Claude Enterprise set up and configured, where you need it",
      "Train: hands-on sessions per team, on their own work",
      "Champions: train the people who will carry it forward",
      "Measure: usage reviewed after each wave, gaps retrained",
    ],
  },
  {
    id: "s5",
    tab: "AI Adoption",
    name: "AI Adoption & Change Management",
    line: "Turn deployed AI tools into daily habits.",
    desc: "For organisations that rolled out AI and saw little uptake, or whose people feel wary.",
    bullets: [
      "Get a clear adoption plan built around your actual rollout.",
      "Train people on their real tasks, role by role.",
      "Build a champion network and the comms to carry it.",
      "Measure adoption and keep it climbing after the launch fades.",
    ],
    after: "Then: a standing reinforcement programme.",
    ctaLabel: "Let's talk AI Adoption & Change Management",
    rail: [
      "Sponsors: secure active, visible executive backing",
      "Segment: map impacted groups, skill gaps, resistance points",
      "Enable: role-based training on real tasks, champions per team",
      "Reinforce: office hours, adoption measurement, continuous refresh",
    ],
  },
  {
    id: "s6",
    tab: "Shadow AI",
    name: "Shadow AI Assessment",
    line: "Know what AI your staff already use, and make it safe.",
    desc: "For organisations that know staff use AI but cannot see it.",
    bullets: [
      "Get one ranked list of the tools in use, no guesswork.",
      "Know the risk each carries, by data and business unit.",
      "Put a usable AI policy and incident playbook in place.",
      "Give staff a safe, sanctioned option they will prefer.",
    ],
    after: "Then: sanctioned rollout and ongoing monitoring.",
    ctaLabel: "Let's talk Shadow AI Assessment",
    rail: [
      "Discovery: network, software, and expense signals build the inventory",
      "Amnesty survey: a no-punishment self-report catches the rest",
      "Risk scoring: every tool mapped to business unit and data class",
      "Governance: acceptable-use policy, incident playbook, safe default",
    ],
  },
  {
    id: "s7",
    tab: "Managed AI Services",
    name: "Managed AI Services",
    line: "Keep your production AI working, safe, and improving.",
    desc: "For organisations running AI in production with nobody to operate it.",
    bullets: [
      "Have it monitored under an agreed service level.",
      "Control spend and keep guardrails on, without a new hire.",
      "Get a real response when something breaks, day or night.",
      "Raise quality over time, even on systems you did not build.",
    ],
    after: "Then: the ongoing operation behind every build.",
    ctaLabel: "Let's talk Managed AI Services",
    rail: [
      "Onboard: map models, agents, and pipelines, set service levels",
      "Instrument: tracing, evaluation suites, cost attribution, guardrails",
      "Operate: real-time alerts, incident management, human review where needed",
      "Improve: continuous evaluation, model routing, monthly reviews",
    ],
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
              {s.desc && <p className="tp-desc">{s.desc}</p>}
              <div className="tp-help">{STEM}</div>
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
              <div className="eyebrow">{RAIL_LABEL}</div>
              <ul>
                {s.rail.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
