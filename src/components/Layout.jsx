import { Outlet, Link, BrowserRouter } from "react-router-dom";
import IconBarTop from "./IconBarTop";
import IconBarBot from "./IconBarBot";

function Layout () {

    return (
        <>
            <IconBarTop position="top" />
            <div id="displayWindow">
                <Outlet />
            </div>
            <IconBarBot position="bottom" />
        </>
    )
};

export default Layout;