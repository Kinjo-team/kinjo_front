import React, {useState, useEffect} from 'react'
import DKinjoEditUsername from './DKinjoEditUsername/DKinjoEditUsername'
import FollowerPopUp from './FPopUp/FollowPopUp'
import FollowingPopUp from './FPopUp/FollowingPopUp'
import DUploadWidget from './DUploadWidget/DUploadWidget'
import { useAuth } from '../../../contexts/AuthContext'

import "./DProfile.scss"

type DProfileProps = {
    username: string,
    email: string,
    userImage: string
}

const DProfile = ({username, email, userImage} : DProfileProps) => {
    const [showEditUsername, setShowEditUsername] = useState(false)
    const [followers, setFollowers] = useState<any[]>([])
    const [following, setFollowing] = useState<any[]>([])
    const [showFollowerPopUp, setShowFollowerPopUp] = useState(false)
    const [showFollowingPopUp, setShowFollowingPopUp] = useState(false)
    const {currentUser} = useAuth()

    useEffect(() => {
        fetchFollowers()
        fetchFollowing()
    }, [])
    
    // HANDLERS
    function toggleShowEditUsername() {
        setShowEditUsername(!showEditUsername)
    }

    function toggleFollowerPopUp() {
        setShowFollowerPopUp(!showFollowerPopUp)
    }

    function toggleFollowingPopUp() {
        setShowFollowingPopUp(!showFollowingPopUp)
    }

    // FUNCTIONS
    async function fetchFollowers() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}followers/${currentUser?.uid}`)
            const data = await res.json()
            setFollowers(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function fetchFollowing() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}following/${currentUser?.uid}`)
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
                <p>{email}</p>
                <div className='dprofile-followers'>
                    <div className='follow-box'>
                        <p>Followers</p>
                        <p className='follow-link' onClick={toggleFollowerPopUp}>{followers.length}</p>
                    </div>
                    <div className='follow-box'>
                        <p>Following</p>
                        <p className='follow-link' onClick={toggleFollowingPopUp}>{following.length}</p>
                    </div>
                </div>
            </div>
            <DUploadWidget text='Change Profile Picture'/>
            <button className='dprofile-edit-btn' onClick={toggleShowEditUsername} type='button'><span className="material-symbols-outlined">edit</span>Edit Username</button>
        </div>
        {showEditUsername && <DKinjoEditUsername toggleShowEditUsername={toggleShowEditUsername} />}
        {showFollowerPopUp && <FollowerPopUp toggleFollowerPopUp={toggleFollowerPopUp} followers={followers} />}
        {showFollowingPopUp && <FollowingPopUp toggleFollowingPopUp={toggleFollowingPopUp} following={following} />}
    </>
  )
}

export default DProfile