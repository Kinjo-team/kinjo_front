import React from 'react'
import {Link} from 'react-router-dom'

type FollowerPopUpProps = {
    toggleFollowerPopUp: () => void,
    followers: string[]
}

const FollowerPopUp = ({followers, toggleFollowerPopUp} : FollowerPopUpProps) => {
  return (
    <div className='popup--overlay'>
      <div className='popup--container'>
      <button
            className="close-btn"
            onClick={toggleFollowerPopUp}
        >
        <span className="material-symbols-outlined">cancel</span>
        </button>
        <h2>Followers</h2>
        {followers.map((follower: string) => (
            <Link to={`/profile/${follower}`} key={follower}>
                <div>{follower}</div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default FollowerPopUp