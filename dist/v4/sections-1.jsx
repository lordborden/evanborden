/* v4 — shared helpers + Nav, Hero (Three.js), About, Experience */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- copy tidiers (v4-scoped: keeps shared data.js untouched) ---- */
function tidyProse(s) {
  return typeof s === "string" ? s.replace(/\s*—\s*/g, ", ") : s;
}
function tidyRange(s) {
  return typeof s === "string" ? s.replace(/\s*—\s*/g, " \u2013 ") : s;
}

/* ---- scroll reveal hook ---- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".v4-reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
}

/* small svg icons */
const Icon = {
  arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  ),
  download: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  ),
};

/* ---- Three.js wireframe behind the hero ---- */
function useHero3D(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const THREE = window.THREE;
    if (!canvas || !THREE) return;
    const host = canvas.parentElement;
    let raf = 0, running = true;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 6.4);

    const group = new THREE.Group();
    scene.add(group);

    const readAccent = () => {
      const v = getComputedStyle(document.body).getPropertyValue("--accent-bright").trim() || "#6e8cea";
      try { return new THREE.Color(v); } catch (e) { return new THREE.Color("#6e8cea"); }
    };
    const accent = readAccent();

    const ico = new THREE.IcosahedronGeometry(1.78, 1);
    const edges = new THREE.EdgesGeometry(ico);
    const lineMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.5 });
    group.add(new THREE.LineSegments(edges, lineMat));

    const solidMat = new THREE.MeshBasicMaterial({ color: 0x0b0d11, transparent: true, opacity: 0.55 });
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.74, 1), solidMat));

    const ptMat = new THREE.PointsMaterial({ color: accent, size: 0.05, transparent: true, opacity: 0.85 });
    group.add(new THREE.Points(ico, ptMat));

    const outerEdges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.62, 1));
    const outerMat = new THREE.LineBasicMaterial({ color: 0x596275, transparent: true, opacity: 0.16 });
    const outer = new THREE.LineSegments(outerEdges, outerMat);
    group.add(outer);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0, tz = 0;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * 0.45;
      tz = px * 0.18;
    };
    if (!reduce) host.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w > 820;
      group.position.x = wide ? 2.55 : 1.15;
      group.position.y = wide ? 0.1 : 2.35;
      const s = wide ? 1 : 0.62;
      group.scale.set(s, s, s);
      outer.visible = wide;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => renderer.render(scene, camera);
    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      group.rotation.y += 0.0016;
      group.rotation.x += (tx - group.rotation.x) * 0.05;
      group.rotation.z += (tz - group.rotation.z) * 0.05;
      outer.rotation.y -= 0.0009;
      render();
    };
    if (reduce) { group.rotation.set(0.5, 0.7, 0); render(); }
    else tick();

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduce && !running) { running = true; tick(); }
    };
    document.addEventListener("visibilitychange", onVis);

    const obs = new MutationObserver(() => {
      const c = readAccent();
      lineMat.color.copy(c);
      ptMat.color.copy(c);
      if (reduce || document.hidden) render();
    });
    obs.observe(document.body, { attributes: true, attributeFilter: ["style", "data-theme"] });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      obs.disconnect();
      ico.dispose(); edges.dispose(); outerEdges.dispose();
      lineMat.dispose(); solidMat.dispose(); ptMat.dispose(); outerMat.dispose();
      renderer.dispose();
    };
  }, []);
}

/* ---- Nav ---- */
function Nav({ data, sections, active }) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav className={"v4-nav" + (stuck ? " is-stuck" : "")}>
      <div className="v4-nav-inner">
        <a className="v4-brand" href="#top">
          <span className="v4-brand-name">Evan Borden</span>
          <span className="v4-brand-dot" />
          <span className="v4-brand-role">Eng. Manager</span>
        </a>
        <div className="v4-navlinks">
          {sections.map((s) => (
            <a
              key={s.id}
              href={"#" + s.id}
              className={"v4-navlink" + (active === s.id ? " is-active" : "")}
            >
              {s.label}
            </a>
          ))}
        </div>
        <a className="v4-nav-cta" href={"mailto:" + data.email}>Get in touch</a>
      </div>
    </nav>
  );
}

