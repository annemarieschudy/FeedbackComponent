const Validator = require("validator");

module.exports = function validateComment(data) {
  let errors = "";
  let isValid;

  data = !isEmpty(data) ? data : "";

  //if user provides a comment it must be between 2 and 280 characters
  if (!Validator.isEmpty(data)) {
    if (!Validator.isLength(data, { min: 2 })) {
      errors = "Speak up please, comment must be at least two characters.";
    } else if (!Validator.isLength(data, { max: 280 })) {
      errors = "Wowza! Comment cannot exceed 280 characters.";
    }
  }

  //if user has opted in to be contacted, they must supply their walmart Id number
  /*   if (data.canContact === "true" || data.canContact == true) {
    if (Validator.isEmpty(data.walmartId)) {
      errors.walmartId = "Id field is required";
    }
  }
 */

  if (errors === "") {
    isValid = true;
  } else {
    isValid = false;
  }

  return {
    errors,
    isValid
  };
};

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
