import "./Navbar.scss";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav>
      <h1 className="title">K I N J O</h1>
      <div className="btn-grp">
        <a href="/">{t("landingPageHeaderHome")}</a>
        <a href="/login">{t("landingPageHeaderLogin")}</a>
        <a href="/signup">{t("landingPageHeaderSignUp")}</a>
      </div>
    </nav>
  );
};

export default Navbar;
