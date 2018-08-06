import React from "react";

const Navbar = () => {
  const toggleAppDrawer = () => {
    document.getElementById("app-drawer").classList.toggle("open");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="navbar-content">
          <i className="demo-icon icon-fullspark"> &#xe800;</i>
          <i className="material-icons" onClick={toggleAppDrawer}>
            apps
          </i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
