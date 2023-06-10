import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './LogIn.scss'

type LogInProps = {
    toggleLogin: () => void
    toggleSignUp: () => void
    closeAll: () => void
}

const LogIn = ({toggleLogin, toggleSignUp, closeAll} : LogInProps) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login, currentUser } = useAuth()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(e : any) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current?.value, passwordRef.current?.value);
            closeAll()
            alert("Welcome back, " + currentUser?.email + "!")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }

    function stopBubbling(e : any) {
        e.stopPropagation()
    }
    

  return (
    <main onClick={toggleLogin} className='login--container'>
        <section onClick={stopBubbling} className='login'>
            <h2 className="title">Log In</h2>
            {error && <div className="error">{error}</div>}
            <form className='login--form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='Email'>Email</label>
                    <input type="email" ref={emailRef} required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type="password" ref={passwordRef} required />
                </div>
                <button type="submit" disabled={loading}>Log In</button>
            </form>
          <div>
              <span>Forgot Password?</span>
          </div>
          <div>
              <span>Don't have an account? <span className='auth--link' onClick={toggleSignUp}>Sign Up!</span></span>
          </div>
        </section>
    </main>
    )
}

export default LogIn