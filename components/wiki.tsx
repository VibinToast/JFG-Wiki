// The wiki's own MDX components.

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

// <Figure src="/img/x.png" alt="..." caption="..." />: a screenshot with a caption under it.
export function Figure({ src, alt, caption, width }: { src: string; alt: string; caption?: string; width?: number }) {
  return (
    <figure className="jfg-figure">
      <img src={src} alt={alt} loading="lazy" style={width ? { maxWidth: width } : undefined} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
