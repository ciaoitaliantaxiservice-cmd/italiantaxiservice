import { Fragment } from 'react';

/**
 * The site's one title highlight: a soft green marker behind 1–3 key words
 * (`mark.hl`, src/styles/components.css). In copy, the words go between
 * double equals signs: 'Top ==destinations== in Milan'.
 *
 * House rule (owner brief, 24 Nov 2026): use it ONLY on section titles about
 * the top or best places and destinations (sights, hotels, day trips), the
 * same everywhere, and never on other headings.
 */
export default function Marked({ text }: { text: string }) {
  const parts = text.split(/(==[^=]+==)/g).filter((p) => p !== '');
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('==') && part.endsWith('==') ? (
          <mark className="hl" key={i}>
            {part.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/** The same title as plain text, for aria-labels and metadata. */
export function unmarked(text: string): string {
  return text.replace(/==/g, '');
}
