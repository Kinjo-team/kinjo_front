import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";
import ItineraryView from "./pages/ItineraryView/ItineraryView";

// Language use
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Authentication use
import { useAuth } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  // const [showLogin, setShowLogin] = useState<boolean>(false);

  // This baby protects the routes will use later down the line
  const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/" replace />;
  };

  // function toggleLogin() {
  //   setShowLogin(!showLogin);
  // }


  return (
    <>
      <I18nextProvider i18n={i18n}>
        <AuthProvider value>
          {/* <Navbar  appToggleLogin={toggleLogin} appShowLogin={showLogin} /> */}
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Landing />}
              />
              <Route
                path="main"
                element={
                  <PrivateWrapper>
                    <Main />
                  </PrivateWrapper>
                }
              />
              <Route path="/itinerary/:id" element={<ItineraryView />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </I18nextProvider>
    </>
  );
};

export default App;
