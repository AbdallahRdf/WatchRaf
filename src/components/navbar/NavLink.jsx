import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { ResponsivenessContext } from "../../context/ResponsivenessContextProvider";

export const NavLink = ({path, linkTitle}) => {
    const {isScreenSmall, setMenuOpen} = useContext(ResponsivenessContext);
    const location = useLocation();
    return (
        <li className="list-item">
            <Link
                onClick={() => isScreenSmall && setMenuOpen(false)}
                to={path}
                className={location.pathname === path ? "list-link active-link" : "list-link"}
            >
                { linkTitle }
            </Link>
        </li>
    )
}