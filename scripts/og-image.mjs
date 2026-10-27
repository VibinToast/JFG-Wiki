// Draws public/og.jpg, the 1200x630 preview shown when a wiki link is shared (Discord, Reddit, social sites): the
// Studio screenshot under the wiki's navy and cyan, with its name. Run it again if the look or the screenshot changes.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0b1120" stop-opacity="0.97"/>
      <stop offset="0.55" stop-color="#0b1120" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#0b1120" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#22b8d8"/>
  <rect x="72" y="150" width="150" height="66" rx="8" fill="#1192b0"/>
  <text x="147" y="198" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700"
    font-size="44" letter-spacing="5" fill="#fff">JFG</text>
  <text x="72" y="305" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="76" fill="#fff">Modding Wiki</text>
  <text font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#c9d6e8">
    <tspan x="72" y="380">Planets, levels, enemies, music, scripts</tspan>
    <tspan x="72" y="424">and texture packs for Jet Force Gemini: Recompiled</tspan>
  </text>
  <text x="72" y="545" font-family="Consolas, monospace" font-size="28" fill="#5ccbe8">jfg.vibintoast.com</text>
</svg>`;

await sharp('public/img/studio-overview.webp')
  .resize(W, H, { fit: 'cover' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og.jpg');
console.log('public/og.jpg written.');
