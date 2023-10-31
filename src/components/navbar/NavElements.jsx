import { useContext } from "react";
//* components
import { NavLink } from "./NavLink";
import { ResponsivenessContext } from "../../context/ResponsivenessContextProvider";
import Logout from "./Logout";
//* firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";

export const NavElements = () => {

    const { isScreenSmall, menuOpen } = useContext(ResponsivenessContext);

    const [user] = useAuthState(auth);
    
    const className = isScreenSmall ? `collapse ${menuOpen ? 'show' : ''} w-75 list` : 'list';

    return (
        <ul className={className}>
            <NavLink path='/' linkTitle='Home' />
            <NavLink path='/stats' linkTitle='Stats' />
            {user ? (<Logout />) : (<NavLink path='/signup' linkTitle='Sign-up' />)}
        </ul>
    )
}