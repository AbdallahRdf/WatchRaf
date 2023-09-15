import { Link } from "react-router-dom";
import { useContext } from "react";
//* menu img url
import menuIcon from '../img/hamburger.png';
//* components
import { NavElements } from "./NavElements";
import { ResponsivenessContext } from "../context/ResponsivenessContextProvider";

const Navbar = () => {
    const { isScreenSmall, setMenuOpen } = useContext(ResponsivenessContext);

    //* if trying to signup or loggin then don't render the navbar
    if (location.pathname == '/signup' || location.pathname == '/login') {
        return null;
    }

    return (
        <>
            <nav className="nav">
                <div>
                    <Link to="/" className="logo" >Pomoraf</Link>
                </div>
                {
                    !isScreenSmall
                        ?
                            <NavElements />
                        :
                        (
                            <button
                                className="menu-btn"
                                onClick={() => setMenuOpen((prev) => !prev)}
                            >
                                <img src={menuIcon} alt="menu icon" className="menu-img" />
                            </button>
                        )
                }
            </nav>
            { isScreenSmall && <NavElements />}
        </>
    );
};

export default Navbar;
