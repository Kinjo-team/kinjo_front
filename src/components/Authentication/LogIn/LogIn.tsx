import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './LogIn.scss'

const LogIn = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login } = useAuth()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    async function handleSubmit(e : any) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current?.value, passwordRef.current?.value);
            navigate("/")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }
    

  return (
    <main className='login--container'>
        <section className='login'>
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
              <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <div>
              Don't have an account? <Link to="/signup">Sign Up!</Link>
          </div>
        </section>
    </main>
    )
}

export default LogIn