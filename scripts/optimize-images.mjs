// Turns every PNG or JPEG screenshot in public/img/ into a WebP (quality 85: the same to the eye, about a fifth of
// the size), deletes the original and points the pages in content/ at the new file. Run it after adding screenshots:
// npm run images.
import sharp from 'sharp';
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const IMG = 'public/img';
const renamed = new Map();
let before = 0;
let after = 0;

for (const name of readdirSync(IMG)) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  const webp = name.replace(/\.(png|jpe?g)$/i, '.webp');
  const source = join(IMG, name);
  before += statSync(source).size;
  await sharp(source).webp({ quality: 85, effort: 6 }).toFile(join(IMG, webp));
  after += statSync(join(IMG, webp)).size;
  unlinkSync(source);
  renamed.set(`/img/${name}`, `/img/${webp}`);
}

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? pages(path) : /\.mdx?$/.test(name) ? [path] : [];
  });
}

for (const page of pages('content')) {
  const text = readFileSync(page, 'utf8');
  let next = text;
  for (const [from, to] of renamed) next = next.replaceAll(from, to);
  if (next !== text) writeFileSync(page, next);
}

const mb = (n) => (n / 1e6).toFixed(2);
console.log(renamed.size ? `${renamed.size} image(s): ${mb(before)} MB -> ${mb(after)} MB` : 'Nothing to convert.');
