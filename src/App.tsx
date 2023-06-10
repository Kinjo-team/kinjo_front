import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LanguageToggle from "./components/LanguageToggle";

// Authentication use
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/Authentication/SignUp/SignUp";
import LogIn from "./components/Authentication/LogIn/LogIn";
import ForgotPassword from "./components/Authentication/ForgotPassword/ForgotPassword";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  // This baby protects the routes will use later down the line
  const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider value>
          <Navbar />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        <LanguageToggle />
      </I18nextProvider>
    </>
  );
};

export default App;
