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
  ChevronLeft,
  ChevronRight,
  Users,
  Luggage,
  House,
  BookOpen,
  Star,
  Wifi,
  AirVent,
  Baby,
  Armchair,
  Landmark,
  UtensilsCrossed,
  Palette,
  Church,
  Play,
  TrainFront,
  Ship,
  Route,
  CalendarDays,
  Hotel,
  ArrowRight,
  Timer,
  ShoppingBag,
  Mountain,
  Briefcase,
  Building2,
  Shirt,
  Plus,
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
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  users: Users,
  luggage: Luggage,
  'home': House,
  'book-open': BookOpen,
  'star': Star,
  'wifi': Wifi,
  'air-vent': AirVent,
  'baby': Baby,
  'armchair': Armchair,
  'landmark': Landmark,
  'utensils': UtensilsCrossed,
  'palette': Palette,
  'church': Church,
  'play': Play,
  'train': TrainFront,
  'ship': Ship,
  'route': Route,
  'calendar': CalendarDays,
  'hotel': Hotel,
  'arrow-right': ArrowRight,
  'timer': Timer,
  'shopping-bag': ShoppingBag,
  'mountain': Mountain,
  'briefcase': Briefcase,
  'building': Building2,
  'shirt': Shirt,
  'plus': Plus,
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
