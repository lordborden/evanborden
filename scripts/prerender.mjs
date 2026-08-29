/* Bakes the rendered app into dist/index.html after the client build.
   Run as the last step of `npm run build`. */
import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "dist/index.html");
const ssrPath = path.join(root, "dist-ssr/entry-server.js");
const MARKER = '<div id="root"></div>';

const fail = (msg) => {
  console.error(`\nprerender: ${msg}`);
  console.error("prerender: dist/index.html left unchanged (client build is still valid).\n");
  process.exit(1);
};

if (!existsSync(ssrPath)) fail(`SSR bundle missing at ${path.relative(root, ssrPath)}`);
if (!existsSync(indexPath)) fail("dist/index.html missing — did the client build run?");

const html = readFileSync(indexPath, "utf8");
if (!html.includes(MARKER)) fail(`injection point ${MARKER} not found in dist/index.html`);

const { render } = await import(ssrPath);
const appHtml = render();
if (!appHtml || appHtml.length < 500) fail(`render() returned only ${appHtml?.length ?? 0} chars`);

writeFileSync(indexPath, html.replace(MARKER, `<div id="root">${appHtml}</div>`));
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });

const kb = (n) => (n / 1024).toFixed(1) + " kB";
console.log(`prerender: baked ${kb(appHtml.length)} of static HTML into dist/index.html`);
