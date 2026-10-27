// The wiki's own MDX components.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const STATUS_TEXT = { built: 'built', partial: 'partial', planned: 'planned' } as const;

// <Status s="built" />: how far a feature is: works now, only part of it (or player-only), or designed but not built.
export function Status({ s }: { s: keyof typeof STATUS_TEXT }) {
  return <span className={`jfg-chip jfg-chip-${s}`}>{STATUS_TEXT[s]}</span>;
}

// The three statuses with what they mean, for the top of status tables.
export function Legend() {
  return (
    <div className="jfg-legend">
      <span>
        <Status s="built" /> works in the port now
      </span>
      <span>
        <Status s="partial" /> player-only, or only through a general route
      </span>
      <span>
        <Status s="planned" /> designed, not built yet
      </span>
    </div>
  );
}

// A WebP's pixel size from its header (lossy VP8, lossless VP8L or extended VP8X), so a figure keeps its space while
// the image loads. Read at build time from public/; undefined for anything else.
function webpSize(src: string): { width: number; height: number } | undefined {
  let b: Buffer;
  try {
    b = readFileSync(join(process.cwd(), 'public', src));
  } catch {
    return undefined;
  }
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return undefined;
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  return undefined;
}

// <Figure src="/img/x.webp" alt="..." caption="..." />: a screenshot with a caption under it.
export function Figure({ src, alt, caption, width }: { src: string; alt: string; caption?: string; width?: number }) {
  return (
    <figure className="jfg-figure">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        {...webpSize(src)}
        style={width ? { maxWidth: width } : undefined}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
