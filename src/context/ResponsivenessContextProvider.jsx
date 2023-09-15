import { createContext, useEffect, useState } from "react";
import { useScreenWidth } from "../hooks/useScreenWidth";
import { useLocation } from "react-router-dom";

export const ResponsivenessContext = createContext();

export const ResponsivenessContextProvider = ({ children }) => {

    //* return the screen width
    const { screenWidth, isScreenSmall } = useScreenWidth();

    //* state to control menu visibility
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        //* Close the menu when the location changes (navigating to a new page)
        setMenuOpen(false);
    }, [location]);

    const store = {
        isScreenSmall,
        screenWidth,
        menuOpen,
        setMenuOpen
    }

    return (
        <ResponsivenessContext.Provider value={store}>
            {children}
        </ResponsivenessContext.Provider>
    )
}