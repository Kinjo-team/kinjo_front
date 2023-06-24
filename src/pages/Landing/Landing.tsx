import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";

import "./Landing.scss";
// VIDEO
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
const landingVideo = require("../../assets/videos/landing.mp4");
// PICTURE
const landingInfoPic = require("../../assets/images/landinginfopic.png");
const aboutInfoPic = require("../../assets/images/kinjo_map.png");

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
      <LanguageToggle />
      <main className="landing--container">
        <Parallax pages={1}>
          <ParallaxLayer offset={0} speed={2}>
            <video
              src={landingVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
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
          <h2>About Kinjo</h2>
          <p>
            <i>Kinjo (近所)</i>, meaning "neighborhood" in Japanese, is your
            ultimate guide to discovering and sharing community gems of Japan.
            In a country known for its compact architecture and tourist
            hubspots, often times it's easy to overlook potential points of
            interest hidden in plain sight. Whether you're a passionate local
            guide eager to showcase your neighborhood's hole-in-the-wall spots
            or an intrepid explorer seeking alternative destinations, from our{" "}
            <i>kinjo</i> to yours, we invite you to join our community and
            embark on a journey of discovery, where what may be off-the-beaten
            path for some is an opportunity to uncover the true essence of Japan
            for others.
          </p>
        </p>
        <div className="img--container">
          <img src={aboutInfoPic} alt="kinjo map" />
          <img src={landingInfoPic} alt="Places Collage" />
        </div>
      </main>
      <Footer text={"Kinjo v1.0.0"} />
    </>
  );
};

export default Landing;
