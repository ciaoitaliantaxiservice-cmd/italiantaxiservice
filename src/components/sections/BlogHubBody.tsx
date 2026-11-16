import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import { meta } from '../../data/seo';
import { cityById, cityPath } from '../../data/cities';
import { type Lang } from '../../data/i18n';
import { latestPosts, postPath, formatDate, blogCopy } from '../../data/blog';
import { romeCopy } from '../../data/rome';

/** /en/blog/ and /it/blog/: every post, newest first. */
export default function BlogHubBody({ lang }: { lang: Lang }) {
  const b = blogCopy[lang];
  const romePath = cityPath(cityById('rome'), lang);
  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="section__head">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{b.eyebrow}</span>
            </p>
            <h1>{meta.blog[lang].h1}</h1>
            <p>{b.lead}</p>
          </div>

          <h2 className="title-sm blog-list__heading">{b.listHeading}</h2>
          <ul className="rgrid rgrid--3">
            {latestPosts().map((post) => (
              <li className="post-card" key={post.id}>
                <p className="post-card__meta">
                  <Icon name="book-open" />
                  <span>
                    {`${formatDate(post.date, lang)} · ${b.minutes.replace('{n}', String(post.minutes))}`}
                  </span>
                </p>
                <h3 className="post-card__title">
                  <a href={postPath(post, lang)}>{post.h1[lang]}</a>
                </h3>
                <p>{post.excerpt[lang]}</p>
                <span className="post-card__more" aria-hidden="true">
                  {b.read}
                  <Icon name="arrow-right" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        lang={lang}
        heading={b.ctaHeading}
        body={b.ctaBody}
        quote={{ href: `${romePath}#quote-form`, label: romeCopy[lang].cta.book }}
      />
    </>
  );
}
