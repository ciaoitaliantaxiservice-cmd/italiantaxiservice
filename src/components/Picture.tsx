/**
 * A photo as <picture>: WebP only (every browser the site supports reads it),
 * resized ahead of time by scripts/build-assets.mjs. Width and height are the
 * source's, so the image always reserves its box.
 */
import type { CSSProperties } from 'react';
import manifest from '../data/photo-manifest.json';

type Photo = {
  width: number;
  height: number;
  srcset: number[];
  files: Record<string, string>;
};
const photos = manifest as Record<string, Photo>;

interface Props {
  /** Source file name in src/assets (no extension). */
  name: string;
  alt: string;
  sizes: string;
  loading: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  style?: CSSProperties;
  className?: string;
}

export default function Picture({
  name,
  alt,
  sizes,
  loading,
  fetchPriority,
  style,
  className,
}: Props) {
  const p = photos[name];
  if (!p) throw new Error(`No photo "${name}" in src/assets. Run scripts/build-assets.mjs.`);
  const srcSet = p.srcset.map((w) => `${p.files[w]} ${w}w`).join(', ');
  return (
    <picture className={className}>
      <source srcSet={srcSet} type="image/webp" sizes={sizes} />
      <img
        src={p.files[p.width]}
        srcSet={srcSet}
        alt={alt}
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        style={style}
        width={p.width}
        height={p.height}
      />
    </picture>
  );
}
