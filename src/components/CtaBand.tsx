import Icon from './Icon';
import { routes, ui, type Lang } from '../data/i18n';
import { t } from '../data/content';
import { emailHref } from '../data/site.mjs';

interface Props {
  lang: Lang;
  /** Override the default heading/body when a page needs its own wording. */
  heading?: string;
  body?: string;
}

export default function CtaBand({ lang, heading, body }: Props) {
  const l = ui[lang];
  const c = t(lang).cta;
  return (
    <section className="cta-band">
      <div className="wrap cta-band__inner">
        <div className="cta-band__copy">
          <h2>{heading ?? c.heading}</h2>
          <p>{body ?? c.body}</p>
          <p className="note">{c.note}</p>
        </div>
        <div className="cta-band__actions">
          <a className="btn btn--primary btn--lg" href={`${routes.contact[lang]}#quote-form`}>
            <Icon name="tag" />
            {l.getQuote}
          </a>
          <a className="btn btn--on-dark btn--lg" href={emailHref}>
            <Icon name="mail" />
            {l.emailUs}
          </a>
        </div>
      </div>
    </section>
  );
}
