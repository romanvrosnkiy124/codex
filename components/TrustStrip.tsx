import { LineIcon, type IconName } from "./LineIcon";

const items: { icon: IconName; lines: [string, string] }[] = [
  { icon: "scales", lines: ["Более 13 лет", "юридического стажа"] },
  { icon: "court", lines: ["Представительство", "в судах по всей России"] },
  { icon: "document", lines: ["Сложные и нестандартные", "юридические задачи"] },
  { icon: "people", lines: ["Частные клиенты", "и бизнес"] },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Опыт и направления работы" data-trust>
      <ul className="container trust-strip__grid">
        {items.map(({ icon, lines }) => <li className="trust-item" key={icon} data-trust-item><LineIcon name={icon} /><p>{lines[0]}<br />{lines[1]}</p></li>)}
      </ul>
    </section>
  );
}
