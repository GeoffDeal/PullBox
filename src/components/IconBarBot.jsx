import { NavLink } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function IconBarBot() {
  const { user } = useUser();

  const role = user?.publicMetadata?.role;

  return (
    <div className="iconBar" id="iconBarBot">
      <nav>
        <NavLink className="botLinks" to="/">
          <span className="material-symbols-outlined">home</span>
          <p className="desktopDisplay">Home</p>
        </NavLink>
        <NavLink className="botLinks" to="/browse">
          <span className="material-symbols-outlined">auto_stories</span>
          <p className="desktopDisplay">Browse</p>
        </NavLink>
        <NavLink className="botLinks" to="/searchpage">
          <span className="material-symbols-outlined">search</span>
          <p className="desktopDisplay">Search</p>
        </NavLink>
        {role === "admin" ? (
          <NavLink className="botLinks" to="/shoppulls">
            <span className="material-symbols-outlined">inventory_2</span>
            <p className="desktopDisplay">Pulls</p>
          </NavLink>
        ) : (
          <NavLink className="botLinks" to="/pulls">
            <span className="material-symbols-outlined">inventory_2</span>
            <p className="desktopDisplay">Pulls</p>
          </NavLink>
        )}
        {role === "admin" && (
          <NavLink className="botLinks" to="/customerspage">
            <span className="material-symbols-outlined">groups</span>
            <p className="desktopDisplay">Customers</p>
          </NavLink>
        )}
        <NavLink className="botLinks" to="/notifications">
          <span className="material-symbols-outlined">notifications</span>
          <p className="desktopDisplay">Notifications</p>
        </NavLink>
      </nav>
    </div>
  );
}

export default IconBarBot;
