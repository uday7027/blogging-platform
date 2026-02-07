import { useEffect, useState } from "react";
import { getCommentsByPost, addComment } from "../services/commentService";
import { useAuth } from "../context/AuthContext";
import "../styles/comments.css";

const Comments = ({ postId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getCommentsByPost(postId);
        setComments(res.data.comments);
      } catch {
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await addComment(postId, { text });
      console.log(res.data);
      setComments([res.data, ...comments]);
      setText("");
    } catch {
      setError("Failed to add comment");
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Post Comment</button>
        </form>
      )}

      {!user && (
        <p className="login-hint">Login to add a comment.</p>
      )}

      {loading && <p>Loading comments...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && comments.length === 0 && (
        <p>No comments yet.</p>
      )}

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p className="comment-text">{comment.text}</p>
            <div className="comment-meta">
              <span>{comment.author?.name || "User"}</span>
              <span>
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
