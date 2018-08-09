import React from "react";
import StatBlock from "./StatBlock";

/** Displays overview stats for the appDashboard. Number of all reviews, and number of positive, negative and neutral reviews. TODO Change over time. */
const Stats = stats => {
  console.log(stats);
  const labels = [
    "left feedback",
    "postive reviews",
    "neutral reviews",
    "negative reviews"
  ];

  return (
    <div className="row numbers-row">
      <StatBlock value={stats.total} label={labels[0]} />
      <StatBlock value={stats.positive} label={labels[0]} />
      <StatBlock value={stats.neutral} label={labels[0]} />
      <StatBlock value={stats.negative} label={labels[0]} />
    </div>
  );
};
export default Stats;
