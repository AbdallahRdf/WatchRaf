import React, { useContext } from 'react'
//* context
import { UserDataContext } from '../../context/UserDataContextProvider';
import { ResponsivenessContext } from '../../context/ResponsivenessContextProvider';
//* firbase
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

function Logout() {

    const { setBreakData, setPomoData } = useContext(UserDataContext);
    const { isScreenSmall, setMenuOpen } = useContext(ResponsivenessContext);


    const signUserOut = () => {
        setPomoData([]);
        setBreakData([]);
        signOut(auth);
    }


    return (
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
    )
}

export default Logout
