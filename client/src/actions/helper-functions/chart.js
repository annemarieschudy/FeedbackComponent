//Gets an array of the dates needed for the chart based on the timeframe tab currently selected.
//If "two-weeks", counts back 14 days from the current date, if "this-quarter" it counts back to the beginning of the current quarter, same for "this-year". Returns an array of date objects.
module.exports = function getChartDates(timeframe) {
  let dates = [];

  const today = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  //used for calculating how many dates to return
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  let count;
  if (timeframe === "two-weeks") {
    count = 14;
  } else if (timeframe === "this-quarter") {
    if (
      today.getMonth() === 0 ||
      today.getMonth() === 1 ||
      today.getMonth() === 2
    ) {
      start.setMonth(0); //first quarter
      start.setDate(1);
    } else if (
      today.getMonth() === 3 ||
      today.getMonth() === 4 ||
      today.getMonth() === 5
    ) {
      start.setMonth(3); //second quarter
      start.setDate(1);
    } else if (
      today.getMonth() === 6 ||
      today.getMonth() === 7 ||
      today.getMonth() === 8
    ) {
      start.setMonth(6); //third quarter
      start.setDate(1);
    } else if (
      today.getMonth() === 9 ||
      today.getMonth() === 10 ||
      today.getMonth() === 11
    ) {
      start.setMonth(9); //fourth quarter
      start.setDate(1);
    }
    //calculate number of dats from today to start date
    count = Math.round(Math.abs((today.getTime() - start.getTime()) / oneDay));
  } else if (timeframe === "this-year") {
    start.setDate(1);
    start.setMonth(0);
    count = Math.round(Math.abs((today.getTime() - start.getTime()) / oneDay));
  } else if (timeframe === "custom") {
    //TODO
  }

  var i = 0;
  while (i < count + 1) {
    const next = new Date(); //create the date
    next.setDate(today.getDate() - (count - i));
    i++;
    dates.unshift(next);
  }

  return dates;
};
