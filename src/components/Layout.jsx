import { Outlet, Link, BrowserRouter } from "react-router-dom";
import IconBar from "./IconBar";

function Layout () {
    return (
        <>
            <IconBar position="top" />
            <div id="displayWindow">
                <Outlet />
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to="/"><span class="material-symbols-outlined">home</span></Link>
                    </li>
                    <li>
                        <Link to="/account"><span class="material-symbols-outlined">account_circle</span></Link>
                    </li>
                    <li>
                        <Link to="/settings"><span class="material-symbols-outlined">settings</span></Link>
                    </li>
                    <li>
                        <Link to="/searchpage"><span class="material-symbols-outlined">search</span></Link>
                    </li>
                    <li>
                        <Link to="/pulls"><span class="material-symbols-outlined">inventory_2</span></Link>
                    </li>
                    <li>
                        <Link to="/customerspage"><span class="material-symbols-outlined">groups</span></Link>
                    </li>
                    <li>
                        <Link to="/notifications"><span class="material-symbols-outlined">notifications</span></Link>
                    </li>
                </ul>
            </nav>
            <IconBar position="bottom" />
        </>
    )
};

export default Layout;