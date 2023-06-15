import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './ForgotPassword.scss'

type ForgotPasswordProps = {
    toggleForgotPassword: () => void
    toggleLogin: () => void
    toggleSignUp: () => void
    closeAll: () => void;
}

const ForgotPassword = ({toggleForgotPassword, toggleLogin, toggleSignUp, closeAll} : ForgotPasswordProps) => {
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

    function stopBubbling(e : any) {
        e.stopPropagation()
    }
    

  return (
    <main onClick={toggleForgotPassword} className='forgotpassword--container'>
        <section onClick={stopBubbling} className='forgotpassword'>
            <h2 className="title">Password Reset</h2>
            {error && <div className="error">{error}</div>}
            {message && <div className="success">{message}</div>}
            <form className='forgotpassword--form' onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" ref={emailRef} required></input>
                </div>
                <button className='forgotpassword--form--submit-btn' type="submit" disabled={loading}>Reset Password</button>
            </form>
            <div>
                <span className='auth--link' onClick={toggleLogin}>Log In</span>
            </div>
            <div>
                Don't have an account? <span className='auth--link' onClick={toggleSignUp}>Sign Up!</span>
            </div>
        </section>
    </main>
    )
}

export default ForgotPassword