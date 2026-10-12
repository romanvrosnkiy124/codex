import Link from "next/link";
import styles from "../components/DocumentPage.module.css";

export default function NotFound() {
  return (
    <main className={`${styles.page} ${styles.notFound}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.heading}>Страница не найдена</h1>
      <Link href="/" className="button button--primary">Вернуться на главную</Link>
    </main>
  );
}
