import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getAllUsers,
  deleteUserByAdmin,
  getAllPostsAdmin,
  deletePostByAdmin,
} from "../services/adminService";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("stats");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, usersRes, postsRes] = await Promise.all([
          getDashboardStats(),
          getAllUsers(),
          getAllPostsAdmin(),
        ]);

        setStats(statsRes.data);
        setUsers(usersRes.data.users);
        setPosts(postsRes.data.posts);
      } catch (error) {
        console.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUserByAdmin(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await deletePostByAdmin(id);
    setPosts(posts.filter((p) => p._id !== id));
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading admin dashboard...</p>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={activeTab === "stats" ? "active" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "posts" ? "active" : ""}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>
      </div>

      {/* Search */}
      {(activeTab === "users" || activeTab === "posts") && (
        <input
          className="admin-search"
          placeholder={`Search ${activeTab}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {/* Stats */}
      {activeTab === "stats" && (
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Users</h4>
            <p>{stats.users}</p>
          </div>
          <div className="stat-card">
            <h4>Posts</h4>
            <p>{stats.posts}</p>
          </div>
          <div className="stat-card">
            <h4>Comments</h4>
            <p>{stats.comments}</p>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u) =>
                  u.email.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role ${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="empty">No users found.</p>
          )}
        </>
      )}

      {/* Posts */}
      {activeTab === "posts" && (
        <>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts
                .filter((p) =>
                  p.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((post) => (
                  <tr key={post._id}>
                    <td>{post.title}</td>
                    <td>{post.author?.email}</td>
                    <td>
                      <button onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {posts.length === 0 && (
            <p className="empty">No posts found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
