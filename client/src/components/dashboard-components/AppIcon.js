import React from "react";
import { Link } from "react-router-dom";

/**A circle logo/icon for the app + label with the name of the app */
const AppIcon = app => {
  //link to appDashboard and provide the app's Id to fetch the appropriate data
  const link = `/dashboard/app/${app.app._id}`;

  //close the appdrawer once an app is selected
  const onClick = () => {
    document.getElementById("app-drawer").classList.remove("open");
  };

  return (
    <div className="col-md-4">
      <Link to={link} onClick={onClick}>
        <div className="app-icon">
          <div className="app-icon-img" />
          <p className="app-label">{app.app.appName}</p>
        </div>
      </Link>
    </div>
  );
};

export default AppIcon;
