'use client';

/**
 * Behaviour for the homepage fleet section (sections/Fleet.tsx).
 *
 * - Tabs (WAI-ARIA tabs pattern, automatic activation): show only the
 *   vehicles in that category.
 * - Prev/next and swipe move one vehicle at a time. The photo strip is a
 *   native scroll-snap scroller, so touch swiping is the browser's own; the
 *   details on the left follow whichever photo is in place, sliding in from
 *   the side the photo came from.
 *
 * Everything is server-rendered; without this script the section lists every
 * vehicle (see NO_JS_CSS in Fleet.tsx).
 */
import { useEffect } from 'react';

export default function FleetScript({ position }: { position: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-fleet]');
    if (!root) return;
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const panel = root.querySelector<HTMLElement>('[role="tabpanel"]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('.fleet__item'));
    const slides = Array.from(root.querySelectorAll<HTMLElement>('.fleet__slide'));
    const track = root.querySelector<HTMLElement>('[data-fleet-track]');
    const prev = root.querySelector<HTMLButtonElement>('[data-fleet-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-fleet-next]');
    const count = root.querySelector<HTMLElement>('[data-fleet-count]');
    if (!panel || !track || !prev || !next || !count || tabs.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;

    const visible = () => slides.filter((s) => !s.hidden);

    const scrollToSlide = (slide: HTMLElement, behavior: ScrollBehavior) => {
      const max = track.scrollWidth - track.clientWidth;
      track.scrollTo({ left: Math.min(slide.offsetLeft, max), behavior });
    };

    const setActive = (i: number, scroll: ScrollBehavior | false) => {
      const list = visible();
      if (list.length === 0) return;
      index = Math.max(0, Math.min(i, list.length - 1));
      const order = list.map((s) => s.dataset.vehicle);

      items.forEach((item) => {
        const k = order.indexOf(item.dataset.vehicle);
        item.dataset.state = k === index ? 'active' : k >= 0 && k < index ? 'before' : 'after';
      });
      slides.forEach((s) => {
        if (s === list[index]) s.dataset.state = 'active';
        else delete s.dataset.state;
      });

      count.textContent = position.replace('{i}', String(index + 1)).replace('{n}', String(list.length));
      prev.disabled = index === 0;
      next.disabled = index === list.length - 1;
      if (scroll) scrollToSlide(list[index], reduce.matches ? 'auto' : scroll);
    };

    const selectTab = (tab: HTMLButtonElement) => {
      const category = tab.dataset.category ?? '';
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      slides.forEach((s) => {
        s.hidden = !(s.dataset.categories ?? '').split(' ').includes(category);
      });
      track.scrollTo({ left: 0, behavior: 'auto' });
      setActive(0, false);
      if (!reduce.matches) {
        track.animate(
          [
            { opacity: 0, transform: 'translateX(16px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 400, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
        );
      }
    };

    const onTabClick = (e: Event) => {
      const tab = e.currentTarget as HTMLButtonElement;
      if (tab.getAttribute('aria-selected') !== 'true') selectTab(tab);
    };

    const onTabKey = (e: KeyboardEvent) => {
      const i = tabs.indexOf(e.currentTarget as HTMLButtonElement);
      let to = -1;
      if (e.key === 'ArrowRight') to = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') to = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = tabs.length - 1;
      if (to < 0) return;
      e.preventDefault();
      tabs[to].focus();
      selectTab(tabs[to]);
    };

    // A swipe settles on a snap point: follow it with the copy. Waiting for
    // the scroll to settle also keeps an arrow's own smooth scroll from
    // briefly re-selecting the slide it is leaving.
    let frame = 0;
    const onScroll = () => {
      window.clearTimeout(frame);
      frame = window.setTimeout(() => {
        const list = visible();
        const max = track.scrollWidth - track.clientWidth;
        let nearest = 0;
        let best = Infinity;
        list.forEach((s, k) => {
          const d = Math.abs(Math.min(s.offsetLeft, max) - track.scrollLeft);
          if (d < best) {
            best = d;
            nearest = k;
          }
        });
        if (nearest !== index) setActive(nearest, false);
      }, 90);
    };

    const onPrev = () => setActive(index - 1, 'smooth');
    const onNext = () => setActive(index + 1, 'smooth');
    const onResize = () => {
      const list = visible();
      if (list[index]) scrollToSlide(list[index], 'auto');
    };

    tabs.forEach((t) => {
      t.addEventListener('click', onTabClick);
      t.addEventListener('keydown', onTabKey);
    });
    prev.addEventListener('click', onPrev);
    next.addEventListener('click', onNext);
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    setActive(0, false);

    return () => {
      window.clearTimeout(frame);
      tabs.forEach((t) => {
        t.removeEventListener('click', onTabClick);
        t.removeEventListener('keydown', onTabKey);
      });
      prev.removeEventListener('click', onPrev);
      next.removeEventListener('click', onNext);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [position]);

  return null;
}
