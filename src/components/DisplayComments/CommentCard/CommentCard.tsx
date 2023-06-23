import React from 'react';
import { Link } from 'react-router-dom';
import "./CommentCard.scss";

interface CommentCardProps {
    comment: {
        id: number;
        firebase_uuid: string;
        itinerary_id: number;
        comment: string;
        createdAt: string;
        user: {
            username: string;
            user_img: string;
        };
    };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return ( 
        <div className='comment-card--container'>
            <header>
                <Link to={`/profile/${comment.user.username}`}>
                    <div className='comment-user'>
                        <img className='user-img' src={comment.user.user_img} alt="" />
                        <p className='username'>{comment.user.username}</p>
                    </div>
                </Link>
                <section>
                    <p className='date'>{new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(comment.createdAt).toLocaleTimeString()}</p> 
                </section>
            </header>
            <p className='comment-text'>{comment.comment}</p>
        </div>
     );
}

export default CommentCard;