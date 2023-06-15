import React from 'react'
import "./DProfile.scss"
const defaultUserImage = require('../../../assets/images/defaultuser.png')

type DProfileProps = {
    username: string,
    email: string
}

const DProfile = ({username, email} : DProfileProps) => {
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
            <button className='dprofile-edit-btn' type='button'><span className="material-symbols-outlined">edit</span>Edit Username</button>
        </div>
    </>
  )
}

export default DProfile