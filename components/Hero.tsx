import Image from "next/image";
import ContactButton from "./ContactButton";
import { Arrow } from "./LineIcon";
import RevealText from "./RevealText";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading" data-hero>
      <div className="hero__visual" data-portrait-mask>
        <div className="hero__parallax" data-portrait-parallax>
          <div className="hero__image" data-portrait-image>
            <Image src="/images/ruslan/ruslan-02.jpg" alt="Руслан Рагимов в деловом костюме в кабинете" fill preload sizes="(max-width: 767px) 100vw, 70vw" quality={85} />
          </div>
        </div>
      </div>
      <div className="hero__wash" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content" data-hero-content>
          <p className="eyebrow" data-hero-eyebrow>РУСЛАН РАГИМОВ</p>
          <h1 id="hero-heading" className="hero__heading" aria-label="Защищаю интересы людей и бизнеса.">
            <RevealText>Защищаю</RevealText>
            <RevealText>интересы</RevealText>
            <RevealText accent>людей и бизнеса.</RevealText>
          </h1>
          <p className="hero__subline" data-hero-detail><span>Судебные споры · Арбитраж · Административные дела</span><span>Трудовые споры · Взыскание задолженности</span></p>
          <div className="hero__rule" data-hero-detail aria-hidden="true" />
          <p className="hero__description" data-hero-detail>Практикующий юрист. Ведущий партнёр SUDNOTICE.<br className="desktop-break" />{" "}Представительство в судах и комплексное сопровождение юридических споров по всей России.</p>
          <div className="hero__actions" data-hero-actions>
            <ContactButton />
            <a className="button button--outline" href="#practices"><span>Смотреть практику</span><Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
