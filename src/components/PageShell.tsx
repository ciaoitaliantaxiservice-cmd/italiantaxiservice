import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBar from './MobileBar';
import Breadcrumbs from './Breadcrumbs';
import { ui } from '../data/i18n';
import type { PageDef } from '../data/pages';
import {
  graph,
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  breadcrumbSchema,
} from '../data/schema';

/**
 * Everything around a page's body: one JSON-LD @graph (Organization,
 * LocalBusiness, WebSite, plus BreadcrumbList and any page-specific node such
 * as FAQPage), skip link, header, breadcrumbs, footer and the phone action bar.
 */
export default function PageShell({ page, children }: { page: PageDef; children: ReactNode }) {
  const { lang, crumbs, current, altPaths, extraSchema } = page;
  const hasCrumbs = !!crumbs && crumbs.length > 1;

  const jsonLd = JSON.stringify(
    graph([
      organizationSchema(lang),
      localBusinessSchema(lang),
      webSiteSchema(lang),
      ...(hasCrumbs ? [breadcrumbSchema(crumbs!)] : []),
      ...extraSchema,
    ])
  ).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <a className="skip-link" href="#main">
        {ui[lang].skipToContent}
      </a>

      <Header lang={lang} current={current} altPaths={altPaths} />

      {hasCrumbs && <Breadcrumbs lang={lang} crumbs={crumbs!} />}

      <main id="main">{children}</main>

      <Footer lang={lang} altPaths={altPaths} />
      <MobileBar lang={lang} />
    </>
  );
}
