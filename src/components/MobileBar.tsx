import Icon from './Icon';
import { routes, ui, type Lang } from '../data/i18n';
import { emailHref } from '../data/site.mjs';

/**
 * Hidden at >=68rem by CSS, where the header shows its own quote button.
 * body has bottom padding so nothing sits under it. Two actions only, the
 * two ways to send a request: email, and the quote form (in the red, as the
 * one primary action).
 */
export default function MobileBar({ lang }: { lang: Lang }) {
  const l = ui[lang];
  return (
    <nav className="mobile-bar" aria-label={l.mobileActions}>
      <a className="mobile-bar__item" href={emailHref}>
        <Icon name="mail" />
        <span>{l.emailUs}</span>
      </a>
      <a className="mobile-bar__item mobile-bar__item--cta" href={`${routes.contact[lang]}#quote-form`}>
        {l.getQuote}
      </a>
    </nav>
  );
}
