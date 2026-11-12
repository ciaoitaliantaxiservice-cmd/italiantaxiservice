import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import { routes, ui, type Lang } from '../../data/i18n';
import type { City } from '../../data/cities';

export default function CityStubBody({ lang, city }: { lang: Lang; city: City }) {
  const l = ui[lang];
  const name = city.name[lang];

  const copy =
    lang === 'en'
      ? {
          eyebrow: 'Destination',
          h1: `Private transfers in ${name}`,
          gateways: 'Airports, ports and stations we cover',
          stubHeading: 'This page is still being written',
          stubBody:
            'Routes, journey times and fixed prices for this area are being finalised. Until they are published here, the fastest way to get an accurate figure is to send us the route.',
          back: 'See all destinations',
        }
      : {
          eyebrow: 'Destinazione',
          h1: `Transfer privati a ${name}`,
          gateways: 'Aeroporti, porti e stazioni che copriamo',
          stubHeading: 'Questa pagina è in preparazione',
          stubBody:
            'Tratte, tempi di percorrenza e tariffe fisse per questa zona sono in fase di definizione. Finché non saranno pubblicati qui, il modo più rapido per avere una cifra precisa è scriverci la tratta.',
          back: 'Vedi tutte le località',
        };

  return (
    <>
      <section className="section">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">
            <Tricolore />
            <span className="label">{copy.eyebrow}</span>
          </p>
          <h1 style={{ marginTop: 'var(--s-3)' }}>{copy.h1}</h1>
          <p className="lead" style={{ marginTop: 'var(--s-4)' }}>
            {city.stubIntro[lang]}
          </p>

          <h2 style={{ marginTop: 'var(--s-10)' }}>{copy.gateways}</h2>
          <p className="muted" style={{ marginTop: 'var(--s-2)' }}>
            {city.gateways[lang]}
          </p>

          <div className="panel panel--raised" style={{ marginTop: 'var(--s-10)' }}>
            <h2 className="title-sm">{copy.stubHeading}</h2>
            <p style={{ marginTop: 'var(--s-2)' }}>{copy.stubBody}</p>
            <div className="btn-row" style={{ marginTop: 'var(--s-6)' }}>
              <a className="btn btn--primary" href={`${routes.contact[lang]}#quote-form`}>
                <Icon name="tag" />
                {l.getQuote}
              </a>
              <a className="btn btn--outline" href={routes.locations[lang]}>
                {copy.back}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
