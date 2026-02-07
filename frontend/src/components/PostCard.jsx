import { Link } from "react-router-dom";
import "../styles/postCard.css";

const PostCard = ({ post }) => {
  
  return (
    <div className="post-card">
      <h3>
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h3>

      <p className="post-content">
        {post.content.length > 150
          ? post.content.slice(0, 150) + "..."
          : post.content}
      </p>

      <div className="post-meta">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PostCard;
