import CreateItinerary from "./components/CreateItinerary/CreateItinerary"

const App = () => {

// This baby protects the routes will use later down the line
const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useAuth()
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
