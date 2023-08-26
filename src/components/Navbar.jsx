import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav">
            <div>
                <a href="/" className="logo">Pomoraf</a>
            </div>
            <ul className="list">
                <li className="list-item">
                    <Link className="list-link" to="/">Home</Link>
                </li>
                <li className="list-item">
                    <Link className="list-link" to="/stats">stats</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;