import React, { useState, useEffect } from "react";
import { SITE_DATA } from "../data.js";

// ============================================================
// SHELL — tabs, sidebar, status bar, pane head
// Used by main.jsx
// ============================================================
export const FILES = [
  { id: "hero",     name: "whoami",     ext: "sh",    ico: "❯_", group: "Identity" },
  { id: "readme",   name: "README",     ext: "md",    ico: "▤",  group: "Identity" },
  { id: "work",     name: "experience", ext: "jsonl", ico: "{}", group: "Career" },
  { id: "skills",   name: "skills",     ext: "tsv",   ico: "▤",  group: "Career" },
  { id: "projects", name: "projects",   ext: "md",    ico: "▤",  group: "Career" },
  { id: "contact",  name: "contact",    ext: "sh",    ico: "❯_", group: "Reach" },
];

export function V2Shell({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const current = FILES.find(f => f.id === active) || FILES[0];

  // close drawer on resize back to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePick = (id) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(`pane-${id}`)?.scrollIntoView({ block: "start" });
  };

  return (
    <header className="v2-tabs">
      <div className="traffic" aria-hidden="true">
        <i></i><i></i><i></i>
      </div>

      {/* desktop tabs */}
      <div className="v2-tabs-row">
        {FILES.map(f => (
          <button
            key={f.id}
            className="v2-tab"
            aria-current={active === f.id ? "true" : "false"}
            onClick={() => handlePick(f.id)}
          >
            <span className="ico">{f.ico}</span>
            <span>{f.name}.{f.ext}</span>
            <span className="x">×</span>
          </button>
        ))}
      </div>

      {/* mobile: current pane label + menu button */}
      <button
        className="v2-tab v2-tab-current"
        aria-current="true"
        aria-label="Current pane"
        onClick={() => setMenuOpen(true)}
      >
        <span className="ico">{current.ico}</span>
        <span>{current.name}.{current.ext}</span>
      </button>
      <button
        className="v2-menu-btn"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen ? "true" : "false"}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span></span><span></span><span></span>
      </button>

      <div className="spacer"></div>
      <div className="right">
        <span className="live">connected</span>
        <span className="dot">·</span>
        <span>main</span>
        <span className="dot">·</span>
        <span>v2.0</span>
      </div>

      {/* mobile drawer */}
      {menuOpen && (
        <div className="v2-drawer-scrim" onClick={() => setMenuOpen(false)}>
          <nav className="v2-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="v2-drawer-hdr">
              <span>~/evanborden</span>
              <button
                className="v2-drawer-x"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >×</button>
            </div>
            {["Identity", "Career", "Reach"].map(g => (
              <div className="v2-drawer-group" key={g}>
                <div className="v2-drawer-label">{g.toLowerCase()}/</div>
                {FILES.filter(f => f.group === g).map(f => (
                  <button
                    key={f.id}
                    className="v2-drawer-item"
                    aria-current={active === f.id ? "true" : "false"}
                    onClick={() => handlePick(f.id)}
                  >
                    <span className="ico">{f.ico}</span>
                    <span>{f.name}.{f.ext}</span>
                  </button>
                ))}
              </div>
            ))}
            <div className="v2-drawer-group">
              <div className="v2-drawer-label">archive/</div>
              <a className="v2-drawer-item" href="/v1/">
                <span className="ico">▤</span>
                <span>v1-editorial.html</span>
                <span style={{ marginLeft: "auto", color: "var(--v2-ink-faint)" }}>↗</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function V2Sidebar({ active, setActive }) {
  const groups = ["Identity", "Career", "Reach"];
  return (
    <aside className="v2-side">
      <div className="hdr">
        <span>~/evanborden</span>
        <span>main</span>
      </div>
      {groups.map(g => (
        <div className="group" key={g}>
          <div className="label">
            <span className="chev">▾</span>
            <span>{g.toLowerCase()}/</span>
          </div>
          {FILES.filter(f => f.group === g).map(f => (
            <div
              key={f.id}
              className="item"
              aria-current={active === f.id ? "true" : "false"}
              onClick={() => {
                setActive(f.id);
                document.getElementById(`pane-${f.id}`)?.scrollIntoView({ block: "start" });
              }}
            >
              <span className="ico">{f.ico}</span>
              <span>{f.name}.{f.ext}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="hdr" style={{ marginTop: 20 }}>
        <span>ARCHIVE</span>
      </div>
      <a
        className="item"
        href="/v1/"
        style={{ paddingLeft: 36 }}
        title="Open the v1 editorial design"
      >
        <span className="ico">▤</span>
        <span>v1-editorial.html</span>
        <span className="ct">↗</span>
      </a>

      <div className="hdr" style={{ marginTop: 20 }}>
        <span>SYSTEM</span>
      </div>
      <div className="item" style={{ paddingLeft: 16, cursor: "default" }}>
        <span style={{ color: "var(--v2-ink-faint)" }}>uptime</span>
        <span style={{ marginLeft: "auto", color: "var(--v2-ink-soft)" }}>18y 0d</span>
      </div>
      <div className="item" style={{ paddingLeft: 16, cursor: "default" }}>
        <span style={{ color: "var(--v2-ink-faint)" }}>memory</span>
        <span style={{ marginLeft: "auto", color: "var(--v2-ink-soft)" }}>good</span>
      </div>
      <div className="item" style={{ paddingLeft: 16, cursor: "default" }}>
        <span style={{ color: "var(--v2-ink-faint)" }}>mood</span>
        <span style={{ marginLeft: "auto", color: "var(--v2-mint)" }}>shipping</span>
      </div>
    </aside>
  );
}

export function V2Status({ active }) {
  const file = FILES.find(f => f.id === active) || FILES[0];
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit", minute: "2-digit", hour12: false,
      });
      setTime(fmt.format(new Date()));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="v2-status">
      <span className="seg mint"><i className="sw"></i> READY</span>
      <span className="seg">main</span>
      <span className="seg">utf-8</span>
      <span className="seg">{file.name}.{file.ext}</span>
      <span className="spacer"></span>
      <span className="seg"><a href="/v1/" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "var(--v2-ink-faint)" }}>v1 ↗</a></span>
      <span className="seg">Charlotte, NC</span>
      <span className="seg">{time} EST</span>
      <span className="seg amber"><i className="sw"></i> open</span>
    </footer>
  );
}

export function PaneHead({ path, file, lang, keyHint }) {
  return (
    <div className="v2-pane-head">
      <div className="crumb">
        <span>{path}</span>
        <span className="slash">/</span>
        <span className="file">{file}</span>
        {lang && <span style={{ marginLeft: 10, color: "var(--v2-mint)" }}>· {lang}</span>}
      </div>
      <div className="actions">
        {keyHint && <span><span className="key">⌘</span> <span className="key">{keyHint}</span></span>}
      </div>
    </div>
  );
}
