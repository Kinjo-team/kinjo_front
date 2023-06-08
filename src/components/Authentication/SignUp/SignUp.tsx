import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './SignUp.scss'

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const { signup } = useAuth()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(e : any) {
        e.preventDefault()

        if (passwordConfirmRef.current?.value !== passwordRef.current?.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current?.value, passwordRef.current?.value)
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }
  return (
    <main className='signup--container'>
        <section className='signup'>
            <h2 className='title'>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            <form className='signup--form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input type="text" id="username" required />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id="password" type="password" ref={passwordRef} placeholder='At least 6 characters' required />
                </div>
                <div>
                    <label htmlFor='confirmpassword'>Confirm Password: </label>
                    <input id='confirmpassword' type="password" ref={passwordConfirmRef} required></input>
                </div>
                <button type="submit" disabled={loading}>Sign Up</button>
            </form>
            <div className='auth--login-msg'>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </section>
    </main>
  )
}

export default SignUp