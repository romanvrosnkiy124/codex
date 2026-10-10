import { allPublicationsUrl, mediaNotice, publications } from "../lib/media-content";
import EditorialLink from "./EditorialLink";
import styles from "./EditorialSections.module.css";

export default function MediaSection() {
  return (
    <section id="media" className={styles.media} aria-labelledby="media-heading" aria-describedby="media-notice" data-editorial-section>
      <div className="container">
        <div className={styles.mediaIntro}>
          <div className={styles.mediaTitle}>
            <p className="eyebrow" data-editorial-reveal>СМИ И ПУБЛИКАЦИИ</p>
            <h2 id="media-heading" className={styles.heading}>
              <span className={styles.headingMask}><span data-editorial-heading>Экспертные комментарии</span></span>
              <span className={`${styles.headingMask} ${styles.accent}`}><span data-editorial-heading>в федеральных СМИ.</span></span>
            </h2>
          </div>
          <p className={styles.supporting} data-editorial-reveal>Даю комментарии по актуальным правовым вопросам, выступаю экспертом в СМИ и на профессиональных площадках.</p>
          <div className={styles.headerLink} data-editorial-reveal><EditorialLink href={allPublicationsUrl}>Все публикации</EditorialLink></div>
        </div>
        <p id="media-notice" className={styles.notice} data-editorial-reveal>{mediaNotice}</p>
        <ul className={styles.mediaGrid} aria-label="Примеры тем публикаций">
          {publications.map((publication) => (
            <li className={styles.mediaCard} key={publication.id} data-editorial-card data-verified={publication.verified}>
              <article className={styles.mediaInner} aria-labelledby={`publication-${publication.id}-heading`}>
                <p className={styles.source}>{publication.source}</p>
                <p className={styles.date}>{publication.date ?? "Дата уточняется"}</p>
                <h3 id={`publication-${publication.id}-heading`} className={styles.publicationTitle}>{publication.title}</h3>
                <EditorialLink href={publication.verified ? publication.url : null} className={styles.readMore}>Читать</EditorialLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
