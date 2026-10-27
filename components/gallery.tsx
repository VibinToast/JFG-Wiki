// The unused-content gallery: a grid of renders, each a lazy-loaded picture that opens full size, with a caption.
import { Clip } from './clip';

// <Shots>...</Shots>: the grid. Every child is a <Shot> or a <Clip>.
export function Shots({ children }: { children: React.ReactNode }) {
  return <div className="jfg-shots">{children}</div>;
}

// <Shot src="/unused/models/x.webp" title="0x105 rare">caption</Shot>. pixel: sprites and 2D textures, scaled up
// without smoothing. wide: a sheet of frames, the grid's full width.
export function Shot({
  src,
  title,
  pixel,
  wide,
  children,
}: {
  src: string;
  title: string;
  pixel?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <figure className={`jfg-shot${pixel ? ' jfg-shot-pixel' : ''}${wide ? ' jfg-shot-wide' : ''}`}>
      <a href={src}>
        <img src={src} alt={title} loading="lazy" decoding="async" />
      </a>
      <figcaption>
        <b>{title}</b>
        {children ? <span>{children}</span> : null}
      </figcaption>
    </figure>
  );
}

export { Clip };
