import React, { useState } from "react";
import { SITE_DATA } from "../data.js";
import { PaneHead } from "./shell.jsx";

// ============================================================
// HERO — whoami.sh
// ============================================================
export function V2Hero() {
  return (
    <section id="pane-hero">
      <PaneHead path="~" file="whoami.sh" lang="shell" />
      <div className="v2-pane">
        <div className="v2-hero">
          <div>
            <div className="v2-prompt">
              <span className="who">evan</span>
              <span className="at">@</span>
              <span className="host">cockpit</span>
              <span className="colon">:</span>
              <span className="path">~</span>
              <span style={{ color: "var(--v2-ink-faint)" }}>$</span>
              <span className="cmd">whoami --verbose</span>
            </div>
            <h1>Evan<br/><span className="ital">Borden</span></h1>
            <p className="lede">
              Engineering manager in Charlotte. Eighteen years writing code, seven leading the people who write it. WordPress and AEM by day; <em>Linux, MCP and Unity</em> on weekends.
            </p>
            <dl className="v2-metalist">
              <dt>role</dt>
              <dd>Manager, Engineering <span className="tag">@ Razorfish</span></dd>
              <dt>tenure</dt>
              <dd>18 yrs in software · 7 yrs leading</dd>
              <dt>stack</dt>
              <dd>WordPress · AEM · PHP · Node · React · Vue</dd>
              <dt>status</dt>
              <dd style={{ color: "var(--v2-mint)" }}>Open to conversations · 2026</dd>
            </dl>
          </div>
          <div className="v2-portrait">
            <div className="head">
              <span>IMG_0001.jpeg</span>
              <span className="live">LIVE</span>
            </div>
            <img src="/assets/profile.jpeg" alt="Evan Borden" />
            <div className="corners"><span></span></div>
            <div className="foot">
              <span>4032 × 3024 · ISO 100</span>
              <span>EB</span>
            </div>
          </div>
        </div>

        <div className="v2-boot">
          <div><span className="ts">[00:00.001]</span> <span className="ok">OK</span> &nbsp;init evanborden.com</div>
          <div><span className="ts">[00:00.014]</span> <span className="ok">OK</span> &nbsp;mounted /career — 18 years</div>
          <div><span className="ts">[00:00.027]</span> <span className="ok">OK</span> &nbsp;loaded skills.tsv — 35 entries</div>
          <div><span className="ts">[00:00.041]</span> <span className="ok">OK</span> &nbsp;connected projects/ — 4 repos</div>
          <div><span className="ts">[00:00.058]</span> <span className="ok">OK</span> &nbsp;listening on :443 for opportunities</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// README.md
// ============================================================
export function V2Readme() {
  return (
    <section id="pane-readme">
      <PaneHead path="~" file="README.md" lang="markdown" />
      <div className="v2-pane">
        <div className="v2-readme">
          <div className="bar">
            <span>▤</span>
            <span className="filename">README.md</span>
            <span className="lang">markdown</span>
          </div>
          <div className="body">
            <h1><span className="hash">#</span>About</h1>
            <p>
              Eighteen years writing code, seven leading the people who write it. I came up through <em>WordPress themes</em> and <em>AEM modules</em>, ship through GitLab and Azure DevOps, and still spend my weekends on a personal Linux box wiring <em>Claude</em> up to a webhook so it can publish to my own CMS. The job is to <strong>make the team faster, the codebase calmer, and the client confident</strong> — in roughly that order.
            </p>
          </div>
        </div>

        <div className="v2-stats">
          <div><div className="k">18<span className="u">y</span></div><div className="lbl">In software</div></div>
          <div><div className="k">7<span className="u">y</span></div><div className="lbl">Leading teams</div></div>
          <div><div className="k">35<span className="u">+</span></div><div className="lbl">Tracked skills</div></div>
          <div><div className="k">50<span className="u">%</span></div><div className="lbl">Deploy time cut</div></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EXPERIENCE — JSON Lines viewer
// ============================================================
export function V2Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="pane-work">
      <PaneHead path="~/career" file="experience.jsonl" lang="JSON Lines" />
      <div className="v2-pane">
        <h2 className="v2-section-title">A career in <span className="ital">shipping things.</span></h2>
        <p className="v2-section-sub"># click any row to expand. JSON for the structurally-minded.</p>

        <div className="v2-jsonl">
          <div className="bar">
            <span>{"{ }"}</span>
            <span className="filename">experience.jsonl</span>
            <span className="lang">{SITE_DATA.experience.length} records</span>
          </div>
          {SITE_DATA.experience.map((e, i) => (
            <div
              key={i}
              className="v2-jrow"
              data-open={open === i ? "true" : "false"}
            >
              <div className="ln">{String(i + 1).padStart(2, "0")}</div>
              <div className="data" onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="compact">
                  <span className="brace">{"{"}</span>
                  <span><span className="k">"role"</span><span className="c">:</span><span className="s">"{e.role}"</span><span className="c">,</span></span>
                  <span><span className="k">"company"</span><span className="c">:</span><span className="s">"{e.company}"</span><span className="c">,</span></span>
                  <span><span className="k">"period"</span><span className="c">:</span><span className="s">"{e.period}"</span></span>
                  {open !== i && <span className="ellipsis">, …{e.bullets.length} more </span>}
                  {open !== i && <span className="brace">{"}"}</span>}
                </div>
                <div className="expanded">
                  <div className="row"><span className="k">"summary":</span><span className="text">{e.bullets[0]}</span></div>
                  <div className="row"><span className="k">"highlights": [</span></div>
                  <ul className="arr">
                    {e.bullets.slice(1).map((b, k) => (
                      <li key={k}>
                        <span className="text">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="row"><span className="k">]</span></div>
                  <div className="row">
                    <span className="k">"tenure":</span>
                    <span className="s">"{e.length}"</span>
                    {e.tag && <span style={{ color: "var(--v2-mint)" }}>· {e.tag}</span>}
                  </div>
                  <div style={{ color: "var(--v2-ink-faint)", marginTop: 6 }}>{"}"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
