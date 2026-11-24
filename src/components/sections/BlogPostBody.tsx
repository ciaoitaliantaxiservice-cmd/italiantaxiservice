import Icon from '../Icon';
import CtaBand from '../CtaBand';
import Tricolore from '../Tricolore';
import RichText from '../RichText';
import Picture from '../Picture';
import { ImagePlaceholder } from '../Placeholders';
import { altFor } from '../../data/image-alt';
import { cityById, cityPath } from '../../data/cities';
import { type Lang } from '../../data/i18n';
import {
  latestPosts,
  postPath,
  formatDate,
  blogCopy,
  blogCityCopy,
  type BlogPost,
} from '../../data/blog';
import { romeCopy } from '../../data/rome';
import { milanCopy } from '../../data/milan';

/**
 * One blog post: H1, date, lead image, the body (with in-text links to its
 * city page and other posts), a booking box linking to that city page's form,
 * related posts from the same city and the CTA band.
 */
export default function BlogPostBody({ lang, post }: { lang: Lang; post: BlogPost }) {
  const b = blogCopy[lang];
  const cc = blogCityCopy[post.city][lang];
  const cityHref = cityPath(cityById(post.city), lang);
  const cta = (post.city === 'milan' ? milanCopy : romeCopy)[lang].cta;
  const related = latestPosts(undefined, post.city)
    .filter((p) => p.id !== post.id)
    .slice(0, 3);
  // Called for pending photos too, so the alt row must exist first.
  const alt = post.image ? altFor(post.image.altKey, lang) : '';

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

          {post.image && (
            <figure className="post__media">
              {post.image.photo ? (
                <Picture
                  name={post.image.altKey}
                  alt={alt}
                  sizes="(min-width: 48rem) 720px, 92vw"
                  loading="eager"
                  fetchPriority="low"
                />
              ) : (
                // PLACEHOLDER(IMG:post-{id}): the alt text is the photo brief.
                <ImagePlaceholder id={`post-${post.id}`} note={post.image.altKey} />
              )}
            </figure>
          )}

          <div className="post__body">
            {post.body[lang].map((block, i) => {
              if ('h2' in block) return <h2 key={i}>{block.h2}</h2>;
              if ('h3' in block) return <h3 key={i}>{block.h3}</h3>;
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
              {cc.ctaHeading}
            </h2>
            <p>{cc.ctaBody}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={`${cityHref}#quote-form`}>
                <Icon name="tag" />
                {cc.ctaButton}
              </a>
              <a className="btn btn--outline" href={cityHref}>
                {cc.ctaCity}
              </a>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--tint" aria-labelledby="post-related-heading">
          <div className="wrap">
            <h2 className="title-sm blog-list__heading" id="post-related-heading">
              {cc.related}
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
      )}

      <CtaBand
        lang={lang}
        heading={cta.heading}
        body={cta.body}
        quote={{ href: `${cityHref}#quote-form`, label: cta.book }}
      />
    </>
  );
}
