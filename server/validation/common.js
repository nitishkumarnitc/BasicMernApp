const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = {
    emptyFieldsToEmptyString: (data, keys) => {
        keys.forEach((key) => {
            data[key] = !isEmpty(data[key]) ? data[key] : ""
        })
    },
    checkIsEmpty: (data,keys,errors) => {

        keys.forEach((key) => {
            if (Validator.isEmpty(data[key])) {
                errors[key] = key + " field is required";
            }
        })

    }
}