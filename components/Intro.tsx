import { siteConfig } from "../lib/site-config";
import Monogram from "./Monogram";

export default function Intro() {
  return (
    <div className="intro" data-intro aria-hidden="true">
      <div className="intro__brand" data-intro-brand>
        <Monogram />
        <span className="intro__name">{siteConfig.personName.toLocaleUpperCase("ru-RU")}</span>
        <span className="intro__rule" />
      </div>
    </div>
  );
}
