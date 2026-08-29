/* v5 Terminal Lime — parts 2: Skills, Projects, References, Off-clock, Contact, App + parallax */
import React, { useState, useEffect } from "react";
import { SITE_DATA } from "../data.js";
import { Nav, Hero, Marquee, About, Experience, Leadership, V5_SECTIONS, V5_tidy } from "./parts1.jsx";
const D = SITE_DATA;
const tidy = V5_tidy;
const tidyRange = (s) => (typeof s === "string" ? s.replace(/\s*—\s*/g, " – ") : s);

const CAT_ORDER = [
  "Architecture", "Frontend", "Backend", "CMS / DAM", "Cloud & Infrastructure",
  "DevOps & Tooling", "Data & Analytics", "CDP & Personalization",
  "Security & Compliance", "AI & Machine Learning", "Testing & QA",
  "Healthcare", "Game Dev / Hobby",
];

function Skills() {
  const groups = {};
  (D.skills || []).forEach((s) => { (groups[s.cat] = groups[s.cat] || []).push(s); });
  const cats = Object.keys(groups).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  cats.forEach((c) => groups[c].sort((a, b) => b.rating - a.rating));

  return (
    <section className="v5-band alt" id="skills">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">04</span> Capabilities</div>
        <h2 className="v5-h2 v5-rev" style={{ marginBottom: 14 }}>A full-stack toolkit, kept sharp.</h2>
        <p className="v5-lede v5-rev" style={{ marginBottom: 40 }}>
          {(D.skills || []).length} skills across the stack — Adobe Experience
          Cloud, enterprise CMS, front and back end, cloud and CI/CD. Bars show
          depth, the year is when each was last used in earnest.
        </p>
        <div className="v5-skills">
          {cats.map((cat) => (
            <div className="v5-skcat v5-rev" key={cat}>
              <div className="v5-skcat-h">
                <span className="v5-skcat-name">{cat}</span>
                <span className="v5-skcat-ct">{String(groups[cat].length).padStart(2, "0")}</span>
              </div>
              {groups[cat].map((s, i) => (
                <div className="v5-skrow" key={i}>
                  <span className="v5-sk-name">{s.skill}</span>
                  <span className="v5-sk-meter">
                    {[1, 2, 3, 4].map((n) => <span key={n} className={"v5-sk-pip" + (n <= s.rating ? " on" : "")} />)}
                    <span className="v5-sk-yr">'{String(s.year).slice(2)}</span>
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

function Projects() {
  return (
    <section className="v5-band" id="work">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">05</span> Selected work</div>
        <h2 className="v5-h2 v5-rev" style={{ marginBottom: 14 }}>Where the engineering shows up.</h2>
        <p className="v5-lede v5-rev" style={{ marginBottom: 40 }}>
          Selected client and personal work — Adobe Experience Cloud
          architecture, enterprise WordPress platforms, and AI-augmented
          developer tooling.
        </p>
        <div className="v5-proj">
          {(D.projects || []).map((p, i) => (
            <article className="v5-card v5-rev" key={i}>
              <div className="v5-card-kind">{p.kind}</div>
              <h3 className="v5-card-title">{p.title}</h3>
              <p className="v5-card-blurb">{tidy(p.blurb)}</p>
              <div className="v5-card-stack">
                {p.stack.map((t, j) => <span className="v5-chip" key={j}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function References() {
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
  return (
    <section className="v5-band alt" id="references">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">06</span> References</div>
        <h2 className="v5-h2 v5-rev" style={{ marginBottom: 10 }}>In their words.</h2>
        <div className="v5-refs">
          {(D.testimonials || []).map((t, i) => (
            <figure className="v5-quote v5-rev" key={i}>
              <div className="v5-quote-mark">&ldquo;</div>
              <blockquote className="v5-quote-body">{tidy(t.quote)}</blockquote>
              <figcaption className="v5-quote-foot">
                <span className="v5-quote-seal">{initials(t.name)}</span>
                <span>
                  <span className="v5-quote-name">{t.name}</span>
                  <span className="v5-quote-title">{t.title}</span>
                </span>
                <span className="v5-quote-rel">{t.rel}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="v5-rev" style={{ marginTop: 44 }}>
          <div className="v5-kicker"><span className="ix">07</span> Off the clock</div>
          <div className="v5-otc">
            {(D.hobbies || []).map((h, i) => (
              <span className="v5-otc-item" key={i}><span className="sq" /><b>{h.name}</b> · {h.tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { k: "Email", v: D.email, href: "mailto:" + D.email },
    { k: "Phone", v: D.phone, href: "tel:" + (D.phone || "").replace(/\./g, "") },
    { k: "LinkedIn", v: "in/evan-borden", href: D.linkedin, ext: true },
  ];
  return (
    <section className="v5-band v5-contact-band" id="contact">
      <div className="v5-inner">
        <div className="v5-kicker v5-rev"><span className="ix">08</span> Contact</div>
        <div className="v5-contact">
          <div className="v5-rev">
            <h2 className="v5-contact-h">Let's build something <span className="hl">serious</span>.</h2>
            <p className="v5-contact-sub">
              Open to senior engineering leadership roles — Engineering Manager,
              Director of Engineering, Technical Director or Solutions Architect.
              Based in Charlotte, NC, partnering across US, India and Costa Rica
              time zones. Happy to talk through what you're building.
            </p>
            <a className="v5-btn v5-btn-primary" href={"mailto:" + (D.email || "")}>Start a conversation <span className="arr">↗</span></a>
          </div>
          <div className="v5-rev">
            <div className="v5-clinks">
              {links.map((l, i) => (
                <a className="v5-clink" key={i} href={l.href} target={l.ext ? "_blank" : undefined} rel="noreferrer">
                  <span className="v5-clink-k">{l.k}</span>
                  <span className="v5-clink-v">{l.v}</span>
                  <span className="v5-clink-arr">↗</span>
                </a>
              ))}
            </div>
            <div className="v5-edu">
              <div className="v5-edu-h">Education</div>
              {(D.education || []).map((e, i) => (
                <div className="v5-edu-item" key={i}>
                  <div className="v5-edu-school">{e.school}</div>
                  <div className="v5-edu-deg">{tidy(e.degree)}</div>
                  <div className="v5-edu-yrs">{tidyRange(e.years)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="v5-foot">
        <span suppressHydrationWarning>© {new Date().getFullYear()} Evan Borden · Charlotte, NC</span>
        <a className="v5-foot-top" href="#top">↑ Back to top</a>
      </div>
    </section>
  );
}

/* ---- App + scroll-spy + parallax ---- */
function App() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const els = document.querySelectorAll(".v5-rev");
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ids = (V5_SECTIONS || []).map((s) => s.id);
    const onScroll = () => {
      const mid = window.innerHeight * 0.34;
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= mid) cur = id; }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Nav active={active} />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Leadership />
      <Skills />
      <Projects />
      <References />
      <Contact />
    </React.Fragment>
  );
}

/* parallax: pointer (--mx/--my) + scroll (--sy) on the hero frame */
function initParallax() {
  const frame = document.querySelector(".v5");
  const col = document.querySelector("[data-px-col]");
  if (!frame || !col) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  let raf = 0, mx = 0, my = 0, sy = 0, tmx = 0, tmy = 0;
  const loop = () => {
    raf = 0;
    mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
    frame.style.setProperty("--mx", mx.toFixed(4));
    frame.style.setProperty("--my", my.toFixed(4));
    if (Math.abs(tmx - mx) > 0.001 || Math.abs(tmy - my) > 0.001) kick();
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  col.addEventListener("pointermove", (e) => {
    const r = col.getBoundingClientRect();
    tmx = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
    tmy = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
    kick();
  }, { passive: true });
  col.addEventListener("pointerleave", () => { tmx = 0; tmy = 0; kick(); });
  const onScroll = () => {
    const r = col.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    sy = Math.max(0, -r.top) * 0.12;
    frame.style.setProperty("--sy", sy.toFixed(1) + "px");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

export { App, initParallax };
