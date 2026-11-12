'use client';

/**
 * Full-screen mobile menu behaviour for the server-rendered header markup.
 *
 * A real button with a correct aria-expanded state; while open, focus stays
 * inside the menu, the page behind does not scroll, and Escape or the close
 * button returns focus to Menu. Tapping a link closes the menu at once, so
 * the next page never opens with it up.
 */
import { useEffect } from 'react';

export default function HeaderMenu() {
  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
    const close = document.querySelector<HTMLButtonElement>('[data-nav-close]');
    const nav = document.getElementById('site-nav');
    const root = document.documentElement;
    const desktop = window.matchMedia('(min-width: 68rem)');
    if (!toggle || !close || !nav) return;

    const setOpen = (open: boolean, returnFocus = false) => {
      nav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      root.classList.toggle('nav-open', open);
      if (open) close.focus();
      else if (returnFocus) toggle.focus();
    };

    const onToggle = () => setOpen(true);
    const onClose = () => setOpen(false, true);
    const onNavClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (nav.dataset.open !== 'true' || desktop.matches) return;
      if (e.key === 'Escape') {
        setOpen(false, true);
        return;
      }
      if (e.key !== 'Tab') return;
      // Keep Tab inside the open menu.
      const items = [...nav.querySelectorAll<HTMLElement>('a[href], button')].filter(
        (el) => el.offsetParent !== null
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Never leave the menu (or the scroll lock) stuck open: on rotating or
    // resizing into the desktop layout, or on coming back via the back button.
    const reset = () => setOpen(false);

    toggle.addEventListener('click', onToggle);
    close.addEventListener('click', onClose);
    nav.addEventListener('click', onNavClick);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', reset);
    window.addEventListener('pageshow', reset);

    return () => {
      toggle.removeEventListener('click', onToggle);
      close.removeEventListener('click', onClose);
      nav.removeEventListener('click', onNavClick);
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', reset);
      window.removeEventListener('pageshow', reset);
    };
  }, []);

  return null;
}
