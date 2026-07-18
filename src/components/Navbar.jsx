import { NavLink } from "react-router-dom";
import "./Navbar.css"

//Navbar receives an array of link name as a prop 
//We map over the link of array so that links are generated dynamically insread of writing each <a> tag  manually
function Navbar({ navlinks}){
    return(
        <nav className="navbar">
            <ul className="navbar-list">
                {navlinks.map((link) => (
                    <li key ={link.path}>
                        <NavLink
                            to={link.path}
                            className={({isActive}) => isActive ? "navbar-link active-link" : "navbar-link"}
                        > {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;

