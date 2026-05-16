import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { V2Shell, V2Sidebar, V2Status } from "./components/shell.jsx";
import { V2Hero, V2Readme, V2Experience } from "./components/parts1.jsx";
import { V2Skills, V2Projects, V2Contact } from "./components/parts2.jsx";
import "./styles.css";

function App() {
  const [active, setActive] = useState("hero");

  // Sync active tab to the pane most-in-view
  useEffect(() => {
    const ids = ["hero","readme","work","skills","projects","contact"];
    const els = ids.map(id => document.getElementById(`pane-${id}`)).filter(Boolean);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActive(visible.target.id.replace("pane-", ""));
      }
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75] });
    els.forEach(e => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  // `/` to focus the grep input on the skills pane
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        const el = document.querySelector(".v2-grep input");
        if (el) { e.preventDefault(); el.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="v2-shell">
      <V2Shell active={active} setActive={setActive} />
      <div className="v2-body">
        <V2Sidebar active={active} setActive={setActive} />
        <main className="v2-main">
          <V2Hero />
          <V2Readme />
          <V2Experience />
          <V2Skills />
          <V2Projects />
          <V2Contact />
        </main>
      </div>
      <V2Status active={active} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
