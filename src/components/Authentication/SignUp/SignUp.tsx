import { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import {auth } from '../../../auth/firebase'
import './SignUp.scss'

type SignUpProps = {
    toggleSignUp: () => void
    toggleLogin: () => void
    closeAll: () => void
}

const SignUp = ({toggleSignUp, toggleLogin} : SignUpProps) => {
    const usernameRef = useRef<HTMLInputElement>(null)
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
            const userExists = await checkIfUsernameExists()
            if (!userExists) {
                setError("Username already exists")
                setLoading(false)
                return
            }
            await signup(emailRef.current?.value, passwordRef.current?.value);
            auth.currentUser?.updateProfile({
                displayName: usernameRef.current?.value
            })
            await postUser()
            toggleSignUp();
            navigateToMain();
        } catch(error) {
            console.error(error)
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    // FUNCTIONS

    function stopBubbling(e : any) {
        e.stopPropagation()
    }

    async function postUser() {
        const uid = auth.currentUser?.uid
        const resp = await fetch(`http://localhost:8000/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameRef.current?.value,
                    user_email: emailRef.current?.value,
                    uid: uid
                    })
        })
        const data = await resp.json()
        console.log(data)
    }

    async function checkIfUsernameExists() {
        try {
            const res = await fetch(`http://localhost:8000/users/username/${usernameRef.current?.value}`)
            const data = await res.json()
            console.log(data)
            return !data;
        } catch(error) {
            console.error(error)
        }
    }

    function navigateToMain() {
        window.location.href = '/main'
    }



  return (
    <main onClick={toggleSignUp} className='signup--container'>
        <section onClick={stopBubbling} className='signup'>
            <h2 className='signup--title'>Explore your KINJO</h2>
            {error && <div className="error">{error}</div>}
            <form className='signup--form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>USERNAME</label>
                    <input type="text" id="username" ref={usernameRef} required />
                </div>
                <div>
                    <label htmlFor='email'>EMAIL ADDRESS</label>
                    <input type="email" id="email" ref={emailRef} required />
                </div>
                <div>
                    <label htmlFor='password'>PASSWORD</label>
                    <input id="password" type="password" ref={passwordRef} placeholder='At least 6 characters' required />
                </div>
                <div>
                    <label htmlFor='confirmpassword'>CONFIRM PASSWORD</label>
                    <input id='confirmpassword' type="password" ref={passwordConfirmRef} required></input>
                </div>
                <button className='signup--form--submit-btn' type="submit" disabled={loading}>Sign Up</button>
            </form>
            <div className='auth--login-msg'>
                Already have an account? <span className='auth--link' onClick={toggleLogin}>Log In</span>
            </div>
        </section>
    </main>
  )
}

export default SignUp