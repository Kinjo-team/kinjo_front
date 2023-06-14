import React from "react";
import { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./LogIn.scss";

type LogInProps = {
  toggleLogin: () => void;
  toggleSignUp: () => void;
  closeAll: () => void;
};

const LogIn = ({ toggleLogin, toggleSignUp, closeAll }: LogInProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current?.value, passwordRef.current?.value);
      navigateToMain();
      toggleLogin();
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  function stopBubbling(e: any) {
    e.stopPropagation();
  }

  function navigateToMain() {
    window.location.href = "/main";
  }

  return (
    <main onClick={toggleLogin} className="login--container">
      <section onClick={stopBubbling} className="login">
        <h2 className="login-title">Log in to KINJO</h2>
        {error && <div className="error">{error}</div>}
        <form className="login--form" onSubmit={handleSubmit}>
          <div className="login--form--section">
            <label htmlFor="Email">EMAIL ADDRESS</label>
            <input type="email" ref={emailRef} required></input>
          </div>
          <div className="login--form--section">
            <label htmlFor="password">PASSWORD</label>
            <input type="password" ref={passwordRef} required />
          </div>
          <button
            className="login--form--submit-btn"
            type="submit"
            disabled={loading}
          >
            Log In
          </button>
        </form>
        <div>
          <span>Forgot Password?</span>
        </div>
        <div>
          <span>
            Don't have an account?{" "}
            <span className="auth--link" onClick={toggleSignUp}>
              Sign Up!
            </span>
          </span>
        </div>
      </section>
    </main>
  );
};

export default LogIn;
