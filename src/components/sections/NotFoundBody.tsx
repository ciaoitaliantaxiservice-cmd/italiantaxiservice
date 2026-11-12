import Tricolore from '../Tricolore';
import { t } from '../../data/content';
import { meta } from '../../data/seo';
import { routes, navOrder, ui, type Lang } from '../../data/i18n';

export default function NotFoundBody({ lang }: { lang: Lang }) {
  const c = t(lang).notFound;
  const l = ui[lang];

  return (
    <section className="section">
      <div className="wrap wrap--narrow notfound">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          <Tricolore />
          <span className="label">404</span>
        </p>
        <h1 style={{ marginTop: 'var(--s-4)' }}>{meta.notFound[lang].h1}</h1>
        <p className="lead" style={{ margin: 'var(--s-4) auto 0' }}>
          {c.lead}
        </p>

        <h2 style={{ marginTop: 'var(--s-14)' }}>{c.linksHeading}</h2>
        <div className="notfound__links">
          {navOrder.map((key) => (
            <a className="btn btn--outline" href={routes[key][lang]} key={key}>
              {l[key]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
