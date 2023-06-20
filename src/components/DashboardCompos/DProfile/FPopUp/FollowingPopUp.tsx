import React from 'react'
import {Link} from 'react-router-dom'

type FollowingPopUpProps = {
    toggleFollowingPopUp: () => void,
    following: string[]
}

const FollowingPopUp = ({following, toggleFollowingPopUp} : FollowingPopUpProps) => {
  return (
    <div className='popup--overlay'>
        <div className='popup--container'>
            <button
                className="close-btn"
                onClick={toggleFollowingPopUp}
            >
            <span className="material-symbols-outlined">cancel</span>
            </button>
            <h2>Following</h2>
            {following.map((followed: string) => {
                return (
                    <Link to={`/profile/${followed}`} key={followed}>
                        <div>{followed}</div>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default FollowingPopUp