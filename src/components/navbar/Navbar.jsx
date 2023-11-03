import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
//* menu img url
import menuIcon from '../../assets/img/hamburger.png';
//* components
import { NavElements } from "./NavElements";
//* context file
import { ResponsivenessContext } from "../../context/ResponsivenessContextProvider";

const Navbar = () => {
    const { isScreenSmall, setMenuOpen } = useContext(ResponsivenessContext);

    const location = useLocation();
    //* if you go to signup or loggin page then don't render the navbar.
    if (location.pathname === '/signup' || location.pathname === '/login') {
        return null;
    }

    return (
        <>
            <nav className="nav">
                <div>
                    <Link to="/" className="logo" >Pomoraf</Link>
                </div>
                {
                    isScreenSmall
                    ?
                        (<button
                            className="menu-btn"
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            <img src={menuIcon} alt="menu icon" className="menu-img" />
                        </button>)
                    :
                        <NavElements />
                }
            </nav>
            { isScreenSmall && <NavElements />}
        </>
    );
};

export default Navbar;
