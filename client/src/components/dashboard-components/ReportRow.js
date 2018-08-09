import React from "react";

/**A row in the barchart detailed report. Displays an icon, review count, and colored bar of percentage width based on review count and review totals. */
const ReportRow = (ratingType, value, rating, total) => {
  //weight the value of the count to size the bar
  let width = (ratingType.value / (ratingType.total / 3)) * 100;
  if (width > 100) {
    width = 100;
  }
  width = String(width) + "%";

  let barColor; //styling attributes for the bar
  let barOpacity;
  let icon; //the rating type icon

  if (ratingType.ratingType === "thumbs") {
    barColor = "#4a4a4a";
    barOpacity = "0.8";
    if (ratingType.rating == 1) {
      icon = <i className="material-icons m-1 mt-0 mb-0">thumb_up</i>;
    } else {
      icon = <i className="material-icons m-1 mt-0 mb-0">thumb_down</i>;
    }
  } else if (ratingType.ratingType === "slider") {
    barColor = "#0477D7";
    barOpacity: "0.6";
    if (ratingType.rating == 5) {
      icon = (
        <span role="img" aria-label="very happy face">
          <i className="m-1 mt-0 mb-0">😀</i>
        </span>
      );
    } else if (ratingType.rating == 4) {
      icon = (
        <span role="img" aria-label="smiley face">
          <i className="m-1 mt-0 mb-0">🙂</i>
        </span>
      );
    } else if (ratingType.rating == 3) {
      icon = (
        <span role="img" aria-label="neutral face">
          <i className="m-1 mt-0 mb-0">😐</i>
        </span>
      );
    } else if (ratingType.rating == 2) {
      icon = (
        <span role="img" aria-label="unhappy face">
          <i className="m-1 mt-0 mb-0">😒</i>
        </span>
      );
    } else if (ratingType.rating == 1) {
      icon = (
        <span role="img" aria-label="angry face">
          <i className="m-1 mt-0 mb-0">😤</i>
        </span>
      );
    }
  } else if (ratingType.ratingType === "sparks") {
    barColor = "#0F1C2C";
    barOpacity: "0.75";
    if (ratingType.rating == 5) {
      icon = (
        <div>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
        </div>
      );
    } else if (ratingType.rating == 4) {
      icon = (
        <div>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
        </div>
      );
    } else if (ratingType.rating == 3) {
      icon = (
        <div>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
        </div>
      );
    } else if (ratingType.rating == 2) {
      icon = (
        <div>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
          <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>
        </div>
      );
    } else if (ratingType.rating == 1) {
      icon = <i className="demo-icon icon-fullspark m-1 mt-0">&#xe800;</i>;
    }
  }

  //style object for the bar
  const barStyle = {
    width: width,
    backgroundColor: barColor,
    opacity: barOpacity
  };

  return (
    <div className="row">
      <div className="col-md-3 icons">{icon}</div>
      <div className="col-md-1">
        <h4>{ratingType.value}</h4>
      </div>
      <div className="col-md-8">
        <div className="bar" style={barStyle}>
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ReportRow;
