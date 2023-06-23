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
                X
            </button>
            <h2>Following</h2>
            <div className='follow-card-container'>
                {following.map((followed: any) => {
                    return (
                        <Link to={`/profile/${followed.username}`} key={followed.username}>
                            <div className='card'>
                                <img src={followed.user_img} alt={followed.username} />
                                <span>{followed.username}</span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default FollowingPopUp