import "./Landing.scss";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <main className="landing--container">
      <h1>K I N J O</h1>
      <p>{t("landingPageSubText")}</p>
      <button>{t("landingPageButton")}</button>
    </main>
  );
};

export default Landing;
