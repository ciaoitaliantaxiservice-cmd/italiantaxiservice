/**
 * Renders a string, highlighting every [[PLACEHOLDER]] it contains so missing
 * facts are impossible to miss in review and impossible to ship by accident.
 *
 * Splitting rather than injecting HTML keeps the copy escaped: the content
 * files stay plain text and can never inject markup.
 */
import { Fragment } from 'react';

export default function Placeholders({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g).filter((part) => part !== '');
  return (
    <>
      {parts.map((part, i) =>
        /^\[\[[^\]]+\]\]$/.test(part) ? (
          <span className="placeholder" key={i}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/**
 * Typed placeholders, per docs/seo-site-expansion-playbook.md §7:
 * [[TYPE:ID]], with the same ID in EN and IT so one fix fills both.
 * Each carries data-placeholder="TYPE:ID", so
 *   grep -o 'data-placeholder="[^"]*"' -r dist
 * lists every one still in the built site. Tracked in docs/PLACEHOLDERS.md.
 * Never use these in JSON-LD, <title>, meta descriptions or alt text.
 */
export type MarkerType = 'IMG' | 'PRICE' | 'VEHICLE' | 'TEXT' | 'DATA' | 'VERIFY';

export function Marker({ type, id, note }: { type: MarkerType; id: string; note?: string }) {
  return (
    <span className="placeholder" data-placeholder={`${type}:${id}`} title={note}>
      {`[[${type}:${id}]]`}
    </span>
  );
}

/**
 * An image slot that is not filled yet. It is sized by its container (the
 * real image's frame), so dropping the photo in later causes no layout shift.
 * Decorative to assistive tech: the card around it carries the name.
 */
export function ImagePlaceholder({
  id,
  note,
  className,
}: {
  id: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={['img-placeholder', className].filter(Boolean).join(' ')}
      data-placeholder={`IMG:${id}`}
      aria-hidden="true"
    >
      <span className="img-placeholder__tag">
        <strong>{`IMG · ${id}`}</strong>
        <span>{note}</span>
      </span>
    </div>
  );
}
