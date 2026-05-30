/* global React */
const { useState: useS2, useMemo: useM2 } = React;
const PaneHead = window.PaneHead;

// ============================================================
// SKILLS — TSV table with grep + sort + category chips
// ============================================================
function V2Skills() {
  const D = window.SITE_DATA;
  const cats = useM2(() => {
    const m = new Map();
    for (const s of D.skills) m.set(s.cat, (m.get(s.cat) || 0) + 1);
    return [["All", D.skills.length], ...Array.from(m.entries())];
  }, []);
  const [active, setActive] = useS2("All");
  const [open, setOpen] = useS2(null);
  const [sort, setSort] = useS2({ key: "rating", dir: "desc" });
  const [q, setQ] = useS2("");

  const view = useM2(() => {
    let v = active === "All" ? D.skills.slice() : D.skills.filter(s => s.cat === active);
    if (q) {
      const needle = q.toLowerCase();
      v = v.filter(s =>
        s.skill.toLowerCase().includes(needle) ||
        s.cat.toLowerCase().includes(needle) ||
        s.notes.toLowerCase().includes(needle)
      );
    }
    v.sort((a, b) => {
      const mul = sort.dir === "asc" ? 1 : -1;
      if (sort.key === "name") return a.skill.localeCompare(b.skill) * mul;
      if (sort.key === "cat")  return a.cat.localeCompare(b.cat) * mul;
      if (sort.key === "year") return (a.year - b.year) * mul;
      return (a.rating - b.rating) * mul || a.skill.localeCompare(b.skill);
    });
    return v;
  }, [active, q, sort]);

  const Dots = ({ n }) => (
    <span className="v2-dots">{[1,2,3,4].map(i => <i key={i} className={i <= n ? "on" : ""} />)}</span>
  );
  const levelLabel = ["", "Beginner", "Developing", "Proficient", "Expert"];

  const toggleSort = (k) => {
    setSort(s => s.key === k ? { key: k, dir: s.dir === "asc" ? "desc" : "asc" } : { key: k, dir: k === "name" || k === "cat" ? "asc" : "desc" });
  };
  const Arr = ({ k }) => sort.key === k ? <span className="arr">{sort.dir === "asc" ? "↑" : "↓"}</span> : null;

  return (
    <section id="pane-skills">
      <PaneHead path="~/career" file="skills.tsv" lang={`${view.length} / ${D.skills.length} rows`} />
      <div className="v2-pane">
        <div className="v2-skills-head">
          <h2 className="v2-section-title">Self-rated, <span className="ital">honestly.</span></h2>
          <div className="legend">
            {[1,2,3,4].map(n => (
              <span key={n} className="lvl"><Dots n={n} /><span>{levelLabel[n]}</span></span>
            ))}
          </div>
        </div>

        <div className="v2-grep">
          <span className="lead">$ grep</span>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="filter skills, categories, evidence…"
            spellCheck="false"
          />
          <span className="hint"><kbd>/</kbd> to focus</span>
        </div>

        <div className="v2-chips">
          {cats.map(([c, ct]) => (
            <button
              key={c}
              className="v2-chip"
              aria-pressed={active === c}
              onClick={() => { setActive(c); setOpen(null); }}
            >
              {c} <span className="ct">{ct}</span>
            </button>
          ))}
        </div>

        <div className="v2-table">
          <div className="thead">
            <span className="right">#</span>
            <button className={sort.key === "name" ? "active" : ""} onClick={() => toggleSort("name")}>skill <Arr k="name" /></button>
            <button className={"col-cat " + (sort.key === "cat" ? "active" : "")} onClick={() => toggleSort("cat")}>category <Arr k="cat" /></button>
            <button className={"right " + (sort.key === "rating" ? "active" : "")} onClick={() => toggleSort("rating")} style={{ justifyContent: "flex-end" }}>level <Arr k="rating" /></button>
            <button className={"col-yr right " + (sort.key === "year" ? "active" : "")} onClick={() => toggleSort("year")} style={{ justifyContent: "flex-end" }}>year <Arr k="year" /></button>
            <span className="center"></span>
          </div>
          {view.map((s, i) => {
            const key = `${s.cat}|${s.skill}`;
            const isOpen = open === key;
            return (
              <div
                key={key}
                className="v2-trow"
                style={{ '--i': i }}
                data-open={isOpen ? "true" : "false"}
                onClick={() => setOpen(isOpen ? null : key)}
              >
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="skill">{s.skill}</span>
                <span className="cat">{s.cat}</span>
                <span className="lvl"><Dots n={s.rating} /></span>
                <span className="yr">'{String(s.year).slice(2)}</span>
                <span className="caret">›</span>
                {isOpen && (
                  <div className="v2-trow-notes">
                    <div className="meta">{levelLabel[s.rating]} · last used {s.year} · {s.cat}</div>
                    {s.notes}
                  </div>
                )}
              </div>
            );
          })}
          <div className="v2-tfoot">
            <span>{view.length} of {D.skills.length} rows · self-rated from internal tracker</span>
            <span>sorted by {sort.key} {sort.dir}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROJECTS — repo cards
// ============================================================
function V2Projects() {
  const D = window.SITE_DATA;
  const langs = ["php", "cs", "php", "java"];
  return (
    <section id="pane-projects">
      <PaneHead path="~/projects" file="README.md" lang="markdown" />
      <div className="v2-pane">
        <h2 className="v2-section-title">Things I've <span className="ital">built.</span></h2>
        <p className="v2-section-sub"># client work + nights-and-weekends. the hobby projects are how the day job stays sharp.</p>
        <div className="v2-repos">
          {D.projects.map((p, i) => {
            const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            const isPublic = !!p.kind.match(/Personal/);
            return (
              <article key={i} className="v2-repo" style={{ '--i': i }}>
                <div className="top">
                  <span>{p.kind}</span>
                  <span style={{ marginLeft: "auto" }} className={"priv " + (isPublic ? "public" : "")}>{isPublic ? "Public" : "Client"}</span>
                </div>
                <h3>
                  <span className="owner">evanborden</span>
                  <span className="slash">/</span>
                  <span className="name">{slug}</span>
                </h3>
                <p>{p.blurb}</p>
                <div className="topics">
                  {p.stack.map((t, k) => <span key={k}>{t.toLowerCase().replace(/\s+/g, "-")}</span>)}
                </div>
                <div className="foot">
                  <span className={"lang " + langs[i]}><i></i> {p.stack[0]}</span>
                  <span>·</span>
                  <span>updated {2026 - (i === 1 ? 0 : i % 2)}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT — shell prompt
// ============================================================
function V2Contact() {
  const D = window.SITE_DATA;
  return (
    <section id="pane-contact">
      <PaneHead path="~" file="contact.sh" lang="shell" />
      <div className="v2-pane">
        <h2 className="v2-section-title">Let's <span className="ital">talk.</span></h2>
        <p className="v2-section-sub"># the fastest way to reach me is the first one.</p>

        <div className="v2-shell-block">
          <div className="line">
            <span style={{ color: "var(--v2-mint)" }}>$</span>
            <span style={{ color: "var(--v2-ink)" }}>cat ./contact.sh</span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-cyan)" }}>email</span>
            <span className="sep">=</span>
            <span className="out"><a href={`mailto:${D.email}`}>{D.email}</a></span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-cyan)" }}>phone</span>
            <span className="sep">=</span>
            <span className="out" style={{ color: "var(--v2-ink-soft)" }}>{D.phone}</span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-cyan)" }}>linkedin</span>
            <span className="sep">=</span>
            <span className="out"><a href={D.linkedin} target="_blank" rel="noopener">linkedin.com/in/evan-borden</a></span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-cyan)" }}>location</span>
            <span className="sep">=</span>
            <span className="out" style={{ color: "var(--v2-ink-soft)" }}>Charlotte, NC · America/New_York</span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-cyan)" }}>education</span>
            <span className="sep">=</span>
            <span className="out" style={{ color: "var(--v2-ink-soft)" }}>UNC Charlotte · B.S. Computer Science</span>
          </div>
          <div className="line" style={{ marginTop: 12 }}>
            <span style={{ color: "var(--v2-mint)" }}>$</span>
            <span style={{ color: "var(--v2-ink)" }}>./contact.sh --status</span>
          </div>
          <div className="line">
            <span className="out" style={{ color: "var(--v2-mint)" }}>● open to conversations · 2026</span>
          </div>
          <div className="line">
            <span style={{ color: "var(--v2-mint)" }}>$</span>
            <span className="caret"></span>
          </div>
        </div>

        <div style={{ marginTop: 60, color: "var(--v2-ink-faint)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span>© 2026 Evan Borden · built with HTML & opinions</span>
          <span>v2.0 · personal cockpit · 2026.05</span>
        </div>
      </div>
    </section>
  );
}

window.V2Parts2 = { V2Skills, V2Projects, V2Contact };
