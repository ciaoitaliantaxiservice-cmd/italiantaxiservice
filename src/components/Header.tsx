import Logo from './Logo';
import LangSwitch from './LangSwitch';
import Icon from './Icon';
import HeaderMenu from './HeaderMenu';
import { routes, navOrder, ui, type Lang, type RouteKey } from '../data/i18n';
import { site, emailHref } from '../data/site.mjs';

interface Props {
  lang: Lang;
  current?: RouteKey;
  /** Equivalent page in each language, for the EN/IT switch. */
  altPaths: Record<Lang, string>;
}

export default function Header({ lang, current, altPaths }: Props) {
  const l = ui[lang];
  const quoteHref = `${routes.contact[lang]}#quote-form`;

  return (
    <>
      {/* Utility bar: the thin dark strip above the header. Centred on phones;
          note left and email action right from 48rem. The address itself is
          not written out here (it is in the footer and on the contact page),
          just a short mailto action. */}
      <div className="utility-bar">
        <div className="wrap utility-bar__inner">
          <span className="utility-bar__note">{l.utilityNote}</span>
          <a className="utility-bar__email" href={emailHref}>
            <Icon name="mail" />
            <span>{l.emailUs}</span>
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap site-header__inner">
          <a className="logo" href={routes.home[lang]}>
            {/* Header reading: plain ribbon, no lettering; the wordmark beside
                it names the link, so the mark itself is aria-hidden. */}
            <Logo />
            <span className="logo__text">
              <span className="logo__name">{site.brand}</span>
              <span className="logo__tag">{l.lockupTag}</span>
            </span>
          </a>

          {/* One nav for both layouts. From 68rem it is the inline row. Below
              that it is the full-screen menu: the top row (language switch and
              close button) and the actions at the foot only show there. */}
          <nav className="site-nav" id="site-nav" aria-label={l.mainNav} data-open="false">
            <div className="site-nav__top">
              <LangSwitch lang={lang} paths={altPaths} />
              <button className="nav-close" type="button" aria-controls="site-nav" data-nav-close="">
                <Icon name="close" />
                <span>{l.closeMenu}</span>
              </button>
            </div>

            <ul className="site-nav__list">
              {navOrder.map((key) => (
                <li key={key}>
                  <a href={routes[key][lang]} aria-current={key === current ? 'page' : undefined}>
                    {l[key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="site-nav__actions">
              <a className="btn btn--primary" href={quoteHref}>
                <Icon name="tag" />
                {l.getQuote}
              </a>
              <a className="btn btn--outline" href={emailHref}>
                <Icon name="mail" />
                {l.emailUs}
              </a>
            </div>
          </nav>

          <div className="header__actions">
            <div className="header__lang">
              <LangSwitch lang={lang} paths={altPaths} />
            </div>

            <a className="btn btn--primary btn--header header__cta" href={quoteHref}>
              {l.getQuote}
            </a>

            <button
              className="nav-toggle"
              type="button"
              aria-controls="site-nav"
              aria-expanded="false"
              data-nav-toggle=""
            >
              <Icon name="menu" />
              <span className="nav-toggle__label">{l.menu}</span>
            </button>
          </div>
        </div>
      </header>
      <HeaderMenu />
    </>
  );
}
