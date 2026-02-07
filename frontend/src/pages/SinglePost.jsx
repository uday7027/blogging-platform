import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../services/postService";
import "../styles/singlePost.css";

const SinglePost = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getSinglePost(id);
        setPost(res.data);
      } catch (err) {
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

  return (
    <div className="single-post-container">
      <h1 className="single-post-title">{post.title}</h1>

      <div className="single-post-meta">
        <span>By {post.author?.name || "Unknown"}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="single-post-content">
        {post.content}
      </div>
    </div>
  );
};

export default SinglePost;
