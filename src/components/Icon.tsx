/**
 * Every icon on the site, from Lucide (https://lucide.dev).
 *
 * Rendered into the static HTML as inline SVG: no icon font, and only the
 * icons mapped below are imported.
 *
 * One size and one stroke width across the site: 24px, Lucide's native grid,
 * at a 1.5 stroke, the concept's line weight. The size is set by the .icon
 * class (--icon-size in global.css), never per context. Colour is
 * currentColor, so an icon takes the brand colour of the text it sits in.
 *
 * Decorative: Lucide marks the SVG aria-hidden, because every icon on the site
 * sits next to a text label that already says what it means.
 */
import {
  Check,
  Tag,
  MapPin,
  Car,
  Clock,
  Plane,
  ShieldCheck,
  MessagesSquare,
  Mail,
  Menu,
  X,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import type { IconName } from '../data/icons';

const ICONS = {
  check: Check,
  tag: Tag,
  'map-pin': MapPin,
  car: Car,
  clock: Clock,
  plane: Plane,
  'shield-check': ShieldCheck,
  messages: MessagesSquare,
  mail: Mail,
  menu: Menu,
  close: X,
  'chevron-down': ChevronDown,
} satisfies Record<IconName, LucideIcon>;

interface Props {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className }: Props) {
  const Lucide = ICONS[name];
  return (
    <Lucide
      size={24}
      strokeWidth={1.5}
      className={['icon', className].filter(Boolean).join(' ')}
      focusable="false"
    />
  );
}
