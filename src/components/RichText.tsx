/**
 * Plain-text copy with two inline forms, rendered safely (no HTML is ever
 * injected; the text stays escaped):
 *
 *   [anchor](target)  an internal link in the page's own language. Targets:
 *                     `rome`, `rome#<id>`, `contact`, `blog`, `post:<id>`.
 *                     An unknown target fails the build.
 *   [[TYPE:ID]]       a typed placeholder (playbook §7), drawn as a Marker
 *                     with data-placeholder="TYPE:ID".
 */
import { Fragment } from 'react';
import { Marker, type MarkerType } from './Placeholders';
import { routes, type Lang } from '../data/i18n';
import { cityById, cityPath } from '../data/cities';
import { postById, postPath } from '../data/blog';

function resolve(target: string, lang: Lang): string {
  const [base, hash] = target.split('#');
  let path: string;
  if (base === 'rome') path = cityPath(cityById('rome'), lang);
  else if (base === 'contact') path = routes.contact[lang];
  else if (base === 'blog') path = routes.blog[lang];
  else if (base.startsWith('post:')) path = postPath(postById(base.slice(5)), lang);
  else throw new Error(`Unknown link target "${target}" in copy`);
  return hash ? `${path}#${hash}` : path;
}

const TOKEN = /(\[\[[A-Z]+:[^\]]+\]\]|\[[^\]]+\]\([^)\s]+\))/g;

export default function RichText({ text, lang }: { text: string; lang: Lang }) {
  const parts = text.split(TOKEN).filter((p) => p !== '');
  return (
    <>
      {parts.map((part, i) => {
        const marker = part.match(/^\[\[([A-Z]+):([^\]|]+?)\s*(?:\|[^\]]*)?\]\]$/);
        if (marker) return <Marker key={i} type={marker[1] as MarkerType} id={marker[2]} />;
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          return (
            <a key={i} href={resolve(link[2], lang)}>
              {link[1]}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
