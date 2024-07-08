import { Outlet, Link, BrowserRouter } from "react-router-dom";
import IconBarTop from "./IconBarTop";
import IconBarBot from "./IconBarBot";

function Layout () {

    return (
        <>
            <IconBarTop />
            <div id="displayWindow">
                <Outlet />
            </div>
            <IconBarBot />
        </>
    )
};

export default Layout;