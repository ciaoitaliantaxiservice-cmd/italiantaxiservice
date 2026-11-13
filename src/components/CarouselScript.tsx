'use client';

/**
 * Prev/next buttons for every [data-carousel] on the page.
 *
 * The track itself is a native horizontal scroller with scroll snapping, so
 * swiping, trackpads and keyboard (Tab moves card to card and scrolls each
 * into view) work with no JavaScript at all. This only adds the two buttons:
 * each pages by the number of whole cards in view, and is disabled at its end.
 */
import { useEffect } from 'react';

export default function CarouselScript() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
      const track = root.querySelector<HTMLElement>('[data-carousel-track]');
      const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
      const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
      if (!track || !prev || !next) return;

      const step = () => {
        const first = track.firstElementChild as HTMLElement | null;
        if (!first) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const card = first.getBoundingClientRect().width + gap;
        return card * Math.max(1, Math.floor((track.clientWidth + gap) / card));
      };

      const update = () => {
        const max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= max - 1;
      };

      const go = (dir: 1 | -1) => () =>
        track.scrollBy({ left: dir * step(), behavior: reduce.matches ? 'auto' : 'smooth' });

      const onPrev = go(-1);
      const onNext = go(1);
      prev.addEventListener('click', onPrev);
      next.addEventListener('click', onNext);
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();

      cleanups.push(() => {
        prev.removeEventListener('click', onPrev);
        next.removeEventListener('click', onNext);
        track.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
