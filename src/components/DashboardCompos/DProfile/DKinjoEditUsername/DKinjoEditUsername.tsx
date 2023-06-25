import React, {useState, useRef, FormEvent} from 'react'
import {useAuth} from '../../../../contexts/AuthContext'

import './DKinjoEditUsername.scss'

type DKinjoEditUsernameProps = {
    toggleShowEditUsername: () => void,
}

const DKinjoEditUsername = ({toggleShowEditUsername} : DKinjoEditUsernameProps) => {
    const [error, setError] = useState<String>("")
    const { currentUser } = useAuth()
    const usernameRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            const newUsername = usernameRef.current?.value;
            if (newUsername) {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}users/name/${newUsername}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firebase_uuid: currentUser?.uid,
                    })
                })
                if (res.ok) {
                    toggleShowEditUsername()
                    window.location.reload()

                } else {
                    setError('Username already exists')
                }
        } else {
            setError('Username cannot be empty')
        }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div onClick={toggleShowEditUsername} className='editusername--overlay'>
        <div onClick={(event) => event.stopPropagation()} className='editusername--container'>
            <h1>Enter new username</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <input ref={usernameRef} minLength={3} maxLength={16} type="text" />
                <button type='submit'>Change Username</button>
            </form>
        </div>
    </div>
  )
}

export default DKinjoEditUsername