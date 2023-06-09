import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import './SignUp.scss'

type SignUpProps = {
    toggleSignUp: () => void
    toggleLogin: () => void
    closeAll: () => void
}

const SignUp = ({toggleSignUp, toggleLogin} : SignUpProps) => {
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
            alert("Thank you for signing up!")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    function stopBubbling(e : any) {
        e.stopPropagation()
    }


  return (
    <main onClick={toggleSignUp} className='signup--container'>
        <section onClick={stopBubbling} className='signup'>
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
                Already have an account? <span className='auth--link' onClick={toggleLogin}>Log In</span>
            </div>
        </section>
    </main>
  )
}

export default SignUp