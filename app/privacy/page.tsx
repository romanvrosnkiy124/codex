import type { Metadata } from "next";
import Link from "next/link";
import Monogram from "../../components/Monogram";
import styles from "../../components/DocumentPage.module.css";
import { siteConfig } from "../../lib/site-config";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Информация об обращениях через мессенджеры и использовании данных на сайте Руслана Рагимова.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Политика конфиденциальности — ${siteConfig.personName}`,
    description: "Информация об обращениях через мессенджеры и использовании данных на сайте.",
    url: "/privacy",
    siteName: siteConfig.siteName,
    type: "website",
    locale: "ru_RU",
    images: [{ url: siteConfig.social.image, width: siteConfig.social.width, height: siteConfig.social.height, alt: siteConfig.social.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Политика конфиденциальности — ${siteConfig.personName}`,
    description: "Информация об обращениях через мессенджеры и использовании данных на сайте.",
    images: [{ url: siteConfig.social.image, alt: siteConfig.social.alt }],
  },
};

// TODO: Финально проверить юридический текст политики перед production,
// включая фактическую обработку обращений и условия используемого хостинга.
export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.homeLink} aria-label={`${siteConfig.personName} — на главную`}>
        <Monogram />
        <span className={styles.brandName}>{siteConfig.personName}</span>
      </Link>

      <p className={styles.eyebrow}>ИНФОРМАЦИЯ О ДАННЫХ</p>
      <h1 className={styles.heading}>Политика конфиденциальности</h1>
      <p className={styles.intro}>
        Эта страница описывает использование сведений при посещении сайта и добровольном обращении к Руслану Рагимову через мессенджер.
      </p>

      <section className={styles.section} aria-labelledby="privacy-site">
        <h2 id="privacy-site">Использование сайта</h2>
        <p>
          На сайте нет форм для ввода персональных данных. Системы веб-аналитики, рекламные пиксели и cookies для отслеживания посетителей не подключены.
        </p>
        <p>
          Техническая инфраструктура хостинга может обрабатывать стандартные сведения запроса, например IP-адрес и тип браузера, для доставки страниц и обеспечения безопасности. Условия такой обработки определяются используемым сервисом хостинга.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-messengers">
        <h2 id="privacy-messengers">Обращения через мессенджеры</h2>
        <p>
          При переходе в мессенджер вы покидаете сайт. В обращении вы можете добровольно сообщить имя, контактные сведения и информацию о своей ситуации. Эти сведения используются для ответа на ваше обращение и обсуждения возможных дальнейших действий.
        </p>
        <p>
          Переписка и передаваемые файлы обрабатываются также самим мессенджером в соответствии с его правилами и политикой конфиденциальности. Сайт не получает содержание переписки автоматически.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">Изменения обработки данных</h2>
        <p>
          Если на сайте появятся формы, аналитика или cookies, требующие отдельного уведомления или согласия, информация об их использовании будет добавлена в эту политику до их подключения. Сейчас эти инструменты не используются.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="privacy-contact">
        <h2 id="privacy-contact">Вопросы о данных</h2>
        <p>
          Для вопросов об обращении, уточнения переданных сведений или запроса об их удалении используйте подтверждённый контакт в Telegram: {" "}
          <a href={siteConfig.telegramUrl} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
            @ragimovlaw
          </a>.
        </p>
      </section>

      <Link href="/" className={styles.backLink}>Вернуться на главную</Link>
    </main>
  );
}