/* ---- Hero ---- */
function Hero({ data }) {
  const canvasRef = useRef(null);
  useHero3D(canvasRef);
  return (
    <header className="v4-hero" id="top">
      <canvas className="v4-hero-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="v4-hero-inner">
        <div className="v4-hero-status v4-reveal">
          <span className="v4-status-dot" />
          Open to senior engineering leadership · {data.location}
        </div>
        <h1 className="v4-hero-name v4-reveal">
          Evan <em>Borden</em>
        </h1>
        <p className="v4-hero-tag v4-reveal">
          Hands-on engineering leader who ships software, grows the people who
          write it, and keeps the codebase calm and the client confident.
        </p>
        <div className="v4-hero-cta-row v4-reveal">
          <a className="v4-btn v4-btn-primary" href="#experience">
            View experience <Icon.arrow />
          </a>
          <a className="v4-btn v4-btn-ghost" href={"mailto:" + data.email}>
            <Icon.mail /> {data.email}
          </a>
        </div>
        <div className="v4-hero-meta v4-reveal">
          <div className="v4-hero-stat">
            <span className="v4-hero-stat-v">18 yrs</span>
            <span className="v4-hero-stat-k">In software</span>
          </div>
          <div className="v4-hero-stat">
            <span className="v4-hero-stat-v">7 yrs</span>
            <span className="v4-hero-stat-k">Leading teams</span>
          </div>
          <div className="v4-hero-stat">
            <span className="v4-hero-stat-v">3</span>
            <span className="v4-hero-stat-k">Flagship accounts</span>
          </div>
          <div className="v4-hero-stat">
            <span className="v4-hero-stat-v">10</span>
            <span className="v4-hero-stat-k">Engineers led</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---- About ---- */
function About({ data }) {
  return (
    <section className="v4-section" id="about">
      <div className="v4-wrap">
        <div className="v4-about-grid">
          <div className="v4-about-body v4-reveal">
            <p className="v4-eyebrow">About</p>
            <p>
              Eighteen years building software, seven of them leading the
              engineers who build it. My background runs from enterprise
              WordPress and AEM platforms to modern CI/CD on GitLab and Azure
              DevOps, with ongoing hands-on work bringing AI tooling into real
              engineering workflows.
            </p>
            <p>
              The priorities stay the same at every level: make the team
              faster, the codebase calmer, and the client confident. I lead as
              the{" "}
              <strong>technical lead</strong> across major client accounts:
              setting the engineering bar, placing the right people on the work,
              and getting their contributions seen.
            </p>
            <p>
              Based in <strong>Charlotte, NC</strong>, I partner daily with VP+
              technical leaders and translate engineering reality into decisions
              the business can act on.
            </p>
            <div className="v4-facts">
              <div className="v4-fact">
                <div className="v4-fact-k">Current</div>
                <div className="v4-fact-v">Manager, Engineering · Razorfish</div>
              </div>
              <div className="v4-fact">
                <div className="v4-fact-k">Based in</div>
                <div className="v4-fact-v">Charlotte, North Carolina</div>
              </div>
              <div className="v4-fact">
                <div className="v4-fact-k">Focus</div>
                <div className="v4-fact-v">Web platforms · CMS · Integrations</div>
              </div>
              <div className="v4-fact">
                <div className="v4-fact-k">Hiring reach</div>
                <div className="v4-fact-v">US · India · Costa Rica</div>
              </div>
            </div>
          </div>
          <figure className="v4-figure v4-reveal">
            <div className="v4-figure-frame">
              <img src="/assets/profile.jpeg" alt="Evan Borden" />
            </div>
            <figcaption className="v4-figure-cap">
              <span>Evan Borden</span>
              <span>Charlotte, NC</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---- Experience ---- */
function Experience({ data }) {
  return (
    <section className="v4-section" id="experience">
      <div className="v4-wrap">
        <div className="v4-xp-head v4-reveal">
          <div>
            <p className="v4-eyebrow">Experience</p>
            <h2 className="v4-h2">A career built shipping the hard parts.</h2>
          </div>
          <p className="v4-lede" style={{ maxWidth: "34ch" }}>
            From custom WordPress themes to multi-year enterprise engagements,
            consistently owning architecture and the quality bar.
          </p>
        </div>
        {data.experience.map((x, i) => (
          <article className="v4-xp v4-reveal" key={i}>
            <div className="v4-xp-period">
              {tidyRange(x.period)}
              <span className="v4-xp-len">{x.length}</span>
              {x.tag && <span className="v4-xp-tag">{x.tag}</span>}
            </div>
            <div>
              <h3 className="v4-xp-role">{x.role}</h3>
              <div className="v4-xp-co">{x.company}</div>
              <ul className="v4-xp-bullets">
                {x.bullets.map((b, j) => (
                  <li key={j}>{tidyProse(b)}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { useReveal, tidyProse, tidyRange, Icon, Nav, Hero, About, Experience });
