import React from "react";

/** A block of data for the overview stats of each AppDashboard. Shows the percentage, label description, and change over time percentage and arrow. */
// TODO, calculate change over time and set arrow direction and color accordingly. Increases in reviews and positive feedback is a green arrow as well as decreases in negative reviews. Increases in negative reviews or decreases in positive reivews is a red arrow. Neutral is a gray arrow.
const StatBlock = (value, label, prevVal, direction, color) => {
  let formatted = value.value;
  if (formatted > 1000) {
    //format to display thousands as "k"s
    formatted = String((formatted / 1000).toFixed(1)) + "k";
  }

  //TODO
  /*   
  let change = (value.value - prevVal) / prevVal;
  change = change * 100;
  change = change.toFixed(0);
  const changeOverTime = String(change) + "%";
  let arrowColor;
  if (label === "left feedback" || label === "positive") {
    if (change < 0) {
      arrowColor = "bad";
    }
    if (change === 0) {
      arrowColor = "neutral";
    } else {
      arrowColor = "good";
    }
  } */

  direction = "up";
  color = "good";

  //TODO
  let tempChange = Math.floor(Math.random() * Math.floor(50));

  tempChange = String(tempChange) + "%";

  const classnames = `material-icons arrow ${direction} ${color}`;
  return (
    <div className="col-md-3">
      <h2>{formatted}</h2>
      <h4 className="bold mt-0">{value.label}</h4>
      <span className="change-over-time mt-0 pt-0">
        <i className={classnames}>arrow_right_alt</i>
        <h6>{tempChange}</h6>
      </span>
    </div>
  );
};

export default StatBlock;
