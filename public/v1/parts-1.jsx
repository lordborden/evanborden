/* global React */
const { useState, useEffect, useMemo } = React;

// ---------- StatusBar ----------
function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit", minute: "2-digit", hour12: false,
      });
      setTime(fmt.format(d));
    };
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="statusbar">
      <div className="wrap row">
        <a href="#top" className="brand">
          <span className="logo">e</span>
          <span>Evan Borden</span>
        </a>
        <nav className="nav">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="dot">·</span>
        <span className="pulse"><span className="pulse-text">Open to conversations</span></span>
        <span className="dot">·</span>
        <span className="clock">{time} EST</span>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function Hero() {
  const D = window.SITE_DATA;
  const tickerItems = [
    "WordPress · Custom themes & plugins",
    "AEM · OSGi · Sling · HTL",
    "PHP 8 · TypeScript · Java · C#",
    "GitLab CI/CD · Azure DevOps",
    "Adobe CJA · Target · Launch",
    "JWT/JOSE · OAuth · Chase API",
    "Linux · Nginx · Docker · MCP",
    "Unity 3D · DOOM-style FPS",
  ];
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="meta-top">
              <span className="num">001</span>
              <span>The Index</span>
              <span style={{ color: "var(--ink-faint)" }}>—</span>
              <span>Evan / Borden</span>
            </div>
            <h1>
              Evan<br/>
              <span className="ital">Borden</span>
            </h1>
            <dl className="sub">
              <dt>Role</dt><dd>Manager, Engineering · Razorfish</dd>
              <dt>Tenure</dt><dd>18 yrs in software · 7 yrs leading teams</dd>
              <dt>Based</dt><dd>Charlotte, NC</dd>
              <dt>Stack</dt><dd>WordPress · AEM · PHP · Node · Vue · React</dd>
            </dl>
            <p className="tag">{D.tagline.split("DOOM").map((s, i, arr) => i === arr.length - 1 ? s : <React.Fragment key={i}>{s}<em>DOOM</em></React.Fragment>)}</p>
          </div>
          <div>
            <div className="portrait">
              <img src="/assets/profile.jpeg" alt="Evan Borden" />
              <div className="corners"><span></span></div>
              <div className="badge">Available · 2026</div>
            </div>
          </div>
        </div>

        <div className="ticker" aria-hidden="true">
          <div className="track">
            <span>
              {tickerItems.map((t, i) => (
                <React.Fragment key={i}>
                  <span className={i % 3 === 1 ? "hot" : ""}>{t}</span>
                  <span className="x">✦</span>
                </React.Fragment>
              ))}
            </span>
            <span>
              {tickerItems.map((t, i) => (
                <React.Fragment key={`b${i}`}>
                  <span className={i % 3 === 1 ? "hot" : ""}>{t}</span>
                  <span className="x">✦</span>
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- About / Stats ----------
function About() {
  const D = window.SITE_DATA;
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="section-label">
          <span className="num">002</span>
          <span>The Manifesto</span>
          <span className="line"></span>
        </div>
        <div className="grid">
          <div className="mono upper" style={{ color: "var(--ink-faint)", fontSize: 11, letterSpacing: "0.16em" }}>
            About
          </div>
          <div>
            <p>
              Eighteen years writing code, six leading the people who write it. I came up through <span className="accent">WordPress themes</span> and <span className="accent">AEM modules</span>, ship through GitLab and Azure DevOps, and still spend my weekends on a personal Linux box wiring Claude up to a webhook so it can publish to my own CMS. The job is to make the team faster, the codebase calmer, and the client confident — in roughly that order.
            </p>
          </div>
        </div>
        <div className="stats">
          <div>
            <div className="n">18<span className="tail">y</span></div>
            <div className="lbl">In software</div>
          </div>
          <div>
            <div className="n">7<span className="tail">y</span></div>
            <div className="lbl">Leading teams</div>
          </div>
          <div>
            <div className="n">35<span className="tail">+</span></div>
            <div className="lbl">Tracked skills</div>
          </div>
          <div>
            <div className="n">50<span className="tail">%</span></div>
            <div className="lbl">Deploy time cut</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Experience ----------
function Experience() {
  const D = window.SITE_DATA;
  const [open, setOpen] = useState(0);
  return (
    <section className="experience" id="work">
      <div className="wrap">
        <div className="section-label">
          <span className="num">003</span>
          <span>The Track Record</span>
          <span className="line"></span>
        </div>
        <h2 style={{
          margin: "0 0 36px",
          fontSize: "clamp(34px,5vw,60px)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 0.98,
        }}>
          A career in <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--accent)" }}>shipping things</span>.
        </h2>
        <div className="exp-list">
          {D.experience.map((e, i) => (
            <div
              key={i}
              className="exp-row"
              data-open={open === i ? "true" : "false"}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="yr">{e.period}</div>
              <div className="role">
                {e.role}
                <span className="at">@ {e.company}</span>
              </div>
              <div className="summary">{e.bullets[0]}</div>
              <div className="meta-r">
                {e.tag === "current" && <span className="pill">Now</span>}
                {e.tag === "first job" && <span className="pill first">First</span>}
                {!e.tag && <span>{e.length}</span>}
              </div>
              {open === i && (
                <ul className="bullets">
                  {e.bullets.slice(1).map((b, k) => <li key={k}>{b}</li>)}
                </ul>
              )}
              <span className="toggle">— Collapse</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.SiteParts = { StatusBar, Hero, About, Experience };
