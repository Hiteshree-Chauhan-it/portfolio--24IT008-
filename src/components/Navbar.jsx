import { NavLink } from "react-router-dom";
import "./Navbar.css";

// NavLink works like Link (it changes the page without a full reload),
// but it ALSO knows when its own path matches the current URL.
// We use that to automatically highlight the active page in the navbar.
function Navbar({ navLinks }) {
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
      </ul>
    </nav>
  );
}

export default Navbar;
