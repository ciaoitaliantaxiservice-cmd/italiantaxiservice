'use client';

/**
 * Starts the coverage map (CoverageMap.tsx) once the section comes within
 * 400px of the viewport: only then are Leaflet and its stylesheet fetched.
 */
import { useEffect } from 'react';
import type * as Leaflet from 'leaflet';

interface MapPlace {
  name: string;
  lat: number;
  lng: number;
  main?: boolean;
}
interface MapConfig {
  center: { lat: number; lng: number };
  zoom: { phone: number; wide: number };
  cities: MapPlace[];
  airports: MapPlace[];
}

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
/** Copied from node_modules by scripts/build-assets.mjs. */
const LEAFLET_CSS = '/vendor/leaflet/leaflet.css';

function loadCss(href: string): Promise<void> {
  const existing = document.querySelector<HTMLLinkElement>(`link[href="${href}"]`);
  if (existing) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Could not load ${href}`));
    document.head.appendChild(link);
  });
}

async function start(node: HTMLElement) {
  const [{ default: L }] = await Promise.all([
    import('leaflet') as Promise<{ default: typeof Leaflet }>,
    loadCss(LEAFLET_CSS),
  ]);
  const cfg: MapConfig = JSON.parse(node.dataset.config ?? '{}');
  const wide = window.matchMedia('(min-width: 48rem)').matches;
  const plane = document.getElementById('coverage-plane')?.innerHTML ?? '';

  const map = L.map(node, {
    center: [cfg.center.lat, cfg.center.lng],
    zoom: wide ? cfg.zoom.wide : cfg.zoom.phone,
    // Whole zoom steps only: fractional zoom scales the tiles and leaves
    // hairline seams between them.
    zoomSnap: 1,
    minZoom: 5,
    maxZoom: 12,
    scrollWheelZoom: false, // the page scrolls past the map, not into it
    dragging: !L.Browser.mobile, // one finger scrolls the page on phones
    zoomControl: false,
    fadeAnimation: false,
    attributionControl: true,
  });
  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 19 }).addTo(map);

  // Frame mainland Italy, Rome at its heart, in the part of the map the
  // overlay card leaves free (the card floats top-left from 48rem).
  const card = node.parentElement?.querySelector<HTMLElement>('.coverage__card');
  const cardRight = wide && card ? card.offsetLeft + card.offsetWidth : 0;
  const places = [...cfg.cities, ...cfg.airports];
  map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lng] as [number, number])), {
    // Tight padding on phones, where every pixel decides the zoom step.
    paddingTopLeft: wide ? [cardRight + 24, 32] : [12, 12],
    paddingBottomRight: wide ? [24, 24] : [12, 12],
    maxZoom: 7,
  });

  // Airports first and below; cities drawn on top so no pin is hidden.
  for (const p of cfg.airports) {
    L.marker([p.lat, p.lng], {
      title: p.name,
      keyboard: true,
      icon: L.divIcon({ className: 'cov-air', html: plane, iconSize: [22, 22] }),
    })
      .bindTooltip(p.name, { direction: 'top', offset: [0, -11], className: 'cov-tip' })
      .addTo(map);
  }

  for (const p of cfg.cities) {
    L.marker([p.lat, p.lng], {
      title: p.name,
      keyboard: true,
      riseOnHover: true,
      zIndexOffset: p.main ? 2000 : 1000,
      icon: L.divIcon({
        className: `cov-pin${p.main ? ' cov-pin--main' : ''}`,
        html: '<span></span>',
        iconSize: p.main ? [22, 22] : [16, 16],
      }),
    })
      .bindTooltip(p.name, {
        direction: 'top',
        offset: [0, -10],
        permanent: !!p.main,
        className: 'cov-tip',
      })
      .addTo(map);
  }

  node.classList.add('is-ready');
  return map;
}

export default function CoverageMapScript() {
  useEffect(() => {
    const el = document.getElementById('coverage-map');
    if (!el) return;
    let map: Leaflet.Map | undefined;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start(el)
            .then((m) => {
              if (cancelled) m.remove();
              else map = m;
            })
            .catch(() => el.classList.add('is-failed'));
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  return null;
}
