import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import "./Landing.scss";
// VIDEO
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
const landingVideo = require("../../assets/videos/landing.mp4");
// PICTURE
const landingInfoPic = require("../../assets/images/landinginfopic.png");

const Landing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState<boolean>(false);

  // HANDLERS
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (currentUser !== null) navigate("/main");
    else {
      landingToggleLogin();
    }
  }

  function landingToggleLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <>
      <main className="landing--container">
        <Parallax pages={1}>
          <ParallaxLayer offset={0} speed={2}>
            <video src={landingVideo} autoPlay loop muted playsInline preload="auto" />
          </ParallaxLayer>
          <ParallaxLayer offset={0} speed={0.5}>
            <div className="title">
              <div className="logo">
                <div className="kanji">
                  <h1>近</h1>
                  <h1 className="kanji-bottom">所</h1>
                </div>
                  <h1>K I N J O</h1>
              </div>
              <p>{t("landingPageSubText")}</p>
              <button onClick={handleClick}>{t("landingPageButton")}</button>
            </div>
          </ParallaxLayer>
        </Parallax>
      </main>
      <Navbar
        landingShowLogin={showLogin}
        landingToggleLogin={landingToggleLogin}
      />
      <main className="landing--info--container">
        <p className="info--section">
          <h2>Find hidden gems in Japan</h2>
          <p>
            Discover places off the beaten path, recommended by locals!
            <br></br>
            This is Japan that you have never experienced before.
          </p>
        </p>
        <div className="img--container">
          <img src={landingInfoPic} alt="Places Collage" />
        </div>
      </main>
      <Footer text={"Kinjo v1.0.0"} />
    </>
  );
};

export default Landing;
