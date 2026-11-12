import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import HomeBody from '../../../components/sections/HomeBody';
import LocationsBody from '../../../components/sections/LocationsBody';
import AboutBody from '../../../components/sections/AboutBody';
import ContactBody from '../../../components/sections/ContactBody';
import CityStubBody from '../../../components/sections/CityStubBody';
import NotFoundBody from '../../../components/sections/NotFoundBody';
import { pages, findPage, slugOf, type PageDef } from '../../../data/pages';
import { pageMetadata } from '../../../data/metadata';

type Params = Promise<{ lang: string; slug?: string[] }>;

/** Exactly the URLs in src/data/pages.ts; anything else is a 404. */
export const dynamicParams = false;
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return pages.filter((p) => p.lang === params.lang).map((p) => ({ slug: slugOf(p) }));
}

async function resolve(params: Params): Promise<PageDef> {
  const { lang, slug } = await params;
  const page = findPage(lang, slug);
  if (!page) notFound();
  return page;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  return pageMetadata(await resolve(params));
}

function Body({ page }: { page: PageDef }) {
  const { lang } = page;
  switch (page.kind) {
    case 'home':
      return <HomeBody lang={lang} />;
    case 'locations':
      return <LocationsBody lang={lang} />;
    case 'about':
      return <AboutBody lang={lang} />;
    case 'contact':
      return <ContactBody lang={lang} />;
    case 'city':
      return <CityStubBody lang={lang} city={page.city!} />;
    case 'notFound':
      return <NotFoundBody lang={lang} />;
  }
}

export default async function Page({ params }: { params: Params }) {
  const page = await resolve(params);
  return (
    <PageShell page={page}>
      <Body page={page} />
    </PageShell>
  );
}
