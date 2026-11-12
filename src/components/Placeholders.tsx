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
