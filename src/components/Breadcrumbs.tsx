import { ui, type Lang } from '../data/i18n';
import type { Crumb } from '../data/schema';

interface Props {
  lang: Lang;
  /** Includes the current page as the final item. */
  crumbs: Crumb[];
}

/**
 * Visible breadcrumbs. The matching BreadcrumbList JSON-LD is emitted by the
 * page shell from the same array, so the two can never drift apart.
 */
export default function Breadcrumbs({ lang, crumbs }: Props) {
  return (
    <nav className="breadcrumbs" aria-label={ui[lang].breadcrumb}>
      <div className="wrap">
        <ol>
          {crumbs.map((crumb, i) => (
            // The spaces either side of each item are part of the design: the
            // separator sits between them (as the original markup had it).
            <li key={crumb.path}>
              {' '}
              {i === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <a href={crumb.path}>{crumb.name}</a>
              )}{' '}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
