import { allReviewsUrl, reviews } from "../lib/reviews-content";
import EditorialLink from "./EditorialLink";
import styles from "./EditorialSections.module.css";

export default function ReviewsSection() {
  return (
    <section id="reviews" className={styles.reviews} aria-labelledby="reviews-heading" data-editorial-section>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div>
            <p className="eyebrow" data-editorial-reveal>ОТЗЫВЫ КЛИЕНТОВ</p>
            <h2 id="reviews-heading" className={styles.heading}>
              <span className={styles.headingMask}><span data-editorial-heading>Доверие, которое</span></span>
              <span className={`${styles.headingMask} ${styles.accent}`}><span data-editorial-heading>говорит само за себя.</span></span>
            </h2>
          </div>
          <div className={styles.headerLink} data-editorial-reveal><EditorialLink href={allReviewsUrl}>Все отзывы</EditorialLink></div>
        </div>
        <ul className={styles.reviewsGrid} aria-label="Отзывы">
          {reviews.map((review) => (
            <li className={styles.reviewCard} key={review.id} data-editorial-card data-verified={review.verified}>
              <article className={styles.reviewInner} aria-labelledby={`review-${review.id}-name`}>
                <div className={styles.reviewBody}>
                  <span className={styles.initials} aria-hidden="true">{review.initials}</span>
                  <div>
                    <span className={styles.quoteMark} aria-hidden="true">“</span>
                    <blockquote className={styles.reviewText}>{review.text}</blockquote>
                  </div>
                </div>
                <footer className={styles.reviewAuthor}>
                  <p id={`review-${review.id}-name`} className={styles.reviewName}>{review.name}</p>
                  <p className={styles.reviewRole}>{review.role}</p>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
