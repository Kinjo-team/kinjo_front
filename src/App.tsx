import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LanguageToggle from "./components/LanguageToggle";

const App = () => {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Navbar />
        <Landing />
        <LanguageToggle />
      </I18nextProvider>
    </>
  );
};

export default App;
