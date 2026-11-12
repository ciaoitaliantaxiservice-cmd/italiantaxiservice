import { LANGS, ui, htmlLang, langNames, type Lang } from '../data/i18n';

interface Props {
  lang: Lang;
  /** Path of the equivalent page in each language — never a bare homepage link. */
  paths: Record<Lang, string>;
}

const labels: Record<Lang, string> = { en: 'EN', it: 'IT' };

export default function LangSwitch({ lang, paths }: Props) {
  return (
    <nav className="lang-switch" aria-label={ui[lang].switchLanguage}>
      {LANGS.map((l) => (
        <a
          key={l}
          className="lang-switch__item"
          href={paths[l]}
          hrefLang={htmlLang[l]}
          lang={htmlLang[l]}
          aria-current={l === lang ? 'true' : undefined}
        >
          <span aria-hidden="true">{labels[l]}</span>
          <span className="visually-hidden">{langNames[l]}</span>
        </a>
      ))}
    </nav>
  );
}
