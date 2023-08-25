import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="nav">
            <div>
                <a href="/" className="logo">Pomoraf</a>
            </div>
            <ul className="list">
                <li className="list-item">
                    <Link className="list-link" to="/">Home</Link>
                </li>
                <li className="list-item">
                    <Link className="list-link" to="/stats">stats</Link>
                </li>
            </ul>
        </nav>


        // <nav className="navbar navbar-expand-lg bg-body-tertiary">
        //     <div className="container-fluid px-5">
        //         <a className="navbar-brand logo" href="/">Pomoraf</a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>

        //         <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                     <Link className="nav-link active" to="/">Home</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/stats">Stats</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default Navbar;