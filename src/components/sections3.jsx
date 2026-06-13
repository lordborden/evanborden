/* v4 — References, Off-the-clock, Contact, Tweaks panel, App assembly */
import React, { useState, useEffect, useCallback } from "react";
import { SITE_DATA } from "../data.js";
import { useReveal, tidyProse, tidyRange, Icon, Nav, Hero, About, Experience } from "./sections1.jsx";
import { Leadership, Skills, Projects } from "./sections2.jsx";

/* ---- References ---- */
function References({ data }) {
  const initials = (n) =>
    n.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <section className="v4-section" id="references">
      <div className="v4-wrap">
        <div className="v4-xp-head v4-reveal">
          <div>
            <p className="v4-eyebrow">References</p>
            <h2 className="v4-h2">In their words.</h2>
          </div>
          <p className="v4-lede" style={{ maxWidth: "34ch" }}>
            Endorsements from the program managers and peers who've shipped
            alongside me.
          </p>
        </div>
        <div className="v4-refs-grid">
          {data.testimonials.map((t, i) => (
            <figure className="v4-quote v4-reveal" key={i}>
              <div className="v4-quote-mark">&ldquo;</div>
              <blockquote className="v4-quote-body">{tidyProse(t.quote)}</blockquote>
              <figcaption className="v4-quote-foot">
                <span className="v4-quote-avatar">{initials(t.name)}</span>
                <span>
                  <span className="v4-quote-name">{t.name}</span>
                  <span className="v4-quote-title">{t.title}</span>
                </span>
                <span className="v4-quote-rel">{t.rel}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="v4-reveal" style={{ marginTop: "var(--gutter)" }}>
          <p className="v4-eyebrow" style={{ marginTop: 40 }}>Off the clock</p>
          <div className="v4-otc">
            {data.hobbies.map((h, i) => (
              <span className="v4-otc-item" key={i}>
                <span className="v4-otc-dot" />
                <b>{h.name}</b>&nbsp;· {h.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Contact + Footer ---- */
function Contact({ data }) {
  const links = [
    { k: "Email", v: data.email, href: "mailto:" + data.email },
    { k: "Phone", v: data.phone, href: "tel:" + data.phone.replace(/\./g, "") },
    { k: "LinkedIn", v: "in/evan-borden", href: data.linkedin },
  ];
  return (
    <section className="v4-section v4-contact" id="contact">
      <div className="v4-wrap">
        <div className="v4-contact-grid">
          <div className="v4-reveal">
            <p className="v4-eyebrow">Contact</p>
            <h2 className="v4-contact-h">Let's build something solid.</h2>
            <p className="v4-contact-sub">
              Open to senior engineering leadership roles. Based in Charlotte and
              partnering with teams across time zones, happy to talk through
              what you're building.
            </p>
            <a className="v4-btn v4-btn-primary" href={"mailto:" + data.email}>
              <Icon.mail /> Start a conversation
            </a>
          </div>
          <div className="v4-reveal">
            <div className="v4-contact-links">
              {links.map((l, i) => (
                <a
                  className="v4-clink"
                  key={i}
                  href={l.href}
                  target={l.k === "LinkedIn" ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <span className="v4-clink-k">{l.k}</span>
                  <span className="v4-clink-v">{l.v}</span>
                  <Icon.arrow className="v4-clink-arrow" style={{ width: 15, height: 15 }} />
                </a>
              ))}
            </div>
            <div className="v4-edu">
              <div className="v4-edu-h">Education</div>
              {data.education.map((e, i) => (
                <div className="v4-edu-item" key={i}>
                  <div className="v4-edu-school">{e.school}</div>
                  <div className="v4-edu-deg">{tidyProse(e.degree)}</div>
                  <div className="v4-edu-yrs">{tidyRange(e.years)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="v4-foot">
        <div className="v4-foot-inner">
          <span>© {new Date().getFullYear()} Evan Borden · Charlotte, NC</span>
          <span className="v4-foot-vers">
            <a href="/v1/">v1</a>
            <a href="/v2/">v2</a>
            <a href="/v3/">v3</a>
            <span style={{ color: "var(--accent-bright)" }}>v4 · current</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---- Tweaks panel ---- */
const V4_ACCENTS = {
  cobalt:   { base: "#2c4ca8", bright: "#6e8cea" },
  forest:   { base: "#2f6d52", bright: "#5fb98e" },
  clay:     { base: "#a85738", bright: "#d98a63" },
  graphite: { base: "#4a4f57", bright: "#9aa0a7" },
};

function Tweaks({ open, onClose, t, set }) {
  return (
    <div className={"v4-tweaks" + (open ? " is-open" : "")}>
      <div className="v4-tweaks-h">
        <span>Tweaks</span>
        <button className="v4-tweaks-x" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="v4-tw-group">
        <div className="v4-tw-label">Theme</div>
        <div className="v4-tw-seg">
          {["light", "dark"].map((m) => (
            <button key={m} className={t.theme === m ? "on" : ""} onClick={() => set({ theme: m })}>{m}</button>
          ))}
        </div>
      </div>

      <div className="v4-tw-group">
        <div className="v4-tw-label">Accent</div>
        <div className="v4-tw-swatches">
          {Object.entries(V4_ACCENTS).map(([k, v]) => (
            <button
              key={k}
              className={"v4-sw" + (t.accent === k ? " on" : "")}
              style={{ background: v.base }}
              onClick={() => set({ accent: k })}
              aria-label={k}
              title={k}
            />
          ))}
        </div>
      </div>

      <div className="v4-tw-group">
        <div className="v4-tw-label">Typography</div>
        <div className="v4-tw-seg">
          {[["editorial", "Editorial"], ["modern", "Modern"], ["classic", "Classic"]].map(([k, lbl]) => (
            <button key={k} className={t.fonts === k ? "on" : ""} onClick={() => set({ fonts: k })}>{lbl}</button>
          ))}
        </div>
      </div>

      <div className="v4-tw-group" style={{ marginBottom: 0 }}>
        <div className="v4-tw-label">Density</div>
        <div className="v4-tw-seg">
          {["cozy", "compact"].map((d) => (
            <button key={d} className={t.density === d ? "on" : ""} onClick={() => set({ density: d })}>{d}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- App ---- */
function V4App() {
  const data = SITE_DATA;
  const [t, setT] = useState(() => ({ ...window.V4_TWEAKS }));
  const [panelOpen, setPanelOpen] = useState(false);
  const [active, setActive] = useState("about");

  useReveal();

  const sections = [
    { id: "experience", label: "Experience" },
    { id: "leadership", label: "Leadership" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "references", label: "References" },
    { id: "contact", label: "Contact" },
  ];

  /* apply tweaks to <body class="v4"> */
  useEffect(() => {
    const el = document.body;
    el.setAttribute("data-theme", t.theme);
    el.setAttribute("data-fonts", t.fonts);
    el.setAttribute("data-density", t.density);
    const a = V4_ACCENTS[t.accent] || V4_ACCENTS.cobalt;
    el.style.setProperty("--accent", a.base);
    el.style.setProperty("--accent-bright", a.bright);
  }, [t]);

  const set = useCallback((edits) => {
    setT((prev) => {
      const next = { ...prev, ...edits };
      try {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
      } catch (e) {}
      return next;
    });
  }, []);

  /* host tweaks protocol */
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setPanelOpen(true);
      else if (d.type === "__deactivate_edit_mode") setPanelOpen(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
  }, []);

  /* scroll spy */
  useEffect(() => {
    const ids = ["about", ...sections.map((s) => s.id)];
    const onScroll = () => {
      const mid = window.innerHeight * 0.32;
      let cur = "about";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <Nav data={data} sections={sections} active={active} />
      <Hero data={data} />
      <About data={data} />
      <Experience data={data} />
      <Leadership data={data} />
      <Skills data={data} />
      <Projects data={data} />
      <References data={data} />
      <Contact data={data} />
      <Tweaks open={panelOpen} onClose={closePanel} t={t} set={set} />
    </React.Fragment>
  );
}

export { V4App };
