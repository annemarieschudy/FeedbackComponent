import React from "react";
import { Link } from "react-router-dom";

/**The Navbar for the entire web app.  Contains the spark icon and the appDrawer icon that toggles the app menu. */
const Navbar = () => {
  const toggleAppDrawer = () => {
    document.getElementById("app-drawer").classList.toggle("open");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="navbar-content">
          <Link to="/dashboard/">
            <i className="demo-icon icon-fullspark"> &#xe800;</i>
          </Link>
          <i className="material-icons" onClick={toggleAppDrawer}>
            apps
          </i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
