import { useState, useMemo } from "react";
import { SITE_DATA as D } from "../data.js";

export function Skills() {
  const cats = useMemo(() => {
    const m = new Map();
    for (const s of D.skills) m.set(s.cat, (m.get(s.cat) || 0) + 1);
    return [["All", D.skills.length], ...m.entries()];
  }, []);
  const [active, setActive] = useState("All");
  const [openKey, setOpenKey] = useState(null);
  const [sort, setSort] = useState("rating");

  const visible = useMemo(() => {
    let v = active === "All" ? D.skills.slice() : D.skills.filter(s => s.cat === active);
    if (sort === "rating") v.sort((a, b) => b.rating - a.rating || a.skill.localeCompare(b.skill));
    if (sort === "year")   v.sort((a, b) => b.year - a.year || b.rating - a.rating);
    if (sort === "name")   v.sort((a, b) => a.skill.localeCompare(b.skill));
    return v;
  }, [active, sort]);

  const RatingDots = ({ n }) => (
    <span className="dots">
      {[1,2,3,4].map(i => <i key={i} className={i <= n ? "on" : ""} />)}
    </span>
  );

  const levelLabel = ["", "Beginner", "Developing", "Proficient", "Expert"];

  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="section-label">
          <span className="num">004</span>
          <span>The Toolbelt</span>
          <span className="line"></span>
        </div>

        <div className="skills-head">
          <h2>
            Self-rated, <span className="ital">honestly</span>.
          </h2>
          <div className="legend">
            {[1,2,3,4].map(n => (
              <span key={n} className="lvl">
                <RatingDots n={n} />
                <span>{levelLabel[n]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="chips" role="tablist" aria-label="Filter by category">
          {cats.map(([c, ct]) => (
            <button
              key={c}
              className="chip"
              role="tab"
              aria-pressed={active === c}
              onClick={() => { setActive(c); setOpenKey(null); }}
            >
              {c} <span className="ct">{ct}</span>
            </button>
          ))}
        </div>

        <div className="skills-foot" style={{ marginTop: 0, marginBottom: 14 }}>
          <span>Showing {visible.length} {visible.length === 1 ? "skill" : "skills"}{active !== "All" ? ` in ${active}` : ""}</span>
          <span style={{ display: "inline-flex", gap: 14 }}>
            <span style={{ color: "var(--ink-faint)" }}>Sort:</span>
            {["rating","year","name"].map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: sort === s ? "var(--accent)" : "var(--ink-dim)",
                  cursor: "pointer",
                }}
              >
                {s === "rating" ? "Proficiency" : s === "year" ? "Last Used" : "A → Z"}
              </button>
            ))}
          </span>
        </div>

        <div className="skill-list">
          {visible.map((s) => {
            const key = `${s.cat}|${s.skill}`;
            const isOpen = openKey === key;
            return (
              <div
                key={key}
                className="skill-row"
                data-open={isOpen ? "true" : "false"}
                onClick={() => setOpenKey(isOpen ? null : key)}
              >
                <div className="name">
                  {s.skill}
                  <span className="cat">{s.cat}</span>
                </div>
                <div className="lvl"><RatingDots n={s.rating} /></div>
                <div className="yr">'{String(s.year).slice(2)}</div>
                <div className="caret">›</div>
                {isOpen && (
                  <div className="notes">
                    <div className="mono upper" style={{ fontSize: 10.5, color: "var(--ink-faint)", marginBottom: 8, letterSpacing: "0.16em" }}>
                      {levelLabel[s.rating]} · last used {s.year}
                    </div>
                    {s.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="skills-foot">
          <span>Source: internal Razorfish skill tracker · self-assessed</span>
          <span>Tap any row for evidence ↗</span>
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap">
        <div className="section-label">
          <span className="num">005</span>
          <span>Selected Work & Tinkering</span>
          <span className="line"></span>
        </div>
        <div className="proj-head">
          <h2>Things I've <span className="ital">built</span>.</h2>
          <div className="note">Client work + nights-and-weekends. The hobby projects are how the day job stays sharp.</div>
        </div>
        <div className="proj-grid">
          {D.projects.map((p, i) => (
            <article className="proj-card" key={i}>
              <div className="kind">{p.kind}</div>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="stack">
                {p.stack.map((t, k) => <span key={k}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="section-label">
          <span className="num">006</span>
          <span>Get In Touch</span>
          <span className="line"></span>
        </div>
        <h2 className="big">
          Let's <span className="ital">talk</span>.<br/>
          <a className="email" href={`mailto:${D.email}`}>{D.email}</a>
        </h2>
        <dl className="info">
          <div><dt>Phone</dt><dd>{D.phone}</dd></div>
          <div><dt>LinkedIn</dt><dd><a href={D.linkedin} target="_blank" rel="noopener">/in/evan-borden</a></dd></div>
          <div><dt>Based</dt><dd>{D.location}</dd></div>
          <div><dt>Education</dt><dd>UNC Charlotte · B.S. CS</dd></div>
        </dl>
        <div className="coda">
          <span>© 2026 Evan Borden · Crafted with HTML & opinions</span>
          <span className="blink">v1.0 · 2026.05</span>
        </div>
      </div>
    </section>
  );
}
