import React, { Component } from "react";
import { AreaChart } from "react-chartkick";

/** The feedback chart that charts the percentage of ratings that are a particular rating (positive is default). Uses React-Chartkick to create an AreaChart. */
const Chart = (stats, value, toggleChartValue) => {
  const label = `percentage of feedback that is `;
  const values = ["positive", "neutral", "negative"];

  const showChartValueOptions = e => {
    document.getElementById("chart-legend-values").classList.toggle("hidden");
    document
      .getElementById("toggle-chart-value-button")
      .classList.toggle("active");
  };

  return (
    <div>
      <div className="row chart-row">
        <AreaChart data={stats.stats} colors={["#0071ce"]} />
      </div>
      <div className="row" id="chart-legend-label">
        <div className="col-md-1">
          <div id="chart-legend-color" />
        </div>
        <div className="col-md-5">
          <h4>{label}</h4>

          <ul id="chart-legend-values" className="hidden">
            <li className="current-chart-value" onClick={showChartValueOptions}>
              <h4>{stats.value}</h4>{" "}
              <i id="toggle-chart-value-button" className="material-icons">
                edit
              </i>
            </li>
            {values.map((val, index) => {
              if (val !== stats.value) {
                return (
                  <li id={val} onClick={stats.toggleChartValue}>
                    <h4>{val}</h4>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chart;
