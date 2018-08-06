import React from "react";

const ReportTitleRow = ratingType => {
  return (
    <div className="row">
      <div className="col-md-3" />
      <div className="col-md-1 opacity-5">
        <h4>#</h4>
      </div>
      <div className="col-md-8 opacity-5">
        <h4 className="text-left">{ratingType.ratingType}</h4>
      </div>
    </div>
  );
};

export default ReportTitleRow;
