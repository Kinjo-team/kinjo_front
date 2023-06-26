import React from "react";
import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";
import ItineraryView from "./pages/ItineraryView/ItineraryView";
import ProfileDashboard from "./pages/ProfileDashboard/ProfileDashboard";
import OtherUsersProfile from "./pages/OtherUsersProfile/OtherUsersProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/TOSPage/TOSPage";
import Jobs from "./pages/Jobs/Jobs";
import ContactUs from "./pages/Contact Us/ContactUs";


// Language use
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Authentication use
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {

  // This baby protects the routes will use later down the line
  const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/" replace />;
  };


  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider value>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="main"
                element={
                  <PrivateWrapper>
                    <Main />
                  </PrivateWrapper>
                }
              />
              <Route path="/kinjo/:id" element={<ItineraryView />} />
              <Route 
                  path="/profile" 
                  element={
                    <PrivateWrapper>
                      <ProfileDashboard />
                    </PrivateWrapper>
                  } 
              />
              <Route 
                  path="/profile/:username" 
                  element={<PrivateWrapper>
                    <OtherUsersProfile />
                  </PrivateWrapper>} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/tos" element={<TermsOfService />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
