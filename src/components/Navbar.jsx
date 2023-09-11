import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import MyContext from "../context/MyContext";
import menuIcon from '../img/hamburger.png';

const Navbar = ({user}) => {

    const { setBreakData, setPomoData, screenWidth } = useContext(MyContext);

    const isScreenSmall = screenWidth <= 768;
    
    const signUserOut = () => {
        setPomoData([]);
        setBreakData([]);
        signOut(auth);
    }

    const location = useLocation();

    if (location.pathname === '/signup' || location.pathname === '/login') {
        return null; // Don't render the navbar on the signup page
    }

    return (
        <>
            <nav className="nav">
                <div>
                    <a href="/" className="logo">Pomoraf</a>
                </div>
                {
                    !isScreenSmall
                    ?
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
                    :
                        <button className="menu-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <img src={menuIcon} alt="menu icon" className="menu-img"/>
                        </button>
                }
            </nav>
            {   
                isScreenSmall &&
                <ul className="collapse w-75 m-auto" id="collapseExample">
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
            }
        </>
    )
}

export default Navbar;