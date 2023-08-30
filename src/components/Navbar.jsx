import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Navbar = ({user}) => {
    
    const signUserOut = () => {
        signOut(auth);
    }

    const location = useLocation();

    if (location.pathname === '/signup') {
        return null; // Don't render the navbar on the signup page
    }

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
                    <Link to="/stats" className={location.pathname === "/stats" ? "list-link active-link" : "list-link"}>Stats</Link>
                </li>
                {user ?
                    <li className="list-item">
                        <button onClick={signUserOut} className={"list-link"}>Log-out</button>
                    </li>
                    :
                    <li className="list-item">
                        <Link to="/signup" className={location.pathname === "/signup" ? "list-link active-link" : "list-link"}>Sign-up</Link>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Navbar;