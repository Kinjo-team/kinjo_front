import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogIn from "../Authentication/LogIn/LogIn";
import SignUp from "../Authentication/SignUp/SignUp";

const Navbar = () => {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showLogOut, setShowLogOut] = useState<boolean>(false);
  const {logout } = useAuth();

  const user = useAuth().currentUser;

  
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

  return (
    <>
      {showLogin && <LogIn toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} closeAll={closeAll} />}
      {showSignUp && <SignUp toggleSignUp={toggleSignUp} toggleLogin={toggleLogin} closeAll={closeAll} />}
      <nav>
        <h1 className="title">K I N J O</h1>
        <div className="btn-grp">
          <a href="/">{t("landingPageHeaderHome")}</a>
          {user ? <button onClick={logout}>Log Out</button>
          :
          (
            <>
              <button onClick={toggleLogin}>{t("landingPageHeaderLogin")}</button>
              <button onClick={toggleSignUp}>{t("landingPageHeaderSignUp")}</button>
            </>
          )
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
