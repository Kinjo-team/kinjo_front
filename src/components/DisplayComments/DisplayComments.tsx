import { useState, ChangeEvent, FC, useEffect } from 'react';
import CommentCard from '../CommentCard/CommentCard';
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

    //handle function to add comments
    const handleAddComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddComment(e.target.value);
    };

    // function to add comment to database
    const addCommentToDatabase = async () => {
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
                }),  
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("jsonResponse:", jsonResponse);
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

    // function to get comments from database
    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`http://localhost:8000/comments/${itinerary_id}`);
            const data = await response.json();
            setComments(data);
        };

        fetchComments();
    }, [itinerary_id]);

    return (
        <div className="display-comments--container">
            <h1 className="display-comments--header">Comments</h1>
            <section>
                {comments.map((comment: any) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </section>
            <section className="add-comment--section">
                <textarea
                    value={addComment}
                    onChange={handleAddComment}
                    placeholder="Add a comment"
                />
                <button onClick={addCommentToDatabase}>POST</button>
            </section>
        </div>
    );
}
 
export default DisplayComments;