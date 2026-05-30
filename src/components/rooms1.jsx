/* v3 rooms — part 1: Trailhead (hero), The Work, The Kit */
import React, { useState, useMemo } from "react";
import { SITE_DATA } from "../data.js";
const D = SITE_DATA;


  /* ---------------- ROOM 00 — TRAILHEAD ---------------- */
  function Trailhead({ onTravel }) {
    return (
      <div className="hero-grid">
        <div>
          <div className="eyebrow">Field map · est. 2008</div>
          <h1>Evan<br />Borden</h1>
          <p className="role">
            <b>Manager of Engineering</b> at Razorfish — Charlotte, NC. Eighteen years writing
            software, <em>seven</em> leading the people who write it.
          </p>
          <div className="meta">
            <span className="pill"><span className="dot"></span>Hands-on leader</span>
            <span className="pill"><span className="dot clay"></span>WordPress · AEM · cloud</span>
            <span className="pill"><span className="dot"></span>Builds <a className="v3-glosslink" href="https://en.wikipedia.org/wiki/Shooter_game#Boomer_shooter" target="_blank" rel="noopener" title="What's a boomer shooter? (opens Wikipedia)">boomer shooters</a> in Unity</span>
          </div>
          <div className="start">
            <button className="v3-cta" onClick={() => onTravel("work")}>
              Walk the work <span className="arrow">→</span>
            </button>
            <button className="v3-cta ghost" onClick={() => onTravel("offclock")}>
              Off the clock
            </button>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="v3-portrait">
            <img src="/assets/profile.jpeg" alt="Evan Borden" draggable="false" />
            <span className="tab">Charlotte · NC</span>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- ROOM — LEADERSHIP ---------------- */
  function Leadership() {
    const L = D.leadership || { scope: [], facets: [] };
    return (
      <div>
        <p className="v3-lead-intro">{L.intro}</p>
        <div className="v3-lead-scope">
          {L.scope.map((s, i) => (
            <div key={i}>
              <div className="v">{s.v}</div>
              <div className="k">{s.k}</div>
              <div className="note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="v3-lead-grid">
          {L.facets.map((f, i) => (
            <div key={i} className={"v3-lead-card" + (f.wide ? " wide" : "")}>
              <div className="t">{f.title}</div>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- ROOM 01 — THE WORK ---------------- */
  function Work() {
    const [open, setOpen] = useState(0);
    return (
      <div>
        {D.experience.map((e, i) => (
          <div
            key={i}
            className={"v3-mile" + (e.tag === "current" ? " current" : "")}
            data-open={open === i ? "true" : "false"}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <div className="marker">
              {e.period.split("—")[0].trim()}
              <span className="len">{e.length}</span>
            </div>
            <div>
              <div className="role">
                {e.role} <span className="at">/ {e.company}</span>
                {e.tag ? <span className="tag">{e.tag}</span> : null}
              </div>
              <div className="summary">{e.bullets[0]}</div>
              <ul className="bullets">
                {e.bullets.slice(1).map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <span className="more">
                <span className="chev">▸</span>
                {open === i ? "less" : `${e.bullets.length} field notes`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---------------- ROOM 02 — THE KIT ---------------- */
  function Kit() {
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("all");
    const [open, setOpen] = useState(null);

    const cats = useMemo(() => {
      const m = {};
      D.skills.forEach((s) => { m[s.cat] = (m[s.cat] || 0) + 1; });
      return Object.entries(m).sort((a, b) => b[1] - a[1]);
    }, []);

    const rows = useMemo(() => {
      const ql = q.trim().toLowerCase();
      return D.skills.filter((s) => {
        if (cat !== "all" && s.cat !== cat) return false;
        if (!ql) return true;
        return (s.skill + " " + s.cat + " " + s.notes).toLowerCase().includes(ql);
      });
    }, [q, cat]);

    return (
      <div>
        <div className="kit-tools">
          <div className="v3-grep">
            <span className="lead">grep</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="filter the pack — react, aem, jwt…"
              spellCheck="false"
            />
            <span className="ct">{rows.length}/{D.skills.length}</span>
          </div>
        </div>
        <div className="v3-chips">
          <button className="v3-chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            all <span className="ct">{D.skills.length}</span>
          </button>
          {cats.map(([c, n]) => (
            <button key={c} className="v3-chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? "all" : c)}>
              {c} <span className="ct">{n}</span>
            </button>
          ))}
        </div>
        <div className="v3-kit-list" onPointerDown={(e) => e.stopPropagation()}>
          {rows.map((s, i) => {
            const id = s.cat + s.skill;
            const isOpen = open === id;
            return (
              <div key={id} className="v3-tool" data-open={isOpen ? "true" : "false"} onClick={() => setOpen(isOpen ? null : id)}>
                <div className="name">
                  {s.skill}
                  <span className="cat">{s.cat}</span>
                </div>
                <div className="gauge">
                  {[1, 2, 3, 4].map((n) => <i key={n} className={n <= s.rating ? "on" : ""}></i>)}
                </div>
                <div className="yr">'{String(s.year).slice(2)}</div>
                <div className="caret">▸</div>
                <div className="notes">{s.notes}</div>
              </div>
            );
          })}
          {rows.length === 0 ? (
            <div className="v3-tool" style={{ cursor: "default", color: "var(--v3-ink-3)" }}>
              <div className="name">no matches — <span className="mono">try a different term</span></div>
            </div>
          ) : null}
        </div>
        <div className="v3-kit-foot">
          <span>{D.skills.length} entries · rated 1–4 · last used by year</span>
          <span>press <span className="mono">/</span> to search</span>
        </div>
      </div>
    );
  }

export { Trailhead, Leadership, Work, Kit };
