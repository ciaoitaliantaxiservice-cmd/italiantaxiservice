import Icon from './Icon';
import { routes, ui, type Lang } from '../data/i18n';
import { emailHref } from '../data/site.mjs';

/**
 * Hidden at >=68rem by CSS, where the header shows its own quote button.
 * body has bottom padding so nothing sits under it. Two actions only, the
 * two ways to send a request: email, and the quote form (in the red, as the
 * one primary action). A page with its own booking form (the Rome page)
 * passes `book`, so the red action scrolls to that form instead.
 */
export default function MobileBar({
  lang,
  book,
}: {
  lang: Lang;
  book?: { href: string; label: string };
}) {
  const l = ui[lang];
  return (
    <nav className="mobile-bar" aria-label={l.mobileActions}>
      <a className="mobile-bar__item" href={emailHref}>
        <Icon name="mail" />
        <span>{l.emailUs}</span>
      </a>
      <a
        className="mobile-bar__item mobile-bar__item--cta"
        href={book?.href ?? `${routes.quote[lang]}#quote-form`}
      >
        {book?.label ?? l.getQuote}
      </a>
    </nav>
  );
}
