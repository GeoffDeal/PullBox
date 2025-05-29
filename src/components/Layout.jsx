import { Outlet } from "react-router-dom";
import IconBarTop from "./IconBarTop";
import IconBarBot from "./IconBarBot";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { PriceAdjustments } from "../Contexts";

function Layout() {
  const { priceAdjustments } = useContext(PriceAdjustments);

  return (
    <>
      <IconBarTop />
      <ToastContainer />
      {priceAdjustments ? (
        <div id="displayWindow">
          <Outlet />
        </div>
      ) : (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <IconBarBot />
    </>
  );
}

export default Layout;
