import React from "react";
import { useRef, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./LogIn.scss";

const googleIcon = require("../../../assets/icons/googleIcon.png")

type LogInProps = {
    toggleLogin: () => void
    toggleSignUp: () => void
    toggleForgotPassword: () => void
    closeAll: () => void
}

const LogIn = ({toggleLogin, toggleSignUp, toggleForgotPassword, closeAll} : LogInProps) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login, signInWithGoogle } = useAuth()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)


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

  async function handleGoogleSignIn() {
    try {
        setLoading(true);
        const userCredential = await signInWithGoogle();
        const { user } = userCredential;
        if (user) {
            const username = user.displayName || generateTemporaryUsername(user);
            const exists = await checkIfUsernameExists(username);
            if (!exists) {
                await postUser(username, user.email, user.uid);
            }
            navigateToMain();
            toggleLogin();
        }
    } catch (error) {
        setError("Failed to sign in with Google");
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  function generateTemporaryUsername(user : any) {
    return user.email.split('@')[0];
  }

  async function checkIfUsernameExists(username : any) {
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/username/${username}`)
        const data = await res.json()
        return data;
    } catch(error) {
        console.error(error)
    }
} 

async function postUser(username : string, email : string, uid : string) {

  const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}users`, {

      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              user_email: email,
              uid: uid
              })
  })
  const data = await resp.json()
}

  function stopBubbling(e: any) {
    e.stopPropagation();
  }

  function navigateToMain() {
    window.location.href = "/main";
  }

    return (
    <main onClick={toggleLogin} className='login--container'>
        <section onClick={stopBubbling} className='login'>
        <button onClick={toggleLogin} className='close-btn'>X</button>
            <button 
              className='login--form--google-btn' 
              type="button" 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              >
              <img className="login--google-icon" src={googleIcon} alt="google logo" />
              Log In With Google
            </button>
            <h2>OR</h2>
            {error && <div className="error">{error}</div>}
            <form className='login--form' onSubmit={handleSubmit}>
                <div className='login--form--section'>
                    <label htmlFor='Email'>EMAIL ADDRESS</label>
                    <input type="email" ref={emailRef} required></input>
                </div>
                <div className='login--form--section'>
                    <label htmlFor='password'>PASSWORD</label>
                    <input type="password" ref={passwordRef} required />
                </div>
                <button className='login--form--submit-btn' type="submit" disabled={loading}>Log In</button>
            </form>
          <div>
              <span className='auth--link' onClick={toggleForgotPassword}>Forgot Password?</span>
          </div>
          <div>
              <span>Don't have an account? <span className='auth--link' onClick={toggleSignUp}>Sign Up!</span></span>
          </div>
        </section>
    </main>
    )
}

export default LogIn;
