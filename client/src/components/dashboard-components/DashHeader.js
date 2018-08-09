import React from "react";
import BackArrow from "./BackArrow";
import TabRow from "./TabRow";
import { Link } from "react-router-dom";
import classnames from "classnames";

/**The header of each AppDashboard. Include app name, "feedback"/"comment" buttons, timetrame tabs and back arrow */
const DashHeader = (appName, appId, toggler, toggleView) => {
  return (
    <div className="dash-header">
      <BackArrow />
      <div className="row app-header">
        <div className="col-md-1"> </div>
        <div className="col-md-7">
          <h1>{appName.appName}</h1>
        </div>
        <div className="col-md-2">
          <button
            id="feedback-button"
            onClick={appName.toggleView}
            className="button-current"
          >
            feedback
          </button>
        </div>
        <div className="col-md-2">
          <button id="comment-button" onClick={appName.toggleView}>
            comments
          </button>
        </div>
      </div>
      <TabRow toggler={appName.toggler} />
    </div>
  );
};

export default DashHeader;
