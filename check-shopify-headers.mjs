#!/usr/bin/env node
// Minimal zero-dependency Shopify CSV Row-1 header inspector (MIT)
// Full interactive mapper & validator: https://rowandrecord.com/
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node check-shopify-headers.mjs <path-to-utf8.csv>');
  process.exit(2);
}

const firstLine = readFileSync(file, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/)[0] || '';
const headers = firstLine.split(',').map((h) => h.replace(/^"|"$/g, '').trim());
const seen = new Set();
const dupes = [];
headers.forEach((h, i) => {
  if (!h) console.warn(`[WARN] Blank header at column #${i + 1}`);
  const low = h.toLowerCase();
  if (h && seen.has(low)) dupes.push(h);
  seen.add(low);
});
if (dupes.length) console.error(`[ERROR] Duplicate headers: ${dupes.join(', ')}`);
if (!seen.has('handle') && !seen.has('url handle')) console.warn('[WARN] Missing Handle / URL handle column.');
if (!seen.has('title')) console.warn('[WARN] Missing Title column.');
console.log(`Checked ${headers.length} headers (${dupes.length} duplicates). Online preflight: https://rowandrecord.com/`);
process.exit(dupes.length ? 1 : 0);
