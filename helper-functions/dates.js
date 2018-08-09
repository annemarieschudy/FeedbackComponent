module.exports = function setDates(req) {
  //based on the time frame in req.params.timeframe, determine the date to start counting feedback from and the date to stop counting feedback after (current). Return both dates.

  let start = new Date();
  let current = new Date();

  start.setHours(0, 0, 0, 0);
  if (req.params.timeframe === "two-weeks") {
    start.setDate(current.getDate() - 14);
  } else if (req.params.timeframe === "this-quarter") {
    start.setDate(1);
    if (
      current.getMonth() === 0 ||
      current.getMonth() === 1 ||
      current.getMonth() === 2
    ) {
      start.setMonth(0);
      start.setDate(1);
    } else if (
      current.getMonth() === 3 ||
      current.getMonth() === 4 ||
      current.getMonth() === 5
    ) {
      start.setMonth(3);
      start.setDate(1);
    } else if (
      current.getMonth() === 6 ||
      current.getMonth() === 7 ||
      current.getMonth() === 8
    ) {
      start.setMonth(6);
      start.setDate(1);
    } else if (
      current.getMonth() === 9 ||
      current.getMonth() === 10 ||
      current.getMonth() === 11
    ) {
      start.setMonth(9);
      start.setDate(1);
    }
  } else if (req.params.timeframe === "this-year") {
    start.setMonth(0);
    start.setDate(1);
  } else if (req.params.timeframe === "custom") {
    if (req.query["startyear"]) {
      start.setYear(req.query["startyear"]);
    }
    if (req.query["startmonth"]) {
      start.setMonth(req.query["startmonth"] - 1);
    } else {
      start.setMonth(0);
    }
    if (req.query["startdate"]) {
      start.setDate(req.query["startdate"]);
    } else {
      start.setDate(1);
    }

    if (req.query["endyear"]) {
      current.setYear(req.query["endyear"]);

      if (req.query["endmonth"]) {
        current.setMonth(req.query["endmonth"] - 1);
      } else {
        current.setMonth(0);
      }
      if (req.query["enddate"]) {
        current.setDate(req.query["enddate"]);
      } else {
        current.setDate(1);
      }
    }
  }

  if (current <= start) {
    const temp = current;
    current = start;
    start = temp;
  }

  return { start, current };
};
