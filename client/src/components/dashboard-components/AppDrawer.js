import React from "react";
import AppIcon from "./AppIcon";

/**A menu of all apps in the DB that link to appDashboard for that particular app. */
const AppDrawer = apps => {
  //toggles the display of the drawer when the icon is clicked or the "back" button is clicked
  const toggleAppDrawer = () => {
    document.getElementById("app-drawer").classList.toggle("open");
  };

  let content = (
    //map through app objects provided in "apps" params and create <AppIcon />s for each
    <div className="row">
      {Object.keys(apps.apps).map((app, i) => <AppIcon app={apps.apps[i]} />)}
    </div>
  );

  return (
    <div id="app-drawer">
      <div className="row" id="back-arrow">
        <div className="col-md-2" onClick={toggleAppDrawer}>
          <i className="material-icons">arrow_left_alt</i>{" "}
          <p className="bold">back </p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default AppDrawer;
