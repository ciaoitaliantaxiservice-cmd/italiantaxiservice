import type { Metadata } from 'next';
import LogoEmblem from '../../components/LogoEmblem';
import { routes, LANGS, htmlLang, langNames } from '../../data/i18n';
import { absolute } from '../../data/seo';
import { site } from '../../data/site.mjs';
import { iconMetadata } from '../../data/metadata';

/**
 * Language gate at `/`. It is `noindex, follow`: there is nothing here to
 * rank, and the two real homepages are what should appear in results.
 *
 * Deliberately NO hreflang alternates here. hreflang must be reciprocal, and
 * /en/ and /it/ point at each other with x-default on /en/; adding one-way
 * links from this gate would make the whole cluster invalid. Crawlers reach
 * both homepages through the body links and the sitemap.
 */
export const metadata: Metadata = {
  ...iconMetadata,
  title: { absolute: 'Ciao Italian Taxi Service · Choose language' },
  description:
    'Private transfers and chauffeured rides across Italy. Continue in English or in Italian. Transfer privati e auto con autista in tutta Italia.',
  robots: { index: false, follow: true },
  alternates: { canonical: absolute('/') },
};

export default function Gate() {
  return (
    <main className="gate">
      <div className="gate__card">
        <LogoEmblem lang="en" />
        <h1 style={{ fontSize: 'var(--t-lg)' }}>{site.brand}</h1>
        <p>Private transfers and chauffeured rides across Italy.</p>
        <p lang="it">Transfer privati e auto con autista in tutta Italia.</p>

        <div className="gate__links">
          {LANGS.map((l) => (
            <a
              key={l}
              className={l === 'en' ? 'btn btn--secondary' : 'btn btn--outline'}
              href={routes.home[l]}
              hrefLang={htmlLang[l]}
              lang={htmlLang[l]}
            >
              {langNames[l]}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
