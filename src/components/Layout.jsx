import { Outlet } from "react-router-dom";
import IconBarTop from "./IconBarTop";
import IconBarBot from "./IconBarBot";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <IconBarTop />
      <ToastContainer />
      <div id="displayWindow">
        <Outlet />
      </div>
      <IconBarBot />
    </>
  );
}

export default Layout;
