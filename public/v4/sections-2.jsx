/* v4 — Leadership, Skills, Projects */

/* ---- Leadership ---- */
function Leadership({ data }) {
  const L = data.leadership;
  return (
    <section className="v4-section v4-lead" id="leadership">
      <div className="v4-wrap">
        <div className="v4-lead-top">
          <div className="v4-reveal">
            <p className="v4-eyebrow">Leadership</p>
            <h2 className="v4-h2">More than a title. A technical lead.</h2>
            <p className="v4-lede">{tidyProse(L.intro)}</p>
          </div>
          <div className="v4-scope v4-reveal">
            {L.scope.map((s, i) => (
              <div className="v4-scope-cell" key={i}>
                <div className="v4-scope-v">{s.v}</div>
                <div className="v4-scope-k">{s.k}</div>
                <div className="v4-scope-note">{tidyProse(s.note)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="v4-facets v4-reveal">
          {L.facets.map((f, i) => (
            <div className={"v4-facet" + (f.wide ? " is-wide" : "")} key={i}>
              <div className="v4-facet-n">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="v4-facet-t">{f.title}</h3>
              <p className="v4-facet-b">{tidyProse(f.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Skills ---- */
const CAT_ORDER = [
  "Architecture",
  "Frontend",
  "Backend",
  "CMS / DAM",
  "Cloud & Infrastructure",
  "DevOps & Tooling",
  "Data & Analytics",
  "CDP & Personalization",
  "Security & Compliance",
  "AI & Machine Learning",
  "Testing & QA",
  "Healthcare",
  "Game Dev / Hobby",
];

function Skills({ data }) {
  const groups = {};
  data.skills.forEach((s) => {
    (groups[s.cat] = groups[s.cat] || []).push(s);
  });
  const cats = Object.keys(groups).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  cats.forEach((c) => groups[c].sort((a, b) => b.rating - a.rating));

  return (
    <section className="v4-section" id="skills">
      <div className="v4-wrap">
        <div className="v4-xp-head v4-reveal">
          <div>
            <p className="v4-eyebrow">Capabilities</p>
            <h2 className="v4-h2">A full-stack toolkit, kept sharp.</h2>
          </div>
          <p className="v4-lede" style={{ maxWidth: "36ch" }}>
            {data.skills.length} skills across the stack. Bars show depth, the
            year shows when each was last used in earnest.
          </p>
        </div>
        <div className="v4-skills-grid">
          {cats.map((cat) => (
            <div className="v4-skcat v4-reveal" key={cat}>
              <div className="v4-skcat-h">
                <span className="v4-skcat-name">{cat}</span>
                <span className="v4-skcat-count">
                  {String(groups[cat].length).padStart(2, "0")}
                </span>
              </div>
              {groups[cat].map((s, i) => (
                <div className="v4-skrow" key={i}>
                  <span className="v4-sk-name">{s.skill}</span>
                  <span className="v4-sk-meter">
                    {[1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className={"v4-sk-pip" + (n <= s.rating ? " on" : "")}
                      />
                    ))}
                    <span className="v4-sk-yr">'{String(s.year).slice(2)}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Projects ---- */
function Projects({ data }) {
  return (
    <section className="v4-section v4-proj" id="work">
      <div className="v4-wrap">
        <div className="v4-xp-head v4-reveal">
          <div>
            <p className="v4-eyebrow">Selected work</p>
            <h2 className="v4-h2">Where the engineering shows up.</h2>
          </div>
          <p className="v4-lede" style={{ maxWidth: "36ch" }}>
            Flagship client platforms and the personal projects that keep the
            craft honest.
          </p>
        </div>
        <div className="v4-proj-grid">
          {data.projects.map((p, i) => (
            <article className="v4-card v4-reveal" key={i}>
              <div className="v4-card-kind">{p.kind}</div>
              <h3 className="v4-card-title">{p.title}</h3>
              <p className="v4-card-blurb">{tidyProse(p.blurb)}</p>
              <div className="v4-card-stack">
                {p.stack.map((t, j) => (
                  <span className="v4-chip" key={j}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Leadership, Skills, Projects });
