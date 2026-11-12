import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import '../../styles/fonts.css';
// Tailwind + Flowbite entry; it imports global.css and components.css into
// cascade layers. See the comment at the top of main.css.
import '../../styles/main.css';
import { LANGS, htmlLang, type Lang } from '../../data/i18n';
import { iconMetadata } from '../../data/metadata';
import { preloadFonts } from '../../components/preloadFonts';

/** Root layout for every page under /en/ and /it/. Only these two exist. */
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const metadata: Metadata = iconMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Matches the utility bar, which is what sits under the status bar.
  themeColor: '#0F2A1E',
};

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  preloadFonts();
  return (
    <html lang={htmlLang[lang as Lang]}>
      <body>{children}</body>
    </html>
  );
}
