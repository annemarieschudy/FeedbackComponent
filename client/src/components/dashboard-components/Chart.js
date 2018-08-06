import React, { Component } from "react";
import { AreaChart } from "react-chartkick";

const Chart = (appId, timeframe) => {
  const getData = (appId, date, step) => {
    return Math.floor(Math.random() * Math.floor(100));
  };

  let chartData = [];
  let dates = [];
  timeframe = "two-weeks";

  const today = new Date();
  const start = new Date();
  let count;
  if (timeframe === "two-weeks") {
    count = 14;
  } else if (timeframe === "this-quarter") {
    if (
      today.getMonth() === 0 ||
      today.getMonth() === 1 ||
      today.getMonth() === 2
    ) {
      start.setMonth(0);
      start.setDate(1);
    } else if (
      today.getMonth() === 3 ||
      today.getMonth() === 4 ||
      today.getMonth() === 5
    ) {
      start.setMonth(3);
      start.setDate(1);
    } else if (
      today.getMonth() === 6 ||
      today.getMonth() === 7 ||
      today.getMonth() === 8
    ) {
      start.setMonth(6);
      start.setDate(1);
    } else if (
      today.getMonth() === 9 ||
      today.getMonth() === 10 ||
      today.getMonth() === 11
    ) {
      start.setMonth(9);
      start.setDate(1);
    }

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    count = Math.round(Math.abs((today.getTime() - start.getTime()) / oneDay));
  } else if (timeframe === "this-year") {
    start.setDate(1);
    start.setMonth(0);
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    count = Math.round(Math.abs((today.getTime() - start.getTime()) / oneDay));
  }

  var i = 0;
  while (i < count) {
    const next = new Date();
    next.setDate(today.getDate() - (count - i));
    let dateData = getData(appId, next, 1);
    let date = "";
    date =
      date +
      next.getFullYear() +
      "-" +
      String(next.getMonth() + 1) +
      "-" +
      next.getDate();
    chartData.unshift([date, dateData]);
    i++;
  }

  return (
    <div className="row chart-row">
      <AreaChart data={chartData} />
    </div>
  );
};

export default Chart;
