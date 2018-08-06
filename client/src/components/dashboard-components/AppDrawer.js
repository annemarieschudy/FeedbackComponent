import React from "react";
import AppIcon from "./AppIcon";

const AppDrawer = () => {
  const toggleAppDrawer = () => {
    document.getElementById("app-drawer").classList.toggle("open");
  };
  return (
    <div id="app-drawer">
      <div className="row" id="back-arrow">
        <div className="col-md-2" onClick={toggleAppDrawer}>
          <i className="material-icons">arrow_left_alt</i>{" "}
          <p className="bold">back </p>
        </div>
      </div>
      <div className="row">
        <AppIcon />
        <AppIcon />
        <AppIcon />
      </div>
      <div className="row">
        <AppIcon />
        <AppIcon />
        <AppIcon />
      </div>
    </div>
  );
};

export default AppDrawer;
