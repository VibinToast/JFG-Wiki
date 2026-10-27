'use client';
// <Clip src="/unused/anims/x.mp4" poster="/unused/anims/x.webp" title="Animation 24">caption</Clip>: a looping
// animation shown as its still until clicked, so a page of a hundred clips loads only the stills it scrolls to.
import { useState } from 'react';

export function Clip({
  src,
  poster,
  title,
  children,
}: {
  src: string;
  poster: string;
  title: string;
  children?: React.ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="jfg-shot">
      {playing ? (
        <video src={src} poster={poster} autoPlay loop muted playsInline controls />
      ) : (
        <button type="button" className="jfg-clip-still" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <img src={poster} alt={title} loading="lazy" decoding="async" />
          <span className="jfg-clip-play" aria-hidden="true">
            ▶
          </span>
        </button>
      )}
      <figcaption>
        <b>{title}</b>
        {children ? <span>{children}</span> : null}
      </figcaption>
    </figure>
  );
}
