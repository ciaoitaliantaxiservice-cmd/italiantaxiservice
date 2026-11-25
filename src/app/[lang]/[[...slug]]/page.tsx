import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageShell from '../../../components/PageShell';
import HomeBody from '../../../components/sections/HomeBody';
import LocationsBody from '../../../components/sections/LocationsBody';
import AboutBody from '../../../components/sections/AboutBody';
import ContactBody from '../../../components/sections/ContactBody';
import QuoteBody from '../../../components/sections/QuoteBody';
import CityStubBody from '../../../components/sections/CityStubBody';
import RomeBody from '../../../components/sections/RomeBody';
import MilanBody from '../../../components/sections/MilanBody';
import BlogHubBody from '../../../components/sections/BlogHubBody';
import BlogPostBody from '../../../components/sections/BlogPostBody';
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
      return <ContactBody lang={lang} crumbs={page.crumbs!} />;
    case 'quote':
      return <QuoteBody lang={lang} />;
    case 'city':
      return <CityStubBody lang={lang} city={page.city!} />;
    case 'rome':
      return <RomeBody lang={lang} />;
    case 'milan':
      return <MilanBody lang={lang} />;
    case 'blog':
      return <BlogHubBody lang={lang} />;
    case 'post':
      return <BlogPostBody lang={lang} post={page.post!} />;
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
