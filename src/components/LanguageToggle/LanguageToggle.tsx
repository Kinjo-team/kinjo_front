import { useTranslation } from "react-i18next";
import "./LanguageToggle.scss"

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="toggle--container">
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ja")}>JP</button>
    </div>
  );
};

export default LanguageToggle;
