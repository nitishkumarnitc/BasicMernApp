const Validator = require("validator");
const isEmpty = require("is-empty");
const commonValidator=require("./common")
const keys=["name","email","password","password2","location","company","jobTitle","jobDescription"];

module.exports = function validateRegisterInput(data) {
  let errors={}
  commonValidator.emptyFieldsToEmptyString(data,keys);
  commonValidator.checkIsEmpty(data,keys,errors);

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
