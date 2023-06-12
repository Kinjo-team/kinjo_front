import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './ForgotPassword.scss'

const ForgotPassword = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const { resetPassword } = useAuth()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    async function handleSubmit(e : any) {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current?.value);
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }
    

  return (
    <main className='forgotpassword--container'>
        <section className='forgotpassword'>
            <h2 className="title">Password Reset</h2>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
            <form className='forgotpassword--form' onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" ref={emailRef} required></input>
                </div>
                <button type="submit" disabled={loading}>Reset Password</button>
            </form>
            <div>
                {/* <Link to="/login">Log In</Link> */}
            </div>
            <div>
                {/* Don't have an account? <Link to="/signup">Sign Up!</Link> */}
            </div>
        </section>
    </main>
    )
}

export default ForgotPassword