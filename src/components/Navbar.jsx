import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ navLinks }) {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "navbar-link active-link" : "navbar-link"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}

        {isAuthenticated ? (
          <>
            <li className="navbar-user-info">
              <span className="user-email-badge">👤 {user?.email}</span>
            </li>
            <li>
              <button onClick={logout} className="navbar-logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "navbar-link active-link" : "navbar-link"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "navbar-link active-link" : "navbar-link"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
