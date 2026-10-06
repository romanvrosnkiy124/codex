import { Arrow, LineIcon, type IconName } from "./LineIcon";

const areas: { title: string; icon: IconName }[] = [
  { title: "Гражданские споры", icon: "document" },
  { title: "Арбитражные дела", icon: "briefcase" },
  { title: "Административные дела", icon: "shield" },
  { title: "Трудовые споры", icon: "people" },
  { title: "Взыскание задолженности", icon: "coins" },
  { title: "Споры с ФАС и РНП", icon: "document" },
];

export default function PracticeAreas() {
  return (
    <section id="practices" className="practices" aria-labelledby="practices-heading" data-practices>
      <div className="container">
        <div className="practices__heading" data-practice-heading><h2 id="practices-heading">Основные направления практики</h2><a className="text-link" href="#practice-grid">Все направления <Arrow /></a></div>
        <ul className="practice-grid" id="practice-grid">
          {areas.map(({ title, icon }) => <li key={title} className="practice-card" data-practice-card><LineIcon name={icon} /><h3>{title}</h3><Arrow className="practice-card__arrow" /></li>)}
        </ul>
      </div>
      <div className="next-section-hint" aria-hidden="true"><div className="container"><span /><span /></div></div>
    </section>
  );
}
