//TODO create functions for filtering a rating to avoid copy and pasting if statements in api/dashboard get requests

module.exports = function isPositive(rating) {
  let filter = false;

  if (rating.ratingType === "thumbs" && rating.rating === 1) {
    filter = true;
  } else if (rating.ratingType != "thumbs" && rating.rating > 3) {
    filter = true;
  }

  if (filter) {
    return { rating };
  } else {
    return null;
  }
};
