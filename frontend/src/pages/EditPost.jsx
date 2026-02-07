import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost, updatePost } from "../services/postService";
import "../styles/createPost.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getSinglePost(id);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updatePost(id, { title, content });
      navigate(`/posts/${id}`);
    } catch {
      setError("Failed to update post");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="create-post-container">
      <h2>Edit Post</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
