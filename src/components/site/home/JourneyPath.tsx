import { SiteLink } from "../SiteLink";

/** 3 · P04 journey path (navy). Inline SVG with decision gates. */
export function JourneyPath() {
  return (
    <section className="bg-navy">
      <div className="wrap">
        <h2 className="h3t">
          The AI Deployment <em>Path</em>.
        </h2>
        <p className="method-intro">
          Four steps, and you choose at each one whether to keep going. It
          starts free, and it is never open-ended. Here is exactly what working
          with us looks like.
        </p>
        <div className="journey">
          <svg
            viewBox="0 0 1220 420"
            role="img"
            aria-label="The AI Deployment Path: Check, then Diagnose, then Deploy, then Improve, with a decision gate at every step"
          >
            <path
              d="M40,210 H250"
              stroke="#DEFF4D"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M250,210 H560"
              stroke="#1BE1F2"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M560,210 H660"
              stroke="#0C62FB"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M660,210 C700,210 700,140 740,140 H950 C990,140 990,210 1030,210"
              stroke="#0C62FB"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M660,210 H1030"
              stroke="#0C62FB"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M660,210 C700,210 700,280 740,280 H950 C990,280 990,210 1030,210"
              stroke="#0C62FB"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M1030,210 H1090"
              stroke="#C7B9FF"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="1135"
              cy="210"
              r="42"
              stroke="#C7B9FF"
              strokeWidth="6"
              fill="none"
            />
            {/* clockwise "cycle / ongoing" arrowhead — symmetric chevron straddling the
                circle's top point (1135,168), tip 6px right, barbs mirrored ±7 in y */}
            <path
              d="M1129,161 L1141,168 L1129,175"
              stroke="#C7B9FF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M560,210 C600,210 600,320 640,320 H780"
              stroke="#5b6b85"
              strokeWidth="3"
              strokeDasharray="7 7"
              fill="none"
            />
            <path
              d="M780,320 l-12,-7 M780,320 l-12,7"
              stroke="#5b6b85"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="120"
              cy="210"
              r="9"
              fill="#000A25"
              stroke="#DEFF4D"
              strokeWidth="4"
            />
            <circle
              cx="405"
              cy="210"
              r="9"
              fill="#000A25"
              stroke="#1BE1F2"
              strokeWidth="4"
            />
            <circle
              cx="845"
              cy="140"
              r="8"
              fill="#000A25"
              stroke="#0C62FB"
              strokeWidth="4"
            />
            <circle
              cx="845"
              cy="210"
              r="8"
              fill="#000A25"
              stroke="#0C62FB"
              strokeWidth="4"
            />
            <circle
              cx="845"
              cy="280"
              r="8"
              fill="#000A25"
              stroke="#0C62FB"
              strokeWidth="4"
            />
            <circle
              cx="250"
              cy="210"
              r="14"
              fill="#000A25"
              stroke="#fff"
              strokeWidth="5"
            />
            <circle
              cx="560"
              cy="210"
              r="14"
              fill="#000A25"
              stroke="#fff"
              strokeWidth="5"
            />
            <circle
              cx="1030"
              cy="210"
              r="14"
              fill="#000A25"
              stroke="#fff"
              strokeWidth="5"
            />
            <text x="40" y="100" className="jstage" fill="#DEFF4D">
              01 · Check
            </text>
            <text x="40" y="123" className="jlabel b">
              The AI Fit Check
            </text>
            <text x="40" y="143" className="jsub">
              Is there an opportunity here?
            </text>
            <text x="330" y="100" className="jstage" fill="#1BE1F2">
              02 · Diagnose
            </text>
            <text x="330" y="123" className="jlabel b">
              The Deployment Diagnostic
            </text>
            <text x="330" y="143" className="jsub">
              A costed plan and the ROI to expect.
            </text>
            <text x="690" y="72" className="jstage" fill="#6DA1FD">
              03 · Deploy
            </text>
            <text x="690" y="95" className="jlabel b">
              The Rollout — fixed price, live in weeks
            </text>
            <text x="845" y="118" className="jlabel b">
              Launch
            </text>
            <text x="845" y="188" className="jlabel b">
              Connect
            </text>
            <text x="845" y="258" className="jlabel b">
              Automate
            </text>
            <text x="1076" y="100" className="jstage" fill="#C7B9FF">
              04 · Improve
            </text>
            <text x="1076" y="123" className="jlabel b">
              Ongoing operation
            </text>
            <text x="1076" y="143" className="jsub">
              It keeps paying off.
            </text>
            <text x="250" y="252" textAnchor="middle" className="jgate">
              Your call
            </text>
            <text x="560" y="252" textAnchor="middle" className="jgate">
              Your call
            </text>
            <text x="1030" y="252" textAnchor="middle" className="jgate">
              Your call
            </text>
            <text x="600" y="352" className="jexit">
              You own the plan. Take it to somebody else. Some people do.
            </text>
          </svg>
        </div>
        {/* Mobile snake (<720px): same stages redrawn as a winding vertical route.
            Desktop keeps the measured wide SVG above; CSS swaps them. */}
        <div className="journey-m">
          <svg
            viewBox="0 0 342 806"
            role="img"
            aria-label="The AI Deployment Path: Check, then Diagnose, then Deploy, then Improve, with a decision gate at every step"
          >
            <path d="M60,48 V150" stroke="#DEFF4D" strokeWidth="6" fill="none" />
            <path
              d="M60,150 C60,208 282,192 282,250 V330"
              stroke="#1BE1F2"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M282,330 C282,388 60,372 60,430 V540"
              stroke="#0C62FB"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M60,540 C60,598 282,582 282,640 V704"
              stroke="#C7B9FF"
              strokeWidth="6"
              fill="none"
            />

            <circle cx="60" cy="48" r="9" fill="#000A25" stroke="#DEFF4D" strokeWidth="4" />
            <text x="86" y="40" className="jm-stage" fill="#DEFF4D">
              01 · Check
            </text>
            <text x="86" y="60" className="jm-lbl">
              The AI Fit Check
            </text>
            <text x="86" y="78" className="jm-sub">
              Is there an opportunity here?
            </text>
            <circle cx="60" cy="150" r="12" fill="#000A25" stroke="#fff" strokeWidth="5" />
            <text x="84" y="155" className="jm-gate">
              Your call
            </text>

            <circle cx="282" cy="250" r="9" fill="#000A25" stroke="#1BE1F2" strokeWidth="4" />
            <text x="256" y="242" textAnchor="end" className="jm-stage" fill="#1BE1F2">
              02 · Diagnose
            </text>
            <text x="256" y="262" textAnchor="end" className="jm-lbl">
              The Deployment Diagnostic
            </text>
            <text x="256" y="280" textAnchor="end" className="jm-sub">
              A costed plan and the ROI to expect.
            </text>
            <circle cx="282" cy="330" r="12" fill="#000A25" stroke="#fff" strokeWidth="5" />
            <text x="256" y="335" textAnchor="end" className="jm-gate">
              Your call
            </text>
            <path
              d="M294,338 C316,352 316,368 316,384"
              stroke="#5b6b85"
              strokeWidth="3"
              strokeDasharray="7 7"
              fill="none"
            />
            <path d="M316,384 l-7,-11 M316,384 l7,-11" stroke="#5b6b85" strokeWidth="3" fill="none" />
            <text x="330" y="404" textAnchor="end" className="jm-exit">
              You own the plan.
            </text>
            <text x="330" y="419" textAnchor="end" className="jm-exit">
              Some people do.
            </text>

            <circle cx="60" cy="430" r="9" fill="#000A25" stroke="#0C62FB" strokeWidth="4" />
            <text x="86" y="422" className="jm-stage" fill="#6DA1FD">
              03 · Deploy
            </text>
            <text x="86" y="442" className="jm-lbl jm-tight">
              The Rollout — fixed price, live in weeks
            </text>
            <circle cx="92" cy="464" r="5" fill="#000A25" stroke="#0C62FB" strokeWidth="3" />
            <text x="103" y="468" className="jm-sub">
              Launch
            </text>
            <circle cx="163" cy="464" r="5" fill="#000A25" stroke="#0C62FB" strokeWidth="3" />
            <text x="174" y="468" className="jm-sub">
              Connect
            </text>
            <circle cx="241" cy="464" r="5" fill="#000A25" stroke="#0C62FB" strokeWidth="3" />
            <text x="252" y="468" className="jm-sub">
              Automate
            </text>
            <circle cx="60" cy="540" r="12" fill="#000A25" stroke="#fff" strokeWidth="5" />
            <text x="84" y="545" className="jm-gate">
              Your call
            </text>

            <circle cx="282" cy="640" r="9" fill="#000A25" stroke="#C7B9FF" strokeWidth="4" />
            <text x="256" y="632" textAnchor="end" className="jm-stage" fill="#C7B9FF">
              04 · Improve
            </text>
            <text x="256" y="652" textAnchor="end" className="jm-lbl">
              Ongoing operation
            </text>
            <text x="256" y="670" textAnchor="end" className="jm-sub">
              It keeps paying off.
            </text>
            <circle cx="282" cy="744" r="40" stroke="#C7B9FF" strokeWidth="6" fill="none" />
            <path
              d="M329,738 L322,750 L315,738"
              stroke="#C7B9FF"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="method-cta">
          <SiteLink className="pill p-white" href="/fit-check">
            Start with the free Fit Check
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
