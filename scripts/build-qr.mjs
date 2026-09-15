/**
 * Build one SVG QR code per crypto wallet in src/config/site.ts.
 *
 * Reads every `giving` entry with `qr: true`, skips any whose address is
 * still pending or empty, and writes the rest to public/brand/qr/<id>.svg.
 *
 * Usage:
 *   node scripts/build-qr.mjs
 *
 * site.ts is TypeScript and references import.meta.env, so it is loaded by
 * stripping types with Node's built in stripper (Node 22.13 or newer) and
 * shimming import.meta.env before evaluation. Nothing else is bundled.
 */

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import QRCode from 'qrcode';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const SITE_TS = path.join(root, 'src', 'config', 'site.ts');
const OUT_DIR = path.join(root, 'public', 'brand', 'qr');

async function loadGiving() {
  if (typeof stripTypeScriptTypes !== 'function') {
    throw new Error('This script needs Node 22.13 or newer for module.stripTypeScriptTypes.');
  }

  const source = await readFile(SITE_TS, 'utf8');

  // site.ts reads import.meta.env.DEV, which only exists under Vite.
  const shimmed = source.replace(/import\.meta\.env\.DEV/g, 'false');
  const js = stripTypeScriptTypes(shimmed, { mode: 'strip' });

  const dataUrl = `data:text/javascript;base64,${Buffer.from(js, 'utf8').toString('base64')}`;
  const mod = await import(dataUrl);

  if (!Array.isArray(mod.giving)) {
    throw new Error('src/config/site.ts did not export a `giving` array.');
  }
  return mod.giving;
}

function walletText(entry) {
  const address = String(entry.detail?.value ?? '').trim();
  if (!address) return '';

  // Wallet URI schemes so a scanning app opens the right wallet.
  if (entry.id === 'btc') return `bitcoin:${address}`;
  if (entry.id === 'xrp') return `xrp:${address}`;
  return address;
}

async function main() {
  const giving = await loadGiving();
  const targets = giving.filter((g) => g && g.qr === true);

  if (targets.length === 0) {
    console.log('build-qr: no giving entries with qr: true. Nothing to do.');
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  let written = 0;
  const skipped = [];

  for (const entry of targets) {
    const pending = entry.detail?.pending === true;
    const text = walletText(entry);

    if (pending || !text) {
      skipped.push(`${entry.id} (${pending ? 'pending' : 'empty'})`);
      continue;
    }

    const svg = await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 320,
      color: { dark: '#1c1a17', light: '#ffffff' },
    });

    const outFile = path.join(OUT_DIR, `${entry.id}.svg`);
    await writeFile(outFile, svg, 'utf8');
    written += 1;
    console.log(`build-qr: wrote ${path.relative(root, outFile)}`);
  }

  if (skipped.length > 0) {
    console.log(`build-qr: skipped ${skipped.length}: ${skipped.join(', ')}`);
  }
  console.log(`build-qr: ${written} QR code${written === 1 ? '' : 's'} written.`);
}

main().catch((err) => {
  console.error(`build-qr: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
