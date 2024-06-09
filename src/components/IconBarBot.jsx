import { useContext } from "react";
import { Outlet, NavLink, BrowserRouter } from "react-router-dom";
import { UserContext } from "../Contexts";


function IconBarBot (props) {
    const { user } = useContext(UserContext);

    return (
        <div className="iconBar" id="iconBarBot">
            <nav>
                <NavLink to="/"><span className="material-symbols-outlined">home</span></NavLink>
                <NavLink to="/searchpage"><span className="material-symbols-outlined">search</span></NavLink>
                <NavLink to="/pulls"><span className="material-symbols-outlined">inventory_2</span></NavLink>
                { !user.customer && <NavLink to="/customerspage"><span className="material-symbols-outlined">groups</span></NavLink>}                
                <NavLink to="/notifications"><span className="material-symbols-outlined">notifications</span></NavLink>
            </nav>
        </div>
    )
};

export default IconBarBot;