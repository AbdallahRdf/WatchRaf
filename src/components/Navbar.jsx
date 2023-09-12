import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
//* menu img url
import menuIcon from '../img/hamburger.png';
//* components
import { NavElements } from "./NavElements";

const Navbar = () => {
    const { isScreenSmall, setMenuOpen } = useContext(MyContext);

    //* if trying to signup or loggin then don't render the navbar
    if (location.pathname == '/signup' || location.pathname == '/login') {
        return null;
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
                            <NavElements />
                        :
                        (
                            <button
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
