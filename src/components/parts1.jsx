/* v5 Terminal Lime — parts 1: Nav, Hero, About, Experience, Leadership */
import React, { useState, useEffect } from "react";
import { SITE_DATA } from "../data.js";
const D = SITE_DATA;
const tidy = (s) => (typeof s === "string" ? s.replace(/\s*—\s*/g, ", ") : s);
const tidyRange = (s) => (typeof s === "string" ? s.replace(/\s*—\s*/g, " – ") : s);

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

function Nav({ active }) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={"v5-nav" + (stuck ? " stuck" : "")}>
      <a className="v5-nav-brand" href="#top">
        <span className="sq" />
        EVAN BORDEN <span className="role">/ MGR·ENG</span>
      </a>
      <div className="v5-nav-links">
        {SECTIONS.map((s) => (
          <a key={s.id} href={"#" + s.id} className={active === s.id ? "on" : ""}>{s.label}</a>
        ))}
      </div>
      <a className="v5-nav-cta" href={"mailto:" + (D.email || "")}>Get in touch →</a>
    </nav>
  );
}

const STATS = [
  { v: "18", u: "yrs", k: "In software" },
  { v: "7", u: "yrs", k: "Leading teams" },
  { v: "3", k: "Flagship accts" },
  { v: "10", k: "Engineers led" },
];

function Hero() {
  return (
    <header className="v5-hero" id="top">
      <div className="v5-photo-col" data-px-col>
        <figure className="v5-photo">
          <img src="/assets/workshop.jpeg" alt="Evan Borden at the workbench" data-px-img />
          <div className="v5-photo-tint" />
          <div className="v5-photo-grain" />
          <div className="v5-photo-shade" />
          <div className="v5-photo-rim" />
        </figure>
        <span className="v5-tick tl" />
        <span className="v5-tick tr" />
        <div className="v5-photo-meta">
          <span className="tag"><span className="sq" style={{ width: 6, height: 6, background: "currentColor" }} />IMG · AT THE BENCH</span>
          <span>CHARLOTTE, NC · 35.2°N</span>
        </div>
      </div>

      <div className="v5-right">
        <span className="v5-eyebrow"><span className="dot" />Available · Senior engineering leadership</span>
        <h1 className="v5-name" data-px-name>Evan<br />Borden</h1>
        <div className="v5-role">Manager of Engineering <b>· Razorfish · Charlotte, NC</b></div>
        <p className="v5-tag">
          Hands-on engineering leader. Ships software, grows the people who
          write it, and keeps the codebase calm and the client confident.
        </p>
        <div className="v5-cta-row">
          <a className="v5-btn v5-btn-primary" href="#work">View the work <span className="arr">↗</span></a>
          <a className="v5-btn v5-btn-ghost" href={"mailto:" + (D.email || "")}>Start a conversation</a>
        </div>
        <div className="v5-stats">
          {STATS.map((s, i) => (
            <div className="v5-stat" key={i}>
              <div className="v5-stat-v">{s.v}{s.u && <span className="u">{s.u}</span>}</div>
              <div className="v5-stat-k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="v5-scrollcue"><span>scroll</span><span className="bar" /></div>
    </header>
  );
}

const TECH = [
  "WordPress", "PHP 8", "AEM", "React", "Vue", "Node", "JWT / JOSE",
  "Adobe CJA", "Adobe Target", "Azure DevOps", "GitLab CI/CD", "Docker",
  "Linux", "Unity · C#", "MCP", "Epic EHR", "Chase API",
];
function Marquee() {
  const row = (
    <div className="v5-marq-item">
      {TECH.map((t, i) => (<span key={i}><span className="s">/</span> {t}</span>))}
    </div>
  );
  return (
    <div className="v5-marquee" aria-hidden="true">
      <div className="v5-marquee-track">{row}{row}</div>
    </div>
  );
}

function About() {
  return (
    <section className="v5-band" id="profile">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">01</span> Profile</div>
        <h2 className="v5-about-statement v5-rev">
          I make teams <span className="hl">faster</span>, codebases <span className="hl">calmer</span>, and clients <span className="hl">confident</span>.
        </h2>
        <div className="v5-about-grid">
          <div className="v5-about-body v5-rev">
            <p>
              Eighteen years building software, seven of them leading the
              engineers who build it. My background runs from enterprise
              WordPress and AEM platforms to modern CI/CD on GitLab and Azure
              DevOps, with ongoing hands-on work bringing AI tooling into real
              engineering workflows.
            </p>
            <p>
              Day to day I lead as the <strong>technical lead</strong> across
              major client accounts: setting the engineering bar, placing the
              right people on the work, and getting their contributions seen.
              Based in <strong>Charlotte, NC</strong>, I partner with VP+
              technical leaders and translate engineering reality into
              decisions the business can act on.
            </p>
          </div>
          <div className="v5-facts v5-rev">
            <div className="v5-fact"><div className="v5-fact-k">Current</div><div className="v5-fact-v"><span className="hl">Mgr, Engineering</span> · Razorfish</div></div>
            <div className="v5-fact"><div className="v5-fact-k">Based in</div><div className="v5-fact-v">Charlotte, NC</div></div>
            <div className="v5-fact"><div className="v5-fact-k">Focus</div><div className="v5-fact-v">Web · CMS · Integrations</div></div>
            <div className="v5-fact"><div className="v5-fact-k">Hiring reach</div><div className="v5-fact-v">US · India · Costa Rica</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const exp = D.experience || [];
  return (
    <section className="v5-band alt" id="experience">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">02</span> Experience</div>
        <h2 className="v5-h2 v5-rev" style={{ marginBottom: 48 }}>A career built shipping the hard parts.</h2>
        <div className="v5-xp">
          {exp.map((e, i) => (
            <article className="v5-xp-row v5-rev" key={i}>
              <div className="v5-xp-period">{tidyRange(e.period)}<span className="len">{e.length}</span></div>
              <div>
                <div className="v5-xp-head">
                  <h3 className="v5-xp-role">{e.role}</h3>
                  <span className="v5-xp-co">/ {e.company}</span>
                  {e.tag ? <span className="v5-xp-tag">{e.tag}</span> : null}
                </div>
                <ul className="v5-xp-bullets">
                  {e.bullets.slice(0, 3).map((b, j) => <li key={j}>{tidy(b)}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  const L = D.leadership || { scope: [], facets: [] };
  return (
    <section className="v5-band" id="leadership">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">03</span> Leadership</div>
        <div className="v5-lead-top">
          <div className="v5-rev">
            <h2 className="v5-h2">More than a title. A technical lead.</h2>
            <p className="v5-lede" style={{ marginTop: 20 }}>{tidy(L.intro)}</p>
          </div>
          <div className="v5-scope v5-rev">
            {(L.scope || []).map((s, i) => (
              <div className="v5-scope-cell" key={i}>
                <div className="v5-scope-v">{s.v}</div>
                <div className="v5-scope-k">{s.k}</div>
                <div className="v5-scope-note">{tidy(s.note)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="v5-facets v5-rev">
          {(L.facets || []).map((f, i) => (
            <div className={"v5-facet" + (f.wide ? " wide" : "")} key={i}>
              <div className="v5-facet-n">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="v5-facet-t">{f.title}</h3>
              <p className="v5-facet-b">{tidy(f.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { SECTIONS as V5_SECTIONS, tidy as V5_tidy, Nav, Hero, Marquee, About, Experience, Leadership };
