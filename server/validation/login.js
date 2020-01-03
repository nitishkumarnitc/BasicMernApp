const Validator = require("validator");
const isEmpty = require("is-empty");
const commonValidator=require('./common');
const keys=["email","password"];

module.exports = function validateLoginInput(data) {
  let errors={}
  commonValidator.emptyFieldsToEmptyString(data,keys);
  commonValidator.checkIsEmpty(data,keys,errors);
  // Email checks
  if(!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
