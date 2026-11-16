import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import RichText from '../RichText';
import { cityById, cityPath } from '../../data/cities';
import { type Lang } from '../../data/i18n';
import { latestPosts, postPath, formatDate, blogCopy, type BlogPost } from '../../data/blog';
import { romeCopy } from '../../data/rome';

/**
 * One blog post: H1, date, the body (with in-text links to the Rome page and
 * other posts), a booking box linking back to the Rome page's form, related
 * posts and the CTA band.
 */
export default function BlogPostBody({ lang, post }: { lang: Lang; post: BlogPost }) {
  const b = blogCopy[lang];
  const romePath = cityPath(cityById('rome'), lang);
  const related = latestPosts().filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <article className="section">
        <div className="wrap wrap--narrow">
          <header className="post__head">
            <p className="eyebrow">
              <Tricolore />
              <span className="label">{b.eyebrow}</span>
            </p>
            <h1 className="post__title">{post.h1[lang]}</h1>
            <p className="post-card__meta">
              <Icon name="calendar" />
              <span>
                {`${b.published} `}
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                {` · ${b.minutes.replace('{n}', String(post.minutes))}`}
              </span>
            </p>
          </header>

          <div className="post__body">
            {post.body[lang].map((block, i) => {
              if ('h2' in block) return <h2 key={i}>{block.h2}</h2>;
              if ('ul' in block) {
                return (
                  <ul key={i}>
                    {block.ul.map((item) => (
                      <li key={item}>
                        <RichText text={item} lang={lang} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i}>
                  <RichText text={block.p} lang={lang} />
                </p>
              );
            })}
          </div>

          <aside className="post__cta" aria-labelledby="post-cta-heading">
            <h2 className="title-sm" id="post-cta-heading">
              {b.ctaHeading}
            </h2>
            <p>{b.ctaBody}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`${romePath}#quote-form`}>
                <Icon name="tag" />
                {b.ctaButton}
              </a>
              <a className="btn btn--outline" href={romePath}>
                {b.ctaRome}
              </a>
            </div>
          </aside>
        </div>
      </article>

      <section className="section section--tint" aria-labelledby="post-related-heading">
        <div className="wrap">
          <h2 className="title-sm blog-list__heading" id="post-related-heading">
            {b.related}
          </h2>
          <ul className="rgrid rgrid--3">
            {related.map((p) => (
              <li className="post-card" key={p.id}>
                <h3 className="post-card__title">
                  <a href={postPath(p, lang)}>{p.h1[lang]}</a>
                </h3>
                <p>{p.excerpt[lang]}</p>
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
        heading={romeCopy[lang].cta.heading}
        body={romeCopy[lang].cta.body}
        quote={{ href: `${romePath}#quote-form`, label: romeCopy[lang].cta.book }}
      />
    </>
  );
}
