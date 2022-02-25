const {check} = require('express-validator');

exports.signupValidation = [
    check('userEmail', 'Please enter valid email').isEmail(),
    check('userPhoneNo', 'Must be 10 digits').isLength(10)
]

exports.loginValidation = [
    check('userEmail', 'Please enter valid email').isEmail()
]

