import React, {useState, useEffect} from 'react'

import "./OUProfile.scss"

type OUProfileProps = {
    username: string | undefined,
    userImage: string | undefined
}

const OUProfile = ({username, userImage} : OUProfileProps) => {
    const [followers, setFollowers] = useState<any[]>([])
    const [following, setFollowing] = useState<any[]>([])

    useEffect(() => {
        fetchFollowers()
        fetchFollowing()
    }, [])
    
    // HANDLERS

    // FUNCTIONS
    async function fetchFollowers() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}followers/number/${username}`)
            const data = await res.json()
            setFollowers(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchFollowing() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}following/number/${username}`)
            const data = await res.json()
            setFollowing(data)
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <>
        <div className='dprofile--container'>
            <div className='dprofile-image'>
                <img src={userImage} alt="user" />
            </div>
            <div className='dprofile-info'>
                <h1>{username}</h1>
                <div className='dprofile-followers'>
                    <div className='follow-box'>
                        <p>Followers</p>
                        <p>{followers}</p>
                    </div>
                    <div className='follow-box'>
                        <p>Following</p>
                        <p>{following}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OUProfile