import Monogram from "./Monogram";

export default function Intro() {
  return (
    <div className="intro" data-intro aria-hidden="true">
      <div className="intro__brand" data-intro-brand>
        <Monogram />
        <span className="intro__name">РУСЛАН РАГИМОВ</span>
        <span className="intro__rule" />
      </div>
    </div>
  );
}
