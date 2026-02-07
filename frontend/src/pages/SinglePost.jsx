import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePost, deletePost } from "../services/postService";
import Comments from "../components/Comments";
import LikeButton from "../components/LikeButton";
import { useAuth } from "../context/AuthContext";

import "../styles/singlePost.css";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getSinglePost(id);
        setPost(res.data);
        setLikes(Array.isArray(res.data.likes) ? res.data.likes : []);
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading post...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!post) {
    return <p style={{ textAlign: "center" }}>Post not found</p>;
  }

  const isAuthor =
    user &&
    post.author &&
    (user._id === post.author._id || user.id === post.author._id);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deletePost(post._id);
      navigate("/");
    } catch {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="single-post-container">
      <h1 className="single-post-title">{post.title}</h1>

      <div className="single-post-meta">
        <span>By {post.author?.name || "Unknown"}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Like / Unlike */}
      <LikeButton postId={post._id} likes={likes} setLikes={setLikes} />

      {/* Author actions */}
      {isAuthor && (
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
          <button onClick={() => navigate(`/posts/edit/${post._id}`)}>
            Edit
          </button>

          <button
            onClick={handleDelete}
            style={{ background: "#dc2626", color: "#fff" }}
          >
            Delete
          </button>
        </div>
      )}

      <div className="single-post-content">{post.content}</div>

      {/* Comments */}
      <Comments postId={id} />
    </div>
  );
};

export default SinglePost;
