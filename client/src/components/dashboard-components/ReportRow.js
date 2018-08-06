import React from "react";

const ReportRow = (ratingType, value, timeframe) => {
  const getData = (ratingType, value, timeframe) => {
    return Math.floor(Math.random() * Math.floor(10000));
  };

  const data = getData(ratingType, value, timeframe);
  let width = (data / 10000) * 100;
  width = String(width) + "%";

  const barWidth = {
    width: width
  };

  ratingType = "thumbs";
  value = 1;

  let icon;
  if (ratingType === "thumbs") {
    if (value === 1) {
      icon = "thumb_up";
    } else {
      icon = "thumb_down";
    }
  } else if (ratingType === "slider") {
    if (value === 5) {
      icon = "😀";
    } else if (value === 4) {
      icon = "🙂";
    } else if (value === 3) {
      icon = "😐";
    } else if (value === 2) {
      icon = "😒";
    } else if (value === 1) {
      icon = "😤";
    }
  } else if (ratingType === "sparks") {
    if (value === 5) {
      icon = "";
    } else if (value === 4) {
      icon = "";
    } else if (value === 3) {
      icon = "";
    } else if (value === 2) {
      icon = "";
    } else if (value === 1) {
      icon = "";
    }
  }

  return (
    <div className="row">
      <div className="col-md-3 icons">
        <i className="material-icons m-1">{icon}</i>
      </div>
      <div className="col-md-1">
        <h4>{data}</h4>
      </div>
      <div className="col-md-8">
        <div className="bar" style={barWidth}>
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ReportRow;
