import React, {useState} from 'react'
import DKinjoEditUsername from '../DKinjoEditUsername/DKinjoEditUsername'

import "./DProfile.scss"
const defaultUserImage = require('../../../assets/images/defaultuser.png')

type DProfileProps = {
    username: string,
    email: string
}

const DProfile = ({username, email} : DProfileProps) => {
    const [showEditUsername, setShowEditUsername] = useState(false)


    function toggleShowEditUsername() {
        setShowEditUsername(!showEditUsername)
    }

  return (
    <>
        <div className='dprofile--container'>
            <div className='dprofile-image'>
                <img src={defaultUserImage} alt="user" />
            </div>
            <div className='dprofile-info'>
                <h1>{username}</h1>
                <p>{email}</p>
                <div className='dprofile-followers'>
                    <p>Followers</p>
                    <p>Following</p>
                </div>
            </div>
            <button className='dprofile-edit-btn' onClick={toggleShowEditUsername} type='button'><span className="material-symbols-outlined">edit</span>Edit Username</button>
        </div>
        {showEditUsername && <DKinjoEditUsername toggleShowEditUsername={toggleShowEditUsername} />}
    </>
  )
}

export default DProfile