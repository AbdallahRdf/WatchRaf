import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="nav">
            <div>
                <a href="/" className="logo">Pomoraf</a>
            </div>
            <ul className="list">
                <li className="list-item">
                    <Link to="/" className={location.pathname === "/" ? "list-link active-link" : "list-link"}>Home</Link>
                </li>
                <li className="list-item">
                    <Link to="/stats" className={location.pathname === "/stats" ? "list-link active-link" : "list-link"}>stats</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;