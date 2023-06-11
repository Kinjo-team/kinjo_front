import "./Landing.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type LandingProps = {
  appShowLogin: () => void;
};

const Landing = ({appShowLogin} : LandingProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {currentUser} = useAuth();


  function handleClick() {
    if (currentUser !== null)
      navigate("/main");
    else {
      appShowLogin();
    } 
  }

  return (
    <>
      <main className="landing--container">
        <h1>K I N J O</h1>
        <p>{t("landingPageSubText")}</p>
        <button onClick={handleClick}>{t("landingPageButton")}</button>
      </main>
    </>
  );
};

export default Landing;
