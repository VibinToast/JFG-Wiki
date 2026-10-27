// Checks every internal link and image of the built site (out/, after npm run build): the page or file must exist,
// and a #fragment must be an id on that page. Reads the built HTML rather than the MDX, so heading ids are exactly
// the ones Nextra made. Exits 1 with a list of what's broken.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
// Next's and Pagefind's own files, not the wiki's.
const SKIP = ['/_next/', '/_pagefind/'];

if (!existsSync(OUT)) {
  console.error('No out/ folder: run npm run build first.');
  process.exit(1);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return SKIP.some((s) => `/${name}/` === s) ? [] : htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });
}

// The built file for a site path: /api -> out/api.html, / -> out/index.html, /img/x.png -> out/img/x.png.
function fileFor(path) {
  const clean = decodeURIComponent(path).replace(/\/$/, '');
  const candidates = clean === '' ? ['index.html'] : [`${clean}.html`, `${clean}/index.html`, clean];
  return candidates.map((c) => join(OUT, c)).find((f) => existsSync(f) && statSync(f).isFile());
}

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    idCache.set(file, new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

const broken = [];
for (const file of htmlFiles(OUT)) {
  const page = '/' + relative(OUT, file).split(sep).join('/').replace(/(index)?\.html$/, '');
  if (page === '/404' || page === '/_not-found') continue;
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^[a-z]+:|^\/\//i.test(url) || SKIP.some((s) => url.startsWith(s))) continue;
    const [path, fragment] = url.replace(/&amp;/g, '&').split('#');
    const target = path === '' ? file : fileFor(path.startsWith('/') ? path : new URL(path, `http://x${page}`).pathname);
    if (!target) broken.push(`${page}: ${url} (no such page or file)`);
    else if (fragment && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(fragment)))
      broken.push(`${page}: ${url} (no #${fragment} on that page)`);
  }
}

const unique = [...new Set(broken)];
if (unique.length) {
  console.error(`${unique.length} broken link(s):\n  ${unique.join('\n  ')}`);
  process.exit(1);
}
console.log('Links OK.');
