import { Outlet, Link, BrowserRouter } from "react-router-dom";
import IconBar from "./IconBar";

function Layout () {
    return (
        <>
            <IconBar position="top" />
            <Outlet />

            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/searchpage">Search</Link>
                    </li>
                    <li>
                        <Link to="/pulls">Pulls</Link>
                    </li>
                    <li>
                        <Link to="/customerspage">Customers</Link>
                    </li>
                    <li>
                        <Link to="/notifications">Notifications</Link>
                    </li>
                </ul>
            </nav>
            <IconBar position="bottom" />
        </>
    )
};

export default Layout;