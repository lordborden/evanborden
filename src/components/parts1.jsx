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
        <span className="v5-eyebrow"><span className="dot" />Available · Engineering management &amp; Adobe architecture</span>
        <h1 className="v5-name" data-px-name>Evan<br />Borden</h1>
        <div className="v5-role">Manager of Engineering <b>· Razorfish · Charlotte, NC</b></div>
        <p className="v5-tag">
          Engineering manager and Adobe architect, leading client teams at a
          martech agency, with a focus on Adobe Experience Cloud in healthcare.
        </p>
        <div className="v5-cta-row">
          <a className="v5-btn v5-btn-primary" href="#work">View the work <span className="arr">↗</span></a>
          <a className="v5-btn v5-btn-ghost" href={"mailto:" + (D.email || "")}>Start a conversation</a>
        </div>
      </div>
      <div className="v5-scrollcue"><span>scroll</span><span className="bar" /></div>
    </header>
  );
}

const TECH = [
  "AEMaaCS", "AEM 6.5", "Adobe App Builder", "Adobe I/O Runtime",
  "Adobe Experience Platform", "Adobe Journey Optimizer", "Offer Decisioning",
  "Adobe Target", "Adobe CJA", "HIPAA", "Epic EHR", "React", "Vue", "Node",
  "WordPress", "PHP 8", "Azure DevOps", "GitLab CI/CD", "Docker", "Linux",
  "Claude · ChatGPT", "Jira · Confluence",
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
          I build the <span className="hl">team</span>, own the <span className="hl">architecture</span>, and get it into <span className="hl">production</span>.
        </h2>
        <div className="v5-about-grid">
          <div className="v5-about-body v5-rev">
            <p>
              I'm Evan Borden, Manager of Engineering at Razorfish, a martech
              agency, based in Charlotte, NC. I lead the <strong>people and the
              plan</strong> behind client teams — hiring, staffing and resourcing
              development and QA engineers across the US, India and Costa Rica —
              and own the <strong>architecture</strong> those teams build, most
              recently Adobe Experience Platform and Journey Optimizer work in
              healthcare under HIPAA.
            </p>
            <p>
              Underneath that is a hands-on engineering background, from
              enterprise WordPress and Adobe Experience Manager to the wider
              Adobe cloud stack, and I use AI tooling in my own day-to-day work.
            </p>
          </div>
          <div className="v5-facts v5-rev">
            <div className="v5-fact"><div className="v5-fact-k">Current</div><div className="v5-fact-v"><span className="hl">Manager of Engineering</span> · Razorfish</div></div>
            <div className="v5-fact"><div className="v5-fact-k">Based in</div><div className="v5-fact-v">Charlotte, NC</div></div>
            <div className="v5-fact"><div className="v5-fact-k">Focus</div><div className="v5-fact-v">Teams · Architecture · Delivery</div></div>
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
        <h2 className="v5-h2 v5-rev" style={{ marginBottom: 14 }}>A career built shipping the hard parts.</h2>
        <p className="v5-lede v5-rev" style={{ marginBottom: 48 }}>
          From Senior Engineer to Manager of Engineering at Razorfish, built on
          years of shipping interactive work at Interactive Knowledge — from
          hands-on code to staffing, architecture governance and delivery.
        </p>
        <div className="v5-xp">
          {exp.map((e, i) => (
            <article className="v5-xp-row v5-rev" key={i}>
              <div className="v5-xp-period">{tidyRange(e.period)}</div>
              <div>
                <div className="v5-xp-head">
                  <h3 className="v5-xp-role">{e.role}</h3>
                  {e.company ? <span className="v5-xp-co">/ {e.company}</span> : null}
                  {e.tag ? <span className="v5-xp-tag">{e.tag}</span> : null}
                </div>
                <ul className="v5-xp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{tidy(b)}</li>)}
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
  const L = D.leadership || { facets: [] };
  return (
    <section className="v5-band" id="leadership">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">03</span> Leadership</div>
        <div className="v5-lead-top">
          <div className="v5-rev">
            <h2 className="v5-h2">People, plan and architecture.</h2>
            <p className="v5-lede" style={{ marginTop: 20 }}>{tidy(L.intro)}</p>
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
