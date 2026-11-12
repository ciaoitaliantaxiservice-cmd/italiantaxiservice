import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import '../../styles/fonts.css';
import '../../styles/main.css';

/**
 * Root layout for the language gate at `/` only.
 *
 * A static build cannot issue a real 302, so this page detects the browser
 * language and redirects client-side, before paint, with both languages as
 * plain links for anyone without JavaScript (and for crawlers).
 *
 * [[PREFER A SERVER-SIDE 302 IF YOUR HOST SUPPORTS IT]]: a redirect rule on
 * `/` keyed off Accept-Language avoids the client-side hop entirely. See
 * README, "Root redirect".
 */
const REDIRECT = `(function () {
  try {
    var langs = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var tag = String(langs[i]).toLowerCase();
      if (tag === 'it' || tag.indexOf('it-') === 0) {
        window.location.replace('/it/');
        return;
      }
      if (tag === 'en' || tag.indexOf('en-') === 0) {
        window.location.replace('/en/');
        return;
      }
    }
    window.location.replace('/en/');
  } catch (e) {
    /* Leave the gate on screen and let the visitor choose. */
  }
})();`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00693A',
};

export default function GateLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Runs before paint, so the gate is not visible on the common path. */}
        <script dangerouslySetInnerHTML={{ __html: REDIRECT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
