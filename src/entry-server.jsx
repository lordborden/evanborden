/* SSR entry — used only at build time by scripts/prerender.mjs.
   Renders the app to static HTML so crawlers that don't execute JS
   (GPTBot, ClaudeBot, PerplexityBot, CCBot) can read the whole page. */
import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./components/parts2.jsx";

export function render() {
  return renderToString(<App />);
}
