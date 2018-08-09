import React from "react";
import { Link } from "react-router-dom";

/**The link back to the landing page that provides stats for all apps. This arrow appears on all AppDashboards */
const BackArrow = () => {
  //TODO - create landing page/all apps dashboard
  return (
    <Link to="/dashboard/">
      <div className="row" id="back-arrow">
        <div className="col-md-3">
          <i className="material-icons">arrow_left_alt</i>{" "}
          <p className="bold">back to all apps </p>
        </div>
      </div>
    </Link>
  );
};

export default BackArrow;
