//To be used for calculating percentage change over previous timeframe. Takes in time from currently selected tab and calculates the start and stop dates for the previous block of time.
module.exports = function getPreviousDate(time) {
  let start = new Date(); //date to start at
  let current = new Date(); //today
  let stop = new Date(); //date to end at

  start.setHours(0, 0, 0, 0);
  if (time === "two-weeks") {
    stop.setDate(current.getDate() - 14);
    start.setDate(stop.getDate() - 14);
  } else if (time === "this-quarter") {
    if (
      current.getMonth() === 0 ||
      current.getMonth() === 1 ||
      current.getMonth() === 2
    ) {
      stop.setMonth(11); //end at end of 4th quarter from previous year
      stop.setDate(31);
      stop.setYear(current.getFullYear() - 1);
      start.setMonth(9); //start at beginning of 4th quarter from previous year
      start.setDate(1);
      start.setYear(current.getFullYear() - 1);
    } else if (
      current.getMonth() === 3 ||
      current.getMonth() === 4 ||
      current.getMonth() === 5
    ) {
      stop.setMonth(2); //end at end of first quarter of this year
      stop.setDate(30);
      start.setMonth(0); //start at first quarter of this year
      start.setDate(1);
    } else if (
      current.getMonth() === 6 ||
      current.getMonth() === 7 ||
      current.getMonth() === 8
    ) {
      stop.setMonth(5); //end at end of second quarter of this year
      stop.setDate(31);
      start.setMonth(3); //start at beginning of second quarter of this year
      start.setDate(1);
    } else if (
      current.getMonth() === 9 ||
      current.getMonth() === 10 ||
      current.getMonth() === 11
    ) {
      stop.setMonth(8); //end at end of third quarter of this year
      stop.setDate(31);
      start.setMonth(6); //start at start of third quarter of this year
      start.setDate(1);
    }
  } else if (time === "this-year") {
    stop.setMonth(11); //end December 31 of previous year
    stop.setDate(31);
    stop.setYear(current.getFullYear() - 1);
    start.setMonth(0); //start Jan 1 of previous year
    start.setDate(1);
    start.setYear(current.getFullYear() - 1);
  }

  return { start, stop };
};
