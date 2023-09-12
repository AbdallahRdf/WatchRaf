import { useContext } from "react";
import MyContext from "../context/MyContext";
//* firbase
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
//* components
import { NavLink } from "./NavLink";

export const NavElements = () => {

    const { setBreakData, setPomoData, user, isScreenSmall, menuOpen, setMenuOpen } = useContext(MyContext);
    
    const signUserOut = () => {
        setPomoData([]);
        setBreakData([]);
        signOut(auth);
    }
    
    const className = isScreenSmall ? `collapse ${menuOpen ? 'show' : ''} w-75 list` : 'list';

    return (
        <ul className={className}>
            <NavLink path='/' linkTitle='Home' />
            <NavLink path='/stats' linkTitle='Stats' />
            {user ? (
                <li className="list-item">
                    <button 
                        onClick={() => {
                            isScreenSmall && setMenuOpen(false);
                            signUserOut();
                        }} 
                        className={"list-link"}
                    >
                        Log-out
                    </button>
                </li>
            ) : (
                <NavLink path='/signup' linkTitle='Sign-up' />
            )}
        </ul>
    )
}