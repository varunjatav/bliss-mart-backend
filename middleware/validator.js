const {body} = require('express-validator');

 const signUpValidator = [
    body("mobileNumber").isLength({min:10}).withMessage("Mobile number must be at least 10 digits").notEmpty().withMessage("Please enter a mobile number"),
    body("email").isEmail().withMessage("Please enter a valid email address").notEmpty().withMessage("Please enter a email address"),
    body("firstName").notEmpty().withMessage("Please enter your first name"),
    body("lastName").notEmpty().withMessage("Please enter your last name"),
    body("password").isLength({min:5}).withMessage("Your Password must be of 5 characters").notEmpty().withMessage("Please enter a password"),
];

 const loginValidator = [
    body("email").isEmail().withMessage("Please enter a valid email address").notEmpty().withMessage("Please enter a email address"),
    body("password").isLength({min:5}).withMessage("Your Password must be of 5 characters").notEmpty().withMessage("Please enter a password"),
];

module.exports = {signUpValidator, loginValidator}