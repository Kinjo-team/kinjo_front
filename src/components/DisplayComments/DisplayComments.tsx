import { useState, ChangeEvent, FC, useEffect, FormEvent } from 'react';
import CommentCard from './CommentCard/CommentCard';
import "./DisplayComments.scss";

interface DisplayCommentsProps {
    firebase_uuid: string,
    itinerary_id: number,
}

type CommentType = {
    comment: {
        id: number;
        user: {
            username: string;
        };
        createdAt: string;
        comment: string;
    };
}

const DisplayComments: FC<DisplayCommentsProps> = ({ firebase_uuid, itinerary_id }) => {
    const [addComment, setAddComment] = useState<any>("");
    const [comments, setComments] = useState<CommentType[]>([]);


    // function to get comments from database
    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`http://localhost:8000/comments/${itinerary_id}`);
            const data = await response.json();
            setComments(data);
        };

        fetchComments();
    }, [itinerary_id]);

    //handle function to add comments
    const handleAddComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddComment(e.target.value);
    };

    // function to add comment to database
    const addCommentToDatabase = async (event : FormEvent) => {
        event.preventDefault();

        if (addComment === "") {
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: addComment,
                    firebase_uuid: firebase_uuid,
                    itinerary_id: itinerary_id,
                    user: {
                        username: "username",
                    }
                }),  
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                setAddComment("");

                // add new comment to comments display without refreshing page
                setComments((prevComments: CommentType[]) => [...prevComments, jsonResponse]);
            } else {
                console.log("Failed to add comment");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className='displaycomments--container'>
            <div className='displaycomments'>
                <h1><span>{comments.length}</span> Comments</h1>
                <section className='comments--container'>
                    {comments.map((comment: any) => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </section>
                <form onSubmit={addCommentToDatabase} className='addcomments--form'>
                    <textarea
                        value={addComment}
                        minLength={1}
                        onChange={handleAddComment}
                        rows={10}
                        placeholder="Enter your comment here... (250 characters max)"
                        maxLength={250}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}
 
export default DisplayComments;