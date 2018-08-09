import React, { Component } from "react";
import { AreaChart } from "react-chartkick";

/** The feedback chart that charts the percentage of ratings that are a particular rating (positive is default). Uses React-Chartkick to create an AreaChart. */
const Chart = stats => {
  return (
    <div className="row chart-row">
      <AreaChart data={stats.stats} />
    </div>
  );
};

export default Chart;
