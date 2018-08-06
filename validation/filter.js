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
