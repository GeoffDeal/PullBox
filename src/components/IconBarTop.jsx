import { NavLink } from "react-router-dom";
import darklogo from "../assets/darklogo.png";
// import { useContext } from "react";
// import { UserContext } from "../Contexts";
import { useUser } from "@clerk/clerk-react";

function IconBarTop() {
  // const { user } = useContext(UserContext);
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <div className="iconBar" id="iconBarTop">
      <img src={darklogo} alt="Logo" id="topLogo" />
      <nav>
        <NavLink to={role === "admin" ? "/admin" : "/storeinfo"}>
          <span className="material-symbols-outlined">store</span>
          <p className="desktopDisplay">Store</p>
        </NavLink>
        <NavLink to="/account">
          <span className="material-symbols-outlined">account_circle</span>
          <p className="desktopDisplay">Account</p>
        </NavLink>
      </nav>
    </div>
  );
}

export default IconBarTop;
