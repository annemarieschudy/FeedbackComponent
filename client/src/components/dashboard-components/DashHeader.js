import React from "react";
import BackArrow from "./BackArrow";
import TabRow from "./TabRow";
import { Link } from "react-router-dom";
import classnames from "classnames";

const DashHeader = (appName, appId, toggler, toggleView, current) => {
  const name = String(appName.appName);

  return (
    <div className="dash-header">
      <BackArrow />
      <div className="row app-header">
        <div className="col-md-1"> </div>
        <div className="col-md-7">
          <h1>{name}</h1>
        </div>
        <div className="col-md-2">
          <button
            onClick={toggleView}
            className={classnames("", { "button-current": !current })}
          >
            feedback
          </button>
        </div>
        <div className="col-md-2">
          <button
            onClick={toggleView}
            className={classnames("", { "button-current": current })}
          >
            comments
          </button>
        </div>
      </div>
      <TabRow toggler={toggler} />
    </div>
  );
};

export default DashHeader;
