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
        <div className="title">
          <h1>K I N J O</h1>
          <p>{t("landingPageSubText")}</p>
          <button onClick={handleClick}>{t("landingPageButton")}</button>
        </div>
      </main>
      <main className="landing--info--container">
        <h2>Find hidden gems in Japan</h2>
        <p className="info--section">
            Discover places off the beaten path, recommended by locals! 
            <br></br>
            This is Japan that you have never experienced before.
        </p>
        <div className="img--container">
          <img src="" alt="Places Collage" />
        </div>
      </main>
    </>
  );
};

export default Landing;
