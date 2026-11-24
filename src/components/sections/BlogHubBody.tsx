import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import { meta } from '../../data/seo';
import { type Lang } from '../../data/i18n';
import {
  latestPosts,
  postPath,
  formatDate,
  blogCopy,
  blogCityCopy,
  type BlogCity,
} from '../../data/blog';

/**
 * /en/blog/ and /it/blog/: every post, grouped by city, newest city first
 * (its newest post decides), and newest first inside each group.
 */
export default function BlogHubBody({ lang }: { lang: Lang }) {
  const b = blogCopy[lang];
  const cities = [...new Set(latestPosts().map((p) => p.city))] as BlogCity[];

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

          {cities.map((city) => (
            <div className="blog-group" key={city}>
              <h2 className="title-sm blog-list__heading">{blogCityCopy[city][lang].listHeading}</h2>
              <ul className="rgrid rgrid--3">
                {latestPosts(undefined, city).map((post) => (
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
          ))}
        </div>
      </section>

      <CtaBand lang={lang} heading={b.ctaHeading} body={b.ctaBody} />
    </>
  );
}
