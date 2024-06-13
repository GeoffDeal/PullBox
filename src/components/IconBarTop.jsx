import { Outlet, NavLink, BrowserRouter } from "react-router-dom";
import darklogo from '../assets/darklogo.png'

function IconBarTop () {
    return (
        <div className="iconBar" id="iconBarTop">
            <img src={darklogo} alt="Logo" id="topLogo" />
            <nav>
                <NavLink to="/account"><span className="material-symbols-outlined">account_circle</span></NavLink>
                {/* <NavLink to="/settings"><span className="material-symbols-outlined">settings</span></NavLink> */}
            </nav>
        </div>
    )
};

export default IconBarTop;