import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          BloggingPlatform
        </Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
              
            )}
            <Link to="/create" className="nav-link">
              Create Post
            </Link>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
