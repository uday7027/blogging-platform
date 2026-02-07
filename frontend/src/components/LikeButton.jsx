import { toggleLike } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import "../styles/likeButton.css";

const LikeButton = ({ postId, likes, setLikes }) => {
  const { user } = useAuth();
  const userId = user?._id || user?.id;

  const isLiked = userId ? likes.includes(userId) : false;

  const handleLike = async () => {
    if (!user) return;

    try {
      const res = await toggleLike(postId);
      setLikes(res.data.likes || []);
    } catch (err) {
      console.error("Like failed");
    }
  };

  return (
    <div className="like-container">
      <button
        className={`like-btn ${isLiked ? "liked" : ""}`}
        onClick={handleLike}
        disabled={!user}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
      </button>

      <span className="like-count">
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </span>

      {!user && (
        <span className="like-hint">Login to like this post</span>
      )}
    </div>
  );
};

export default LikeButton;
