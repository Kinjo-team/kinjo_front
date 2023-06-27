import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogIn from "../Authentication/LogIn/LogIn";
import SignUp from "../Authentication/SignUp/SignUp";
import ForgotPassword from "../Authentication/ForgotPassword/ForgotPassword";
import UserDropDown from "../UserDropDown/UserDropDown";

type NavbarProps = {
  landingShowLogin?: boolean;
  landingToggleLogin?: () => void;
};

const Navbar = ({landingShowLogin, landingToggleLogin} : NavbarProps) => {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const { currentUser } = useAuth();

  // This is for the app to be able to open the login modal *used for the landing page*
  useEffect(() => {
    if (landingShowLogin) {
      setShowLogin(true);
      landingToggleLogin?.();
    }
  }
  , [landingShowLogin]);
  
  useEffect(() => {
    if (currentUser) {
      fetchUsername();
    }
    return () => {
      setUsername("");
    };
  }, [currentUser]);

  // HANDLERS
  function toggleLogin() {
    setShowLogin(!showLogin);
    setShowSignUp(false);
    setShowForgotPassword(false);
  }

  function toggleSignUp() {
    setShowSignUp(!showSignUp);
    setShowLogin(false);
    setShowForgotPassword(false);
  }

  function toggleForgotPassword() {
    setShowForgotPassword(!showForgotPassword);
    setShowLogin(false);
  }

  function closeAll() {
    setShowLogin(false);
    setShowSignUp(false);
  }

  // FUNCTIONS

  async function fetchUsername() {
    try {
      const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/${currentUser?.uid}`);
      const data = await resp.json();
      setUsername(data.username);
    } catch (error) {
      console.error(error);
    }
  }

  function navigateToLanding() {
    window.location.href = "/";
  }

  return (
    <>
      {showLogin && (
        <LogIn
          toggleLogin={toggleLogin}
          toggleSignUp={toggleSignUp}
          toggleForgotPassword={toggleForgotPassword}
          closeAll={closeAll}
        />
      )}
      {showSignUp && (
        <SignUp
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
          closeAll={closeAll}
        />
      )}
      {showForgotPassword && (
        <ForgotPassword 
          toggleForgotPassword={toggleForgotPassword}
          toggleLogin={toggleLogin}
          toggleSignUp={toggleSignUp}
          closeAll={closeAll}
        />
      )}
      <nav>
        <div className="title" onClick={navigateToLanding}>
          <div className="kanji">
            <h1>近</h1>
            <h1 className="kanji-bottom">所</h1>
          </div>
            <h1>K I N J O</h1>
        </div>
        {/* <LanguageToggle /> */}
        <div className="btn-grp">
          <a className="nav-btn" href="/main">{t("landingPageHeaderHome")}</a>
          {currentUser ? (
            <UserDropDown username={username} />
          ) : (
            <>
              <button className="nav-btn" onClick={toggleLogin}>
                {t("landingPageHeaderLogin")}
              </button>
              <button className="nav-btn" onClick={toggleSignUp}>
                {t("landingPageHeaderSignUp")}
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
