/**
 * Screenshot helper.
 *
 * Usage:
 *   node scripts/screenshot.mjs reference   # capture both NFB reference pages
 *   node scripts/screenshot.mjs local       # capture my own /films + a film detail
 *   node scripts/screenshot.mjs both        # both
 *
 * Captures desktop (1440x900) + mobile (390x844) for each target. Also takes a
 * full-page screenshot so I can see everything below the fold.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(".reference/screenshots");
mkdirSync(OUT, { recursive: true });

const targets = {
  reference: [
    { name: "nfb-subjects", url: "https://www.nfb.ca/subjects/history-canada/" },
    { name: "nfb-film", url: "https://www.nfb.ca/film/fragments_of_lost_history/" },
  ],
  local: [
    { name: "local-films", url: "http://localhost:4321/films" },
    {
      name: "local-detail",
      url: "http://localhost:4321/films/save-me-san-francisco",
    },
    {
      name: "local-detail-fangs",
      url: "http://localhost:4321/films/fangs",
    },
    {
      name: "local-detail-heli",
      url: "http://localhost:4321/films/heli",
    },
  ],
};

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function capture(page, target, viewport) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 30000 });
  // Dismiss any NFB cookie banner if present (best-effort).
  try {
    const accept = await page.$('button:has-text("I understand")');
    if (accept) {
      await accept.click();
      await page.waitForTimeout(500);
    }
  } catch {}
  // Wait a beat for fonts/images to settle.
  await page.waitForTimeout(1200);
  const base = `${target.name}-${viewport.name}`;
  await page.screenshot({
    path: `${OUT}/${base}-fold.png`,
    fullPage: false,
  });
  await page.screenshot({
    path: `${OUT}/${base}-full.png`,
    fullPage: true,
  });
  console.log(`  ✓ ${base}-fold.png + ${base}-full.png`);
}

async function run(mode) {
  const list = [];
  if (mode === "reference" || mode === "both") list.push(...targets.reference);
  if (mode === "local" || mode === "both") list.push(...targets.local);
  if (list.length === 0) {
    console.error('Usage: node scripts/screenshot.mjs <reference|local|both>');
    process.exit(1);
  }
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await ctx.newPage();
  for (const target of list) {
    console.log(`▶ ${target.name}  →  ${target.url}`);
    for (const viewport of viewports) {
      try {
        await capture(page, target, viewport);
      } catch (err) {
        console.error(`  ✗ ${target.name} ${viewport.name}:`, err.message);
      }
    }
  }
  await browser.close();
}

run(process.argv[2] ?? "both");
