import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogIn from "../Authentication/LogIn/LogIn";
import SignUp from "../Authentication/SignUp/SignUp";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import UserDropDown from "../UserDropDown/UserDropDown";

type NavbarProps = {
  landingShowLogin?: boolean;
  landingToggleLogin?: () => void;
};

const Navbar = ({landingShowLogin, landingToggleLogin} : NavbarProps) => {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
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
  }

  function toggleSignUp() {
    setShowSignUp(!showSignUp);
    setShowLogin(false);
  }
  function closeAll() {
    setShowLogin(false);
    setShowSignUp(false);
  }

  // FUNCTIONS

  async function fetchUsername() {
    const resp = await fetch(`http://localhost:8000/users/${currentUser?.uid}`);
    const data = await resp.json();
    console.log(data);
    setUsername(data.username);
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
      <nav>
        <h1 className="title" onClick={navigateToLanding}>
          K I N J O
        </h1>
        <LanguageToggle />
        <div className="btn-grp">
          <a href="/">{t("landingPageHeaderHome")}</a>
          {currentUser ? (
            <UserDropDown username={username} />
          ) : (
            <>
              <button onClick={toggleLogin}>
                {t("landingPageHeaderLogin")}
              </button>
              <button onClick={toggleSignUp}>
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
