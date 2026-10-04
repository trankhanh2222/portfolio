import { useWipe } from "../context/WipeContext.jsx";

// Cutscene doi ngon ngu: ba dai muc dung len theo nhip lech, mot duong accent
// ke ngang khi da phu kin, roi ca ba truot di. Thuan hinh hoc, khong chu.
// Trang thai nam o LanguageContext de doi ngon ngu dung luc dang bi che.
export function LanguageWipe() {
  const { wiping, endWipe } = useWipe();
  return (
    <div
      className={"lang-wipe" + (wiping ? " is-active" : "")}
      aria-hidden="true"
    >
      <span className="lang-wipe__col" />
      <span className="lang-wipe__col" />
      {/* Cot cuoi cung ket thuc tre nhat (co delay), dung no de tat overlay. */}
      <span className="lang-wipe__col" onAnimationEnd={endWipe} />
      <span className="lang-wipe__rule" />
    </div>
  );
}