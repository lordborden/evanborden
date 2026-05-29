/* v3 rooms — part 2: Builds, Off the Clock (hobbies), Find Me */
import React from "react";
import { SITE_DATA } from "../data.js";
const D = SITE_DATA;

  /* wrap any "boomer shooter(s)" mention in a subtle glossary link to a reliable definition */
  const BOOMER_URL = "https://en.wikipedia.org/wiki/Shooter_game#Boomer_shooter";
  function linkBoomer(text) {
    const parts = String(text).split(/(boomer shooters?)/gi);
    return parts.map((p, i) =>
      /^boomer shooters?$/i.test(p)
        ? <a key={i} className="v3-glosslink" href={BOOMER_URL} target="_blank" rel="noopener"
             title="What's a boomer shooter? (opens Wikipedia)">{p}</a>
        : p
    );
  }

  /* simple line glyphs for hobbies (UI icons, stroked currentColor) */
  const GLYPHS = {
    terminal: <g><path d="M3 5l4 4-4 4" /><path d="M11 13h6" /></g>,
    joystick: <g><circle cx="10" cy="6" r="3" /><path d="M10 9v5" /><path d="M5 17h10l-1.5-3h-7z" /></g>,
    mountain: <g><path d="M2 17l5-9 3.5 6 2-3.5L18 17z" /></g>,
    route: <g><circle cx="5" cy="15" r="2" /><circle cx="15" cy="5" r="2" /><path d="M7 14c5 0 0-9 6-9" strokeDasharray="2 3" /></g>,
    controller: <g><rect x="2.5" y="7" width="15" height="8" rx="4" /><path d="M6 9.5v3M4.5 11h3" /><circle cx="13" cy="10.5" r="0.6" fill="currentColor" /><circle cx="15" cy="12.5" r="0.6" fill="currentColor" /></g>,
    home: <g><path d="M3 9l7-5 7 5" /><path d="M5 8.5V16h10V8.5" /></g>,
  };

  function Glyph({ name }) {
    return (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {GLYPHS[name] || GLYPHS.terminal}
      </svg>
    );
  }

  /* ---------------- ROOM 03 — BUILDS ---------------- */
  function Builds() {
    return (
      <div className="v3-build-grid">
        {D.projects.map((p, i) => (
          <div key={i} className="v3-build">
            <div className="kind">{p.kind}</div>
            <h3>{linkBoomer(p.title)}</h3>
            <p>{linkBoomer(p.blurb)}</p>
            <div className="stack">
              {p.stack.map((s, j) => <span key={j}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---------------- ROOM 04 — OFF THE CLOCK ---------------- */
  function OffClock() {
    const list = D.hobbies || [];
    return (
      <div>
        <p className="lede">
          The map doesn't end at the office. Here's the <b>human</b> behind the title —
          off the clock, out of the editor.
        </p>
        <div className="v3-hobby-grid">
          {list.map((h, i) => (
            <div key={h.id} className={"v3-hobby" + (h.id === "family" ? " feature" : "")} data-accent={h.accent}>
              <div className="glyph"><Glyph name={h.glyph} /></div>
              <div>
                <div className="name">{h.name}</div>
                <div className="htag">{h.tag}</div>
                <p className="blurb">{linkBoomer(h.blurb)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- ROOM — REFERENCES ---------------- */
  function References() {
    const list = D.testimonials || [];
    const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
    return (
      <div className="v3-quotes">
        {list.map((t, i) => (
          <figure key={i} className="v3-quote">
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className="seal">{initials(t.name)}</span>
              <span className="who">
                <span className="nm">{t.name}</span>
                <span className="ti">{t.title}</span>
              </span>
              <span className="rel">{t.rel}<span className="sep">·</span>{t.date}<span className="sep">·</span>LinkedIn</span>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  /* ---------------- ROOM — FIND ME ---------------- */
  function FindMe() {
    return (
      <div>
        <div className="big">
          Let's <em>map</em> something<br />
          worth building.
        </div>
        <div className="v3-contact-grid">
          <div className="cell">
            <div className="k">Email</div>
            <div className="v"><a href={"mailto:" + D.email}>{D.email}</a></div>
          </div>
          <div className="cell">
            <div className="k">Phone</div>
            <div className="v"><a href={"tel:" + D.phone.replace(/\./g, "")}>{D.phone}</a></div>
          </div>
          <div className="cell">
            <div className="k">LinkedIn</div>
            <div className="v"><a href={D.linkedin} target="_blank" rel="noopener">/in/evan-borden</a></div>
          </div>
          <div className="cell">
            <div className="k">Basecamp</div>
            <div className="v">{D.location}</div>
          </div>
        </div>
        <div className="v3-edu">
          {D.education.map((e, i) => (
            <div key={i} className="row">
              <span className="yr">{e.years}</span>
              <span className="school">{e.school} — <span className="deg">{e.degree}</span></span>
            </div>
          ))}
        </div>
        <div className="signoff">
          end of trail · thanks for roaming <span className="blink"></span>
        </div>
      </div>
    );
  }

export { Builds, OffClock, References, FindMe };
