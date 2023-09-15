import { useContext } from "react";
//* firbase
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
//* components
import { NavLink } from "./NavLink";
import { UserDataContext } from "../context/UserDataContextProvider";
import { ResponsivenessContext } from "../context/ResponsivenessContextProvider";
import { StateContext } from "../context/StateContextProvider";

export const NavElements = () => {

    const { user } = useContext(StateContext);
    const { setBreakData, setPomoData } = useContext(UserDataContext);
    const { isScreenSmall, menuOpen, setMenuOpen } = useContext(ResponsivenessContext);
    
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