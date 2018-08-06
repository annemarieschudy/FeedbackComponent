const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInput(data) {
  let errors = {};

  data.walmartId = !isEmpty(data.walmartId) ? data.walmartId : "";
  data.comment = !isEmpty(data.comment) ? data.comment : "";

  //if user has opted in to be contacted, they must supply their walmart Id number
  if (data.canContact === "true" || data.canContact == true) {
    if (Validator.isEmpty(data.walmartId)) {
      errors.walmartId = "Id field is required";
    }
  }

  //if user provides a comment it must be between 2 and 280 characters
  if (!Validator.isEmpty(data.comment)) {
    if (!Validator.isLength(data.comment, { min: 2 })) {
      errors.comment =
        "Speak up please, comment must be at least two characters.";
    } else if (!Validator.isLength(data.comment, { max: 280 })) {
      errors.comment = "Wowza! Comment cannot exceed 280 characters.";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
