import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App, initParallax } from "./components/parts2.jsx";
import "./styles.css";

const el = document.getElementById("root");

// Production builds are prerendered (scripts/prerender.mjs), so hydrate that
// markup; `vite dev` serves an empty root, so fall back to a client render.
if (el.hasChildNodes()) hydrateRoot(el, <App />);
else createRoot(el).render(<App />);

requestAnimationFrame(initParallax);
