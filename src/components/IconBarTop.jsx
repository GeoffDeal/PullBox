import { Outlet, NavLink, BrowserRouter } from "react-router-dom";
import darklogo from '../assets/darklogo.png'
import { useContext } from "react";
import { UserContext } from "../Contexts";

function IconBarTop () {
    const { user } = useContext(UserContext);

    return (
        <div className="iconBar" id="iconBarTop">
            <img src={darklogo} alt="Logo" id="topLogo" />
            <nav>
                {!user.customer && <NavLink to="/admin"><span className="material-symbols-outlined">store</span></NavLink>}
                <NavLink to="/account"><span className="material-symbols-outlined">account_circle</span></NavLink>
                {/* <NavLink to="/settings"><span className="material-symbols-outlined">settings</span></NavLink> */}
            </nav>
        </div>
    )
};

export default IconBarTop;