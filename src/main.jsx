/* ============================================================
   v3 "Field Map" — world / camera system, HUD, compass, shell
   ============================================================ */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import * as R1 from "./components/rooms1.jsx";
import * as R2 from "./components/rooms2.jsx";
import { SITE_DATA } from "./data.js";
import "./styles.css";
const D = SITE_DATA;

  /* room layout in world coordinates (cx,cy = panel center) */
  const ROOMS = [
    { id: "trailhead",  label: "Trailhead",    code: "00", cx: 800,  cy: 800,  w: 760, h: 480 },
    { id: "leadership", label: "Leadership",    code: "01", cx: 2200, cy: 800,  w: 860, h: 600 },
    { id: "work",       label: "The Work",      code: "02", cx: 3600, cy: 800,  w: 780, h: 880 },
    { id: "kit",        label: "The Kit",       code: "03", cx: 3600, cy: 2100, w: 820, h: 880 },
    { id: "builds",     label: "Builds",        code: "04", cx: 2200, cy: 2100, w: 780, h: 780 },
    { id: "offclock",   label: "Off the Clock", code: "05", cx: 800,  cy: 2100, w: 900, h: 980 },
    { id: "references", label: "References",    code: "06", cx: 800,  cy: 3400, w: 820, h: 640 },
    { id: "findme",     label: "Find Me",       code: "07", cx: 2200, cy: 3400, w: 700, h: 520 },
  ];
  const BY_ID = Object.fromEntries(ROOMS.map((r) => [r.id, r]));

  const TITLES = {
    leadership: <span><em>Leadership</em></span>,
    work:     <span>The <em>Work</em></span>,
    kit:      <span>The <em>Kit</em></span>,
    builds:   <span><em>Builds</em></span>,
    offclock: <span>Off the <em>Clock</em></span>,
    references: <span><em>References</em></span>,
    findme:   <span>Find <em>Me</em></span>,
  };

  /* faux geo coordinate from world position (centered near Charlotte 35.2,-80.8) */
  function coordOf(cx, cy) {
    const lat = (35.45 - cy / 4200).toFixed(3);
    const lon = (-80.55 - cx / 4200).toFixed(3);
    return `${lat}°N ${Math.abs(lon).toFixed(3)}°W`;
  }

  /* world bounds (for minimap + overview) */
  const BOUNDS = (() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    ROOMS.forEach((r) => {
      minX = Math.min(minX, r.cx - r.w / 2);
      maxX = Math.max(maxX, r.cx + r.w / 2);
      minY = Math.min(minY, r.cy - r.h / 2);
      maxY = Math.max(maxY, r.cy + r.h / 2);
    });
    const pad = 260;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2,
             cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  })();

  /* ============================================================
     APP
     ============================================================ */
  function V3App() {
    const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
    const [cam, setCam] = useState(() => ({ x: BY_ID.trailhead.cx, y: BY_ID.trailhead.cy, zoom: 1 }));
    const [animate, setAnimate] = useState(true);
    const [overview, setOverview] = useState(false);
    const [clock, setClock] = useState("");
    const [intro, setIntro] = useState(true);

    const camRef = useRef(cam);
    camRef.current = cam;
    const drag = useRef({ active: false, moved: false, sx: 0, sy: 0, cx: 0, cy: 0 });

    /* mobile mode: below this width we abandon the pannable canvas for a native
       vertical scroll, since drag-to-roam + fixed-size panels don't work on a phone. */
    const isMobile = vp.w <= 760;
    const mobileRef = useRef(isMobile);
    mobileRef.current = isMobile;
    const [mActive, setMActive] = useState("trailhead");

    /* viewport size */
    useEffect(() => {
      const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    /* live Charlotte clock */
    useEffect(() => {
      const tick = () => {
        try {
          setClock(new Intl.DateTimeFormat("en-US", {
            hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/New_York",
          }).format(new Date()));
        } catch (e) { setClock("--:--"); }
      };
      tick();
      const t = setInterval(tick, 1000 * 15);
      return () => clearInterval(t);
    }, []);

    /* intro fade */
    useEffect(() => {
      const restore = (() => { try { return localStorage.getItem("v3-room"); } catch (e) { return null; } })();
      const t1 = setTimeout(() => {
        if (restore && BY_ID[restore] && restore !== "trailhead") travel(restore, false);
      }, 350);
      const t2 = setTimeout(() => setIntro(false), 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []); // eslint-disable-line

    /* fit-to-screen zoom for overview */
    const overviewZoom = useMemo(() => {
      return Math.min(vp.w / BOUNDS.w, vp.h / BOUNDS.h) * 0.92;
    }, [vp]);

    const travel = useCallback((id, persist = true) => {
      if (mobileRef.current) {
        const el = document.getElementById("room-" + id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      } else {
        const r = BY_ID[id];
        if (!r) return;
        setOverview(false);
        setAnimate(true);
        setCam({ x: r.cx, y: r.cy, zoom: 1 });
      }
      if (persist) { try { localStorage.setItem("v3-room", id); } catch (e) {} }
    }, []);

    const toggleOverview = useCallback(() => {
      setAnimate(true);
      setOverview((ov) => {
        if (ov) { const r = BY_ID[activeRef.current] || BY_ID.trailhead; setCam({ x: r.cx, y: r.cy, zoom: 1 }); return false; }
        setCam({ x: BOUNDS.cx, y: BOUNDS.cy, zoom: overviewZoom });
        return true;
      });
    }, [overviewZoom]);

    /* active room = nearest center to camera */
    const active = useMemo(() => {
      let best = ROOMS[0].id, bd = Infinity;
      ROOMS.forEach((r) => {
        const d = (r.cx - cam.x) ** 2 + (r.cy - cam.y) ** 2;
        if (d < bd) { bd = d; best = r.id; }
      });
      return best;
    }, [cam]);
    const activeRef = useRef(active);
    activeRef.current = active;

    /* keep the active waypoint pill in view within the scrollable dock (mobile) */
    const dockRef = useRef(null);
    useEffect(() => {
      const dock = dockRef.current;
      if (!dock) return;
      const btn = dock.querySelector('[aria-current="true"]');
      if (!btn) return;
      const target = btn.offsetLeft - dock.clientWidth / 2 + btn.offsetWidth / 2;
      dock.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }, [active, mActive]);

    /* mobile: reflect body scroll state + track the section in view for the dock */
    useEffect(() => {
      document.body.classList.toggle("is-mobile", isMobile);
      return () => document.body.classList.remove("is-mobile");
    }, [isMobile]);

    useEffect(() => {
      if (!isMobile || !("IntersectionObserver" in window)) return;
      const els = ROOMS.map((r) => document.getElementById("room-" + r.id)).filter(Boolean);
      if (!els.length) return;
      const obs = new IntersectionObserver((entries) => {
        const vis = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setMActive(vis.target.id.replace("room-", ""));
      }, { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] });
      els.forEach((e) => obs.observe(e));
      return () => obs.disconnect();
    }, [isMobile]);

    /* keyboard: arrows/WASD roam, 0-5 travel, o overview, / search */
    useEffect(() => {
      const onKey = (e) => {
        const tag = document.activeElement && document.activeElement.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") {
          if (e.key === "Escape") document.activeElement.blur();
          return;
        }
        if (e.key === "/") {
          const el = document.querySelector(".v3-grep input");
          if (el) { e.preventDefault(); travel("kit"); setTimeout(() => el.focus(), 400); }
          return;
        }
        if (e.key === "o" || e.key === "O") { e.preventDefault(); toggleOverview(); return; }
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 0 && num < ROOMS.length) { travel(ROOMS[num].id); return; }
        const step = 240 / camRef.current.zoom;
        let dx = 0, dy = 0;
        if (e.key === "ArrowLeft" || e.key === "a") dx = -step;
        else if (e.key === "ArrowRight" || e.key === "d") dx = step;
        else if (e.key === "ArrowUp" || e.key === "w") dy = -step;
        else if (e.key === "ArrowDown" || e.key === "s") dy = step;
        else return;
        e.preventDefault();
        setAnimate(true);
        setOverview(false);
        setCam((c) => ({ ...c, x: c.x + dx, y: c.y + dy }));
      };
      if (mobileRef.current) return;
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [travel, toggleOverview, isMobile]);

    /* drag to pan — capture only once an actual drag begins, so clicks on links/buttons work */
    const onPointerDown = (e) => {
      if (intro) setIntro(false);
      drag.current.moved = false;
      if (e.target.closest("input, textarea, a, button")) { drag.current.active = false; return; }
      drag.current = { active: true, moved: false, sx: e.clientX, sy: e.clientY, cx: camRef.current.x, cy: camRef.current.y, id: e.pointerId };
    };
    const onPointerMove = (e) => {
      const dg = drag.current;
      if (!dg.active) return;
      const ddx = e.clientX - dg.sx, ddy = e.clientY - dg.sy;
      if (!dg.moved && Math.hypot(ddx, ddy) < 6) return;
      if (!dg.moved) {
        dg.moved = true;
        setAnimate(false);
        try { e.currentTarget.setPointerCapture(dg.id); } catch (_) {}
      }
      const z = camRef.current.zoom;
      setCam((c) => ({ ...c, x: dg.cx - ddx / z, y: dg.cy - ddy / z }));
    };
    const endPointer = (e) => {
      if (drag.current.moved) setOverview(false);
      drag.current.active = false;
    };
    const onClickCapture = (e) => {
      if (drag.current.moved) { e.stopPropagation(); e.preventDefault(); }
    };

    /* world transform (desktop only) */
    const worldStyle = {
      transform: `translate(${vp.w / 2}px, ${vp.h / 2}px) scale(${cam.zoom}) translate(${-cam.x}px, ${-cam.y}px)`,
    };
    const topoStyle = { transform: `translate(${-cam.x * 0.25}px, ${-cam.y * 0.25}px)` };
    const topoHiStyle = { transform: `translate(${-cam.x * 0.12}px, ${-cam.y * 0.12}px)` };

    const dockActive = isMobile ? mActive : active;

    const roomHead = (r) => (r.id !== "trailhead" ? (
      <div className="v3-room-head">
        <span className="code">{r.code}</span>
        <span className="title">{TITLES[r.id]}</span>
        <span className="coord">{coordOf(r.cx, r.cy)}</span>
      </div>
    ) : null);

    const hud = (
      <div className="v3-hud">
        <div className="v3-topbar">
          <div className="v3-brand">
            <div className="seal">E</div>
            <div className="who">
              <div className="n">Evan Borden</div>
              <div className="r">Manager · Engineering</div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="v3-readout">
            <span className="seg live">LIVE</span>
            <span className="seg"><span className="lbl">CLT</span> {clock}</span>
            <span className="div"></span>
            <span className="seg"><span className="lbl">POS</span> {coordOf(cam.x, cam.y)}</span>
          </div>
          <div className="v3-versions">
            <a href="/v1/" title="v1 — Editorial Dark">v1</a>
            <a href="/v2/" title="v2 — Personal Cockpit">v2</a>
            <span className="cur" title="v3 — Field Map">v3</span>
          </div>
        </div>

        <nav className="v3-dock" ref={dockRef}>
          {ROOMS.map((r) => (
            <button key={r.id} className="v3-wp" aria-current={dockActive === r.id ? "true" : "false"} onClick={() => travel(r.id)}>
              <span className="idx">{r.code}</span>{r.label}
            </button>
          ))}
        </nav>

        <div className="v3-hint">
          <kbd>drag</kbd> to roam · <kbd>↑↓←→</kbd> / <kbd>WASD</kbd> to move<br />
          <kbd>0</kbd>–<kbd>7</kbd> jump · <kbd>O</kbd> overview
        </div>

        {!isMobile && (
          <Mini cam={cam} vp={vp} active={active} overview={overview}
            onNode={travel} onToggle={toggleOverview} />
        )}
      </div>
    );

    const introEl = (
      <div className={"v3-intro" + (intro ? "" : " gone")}>
        <div className="inner">
          <div className="compass-mark"></div>
          <div className="label">plotting the map…</div>
        </div>
      </div>
    );

    /* ---- mobile: native vertical scroll ---- */
    if (isMobile) {
      return (
        <div className="v3-stage is-mobile">
          <div className="v3-topo"></div>
          <div className="v3-topo hi"></div>
          <div className="v3-scroll">
            {ROOMS.map((r) => (
              <section
                key={r.id}
                id={"room-" + r.id}
                className={"v3-room v3-" + r.id + (dockActive === r.id ? " focused" : "")}
              >
                {roomHead(r)}
                <RoomBody id={r.id} travel={travel} />
              </section>
            ))}
          </div>
          {hud}
          {introEl}
        </div>
      );
    }

    /* ---- desktop: pannable canvas ---- */
    return (
      <div className="v3-stage">
        <div className="v3-topo" style={topoStyle}></div>
        <div className="v3-topo hi" style={topoHiStyle}></div>

        <div
          className={"v3-viewport" + (drag.current.active && drag.current.moved ? " dragging" : "")}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onClickCapture={onClickCapture}
        >
          <div className={"v3-world" + (animate ? " animate" : "")} style={worldStyle}>
            <Trails />
            {ROOMS.map((r) => (
              <section
                key={r.id}
                id={"room-" + r.id}
                className={"v3-room v3-" + r.id + (active === r.id ? " focused" : "")}
                style={{ left: r.cx, top: r.cy, width: r.w, transform: "translate(-50%, -50%)" }}
              >
                {roomHead(r)}
                <RoomBody id={r.id} travel={travel} />
              </section>
            ))}
          </div>
        </div>

        {hud}
        {introEl}
      </div>
    );
  }

  /* room body switch */
  function RoomBody({ id, travel }) {
    if (id === "trailhead") return <R1.Trailhead onTravel={travel} />;
    if (id === "leadership") return <R1.Leadership />;
    if (id === "work") return <R1.Work />;
    if (id === "kit") return <R1.Kit />;
    if (id === "builds") return <R2.Builds />;
    if (id === "offclock") return <R2.OffClock />;
    if (id === "references") return <R2.References />;
    if (id === "findme") return <R2.FindMe />;
    return null;
  }

  /* trail connectors between waypoints */
  function Trails() {
    const pts = ROOMS.map((r) => `${r.cx},${r.cy}`).join(" ");
    return (
      <svg className="v3-trails" width={BOUNDS.x + BOUNDS.w} height={BOUNDS.y + BOUNDS.h}>
        <polyline className="leg" points={pts} />
        {ROOMS.map((r) => (
          <g key={r.id}>
            <circle className="node" cx={r.cx} cy={r.cy} r="7" />
            <text className="node-label" x={r.cx + 14} y={r.cy - 12}>{r.code}</text>
          </g>
        ))}
      </svg>
    );
  }

  /* minimap / compass */
  function Mini({ cam, vp, active, overview, onNode, onToggle }) {
    const vb = `${BOUNDS.x} ${BOUNDS.y} ${BOUNDS.w} ${BOUNDS.h}`;
    const viewW = vp.w / cam.zoom, viewH = vp.h / cam.zoom;
    const links = ROOMS.map((r) => `${r.cx},${r.cy}`).join(" ");
    return (
      <div className="v3-mini">
        <div className="mhead">
          <span>Compass</span>
          <span className="n">{(BY_ID[active] || {}).label}</span>
        </div>
        <div className="map">
          <svg viewBox={vb} preserveAspectRatio="xMidYMid meet">
            <polyline className="mlink" points={links} />
            <rect className="mview" x={cam.x - viewW / 2} y={cam.y - viewH / 2} width={viewW} height={viewH} rx="40" />
            {ROOMS.map((r) => (
              <circle key={r.id} className={"mnode" + (active === r.id ? " cur" : "")}
                cx={r.cx} cy={r.cy} r={active === r.id ? 60 : 42}
                onClick={() => onNode(r.id)} />
            ))}
          </svg>
        </div>
        <div className="mctrl">
          <button className={overview ? "on" : ""} onClick={onToggle}>{overview ? "exit map" : "overview"}</button>
          <button onClick={() => onNode("trailhead")}>re-center</button>
        </div>
      </div>
    );
  }

ReactDOM.createRoot(document.getElementById("root")).render(<V3App />);
