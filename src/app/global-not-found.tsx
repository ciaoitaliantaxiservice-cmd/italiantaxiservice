import type { Metadata, Viewport } from 'next';
import '../styles/fonts.css';
import '../styles/main.css';
import LogoEmblem from '../components/LogoEmblem';
import { routes, LANGS, htmlLang, langNames, ui } from '../data/i18n';
import { t } from '../data/content';
import { iconMetadata } from '../data/metadata';

/**
 * Root 404, built to /404.html: the file most static hosts serve for ANY
 * unknown path. Because we cannot know the visitor's language at that point,
 * this page is deliberately bilingual.
 *
 * No canonical and no hreflang on purpose: this file is served for arbitrary
 * unknown URLs, so a canonical would claim /404.html is the canonical version
 * of whatever the visitor actually asked for.
 *
 * Hosts that can route by path prefix should serve /en/404/ and /it/404/
 * instead for /en/* and /it/* misses, and keep this as the catch-all. See
 * README, "404 handling".
 */
export const metadata: Metadata = {
  ...iconMetadata,
  title: { absolute: 'Page Not Found · Pagina Non Trovata' },
  description:
    'That page does not exist. Choose a language to carry on. Questa pagina non esiste: scegliete una lingua per continuare.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00693A',
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main className="gate">
          <div className="gate__card">
            <LogoEmblem lang="en" />
            <p className="eyebrow" style={{ justifyContent: 'center' }}>
              404
            </p>
            <h1 style={{ fontSize: 'var(--t-lg)' }}>
              Page not found &middot; <span lang="it">Pagina non trovata</span>
            </h1>

            {LANGS.map((lang) => (
              <div lang={htmlLang[lang]} style={{ marginTop: 'var(--s-5)' }} key={lang}>
                <h2 style={{ fontSize: 'var(--t-md)' }}>{t(lang).notFound.lead}</h2>
                <div className="gate__links">
                  <a className="btn btn--secondary" href={routes.home[lang]}>
                    {`${ui[lang].home} (${langNames[lang]})`}
                  </a>
                  <a className="btn btn--outline" href={routes.contact[lang]}>
                    {ui[lang].contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
