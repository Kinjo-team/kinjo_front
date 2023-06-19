import React from 'react';
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
        };
    };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return ( 
        <div>
            <header>
                <p>{comment.user.username}</p>
                <section>
                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(comment.createdAt).toLocaleTimeString()}</p> 
                </section>
            </header>
            <p>{comment.comment}</p>
        </div>
     );
}

export default CommentCard;