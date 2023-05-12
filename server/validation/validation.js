const {check, validationResult} = require('express-validator');


exports.register =[
check("email").isEmail().withMessage("please fill all the fields"),
check("name").isLength({min:3}).withMessage("minimum 3 character required"),
check("password").isLength({min:8}).withMessage('minimum 8 character required'),
(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

exports.login = [
  check("email").isEmail().withMessage("please fill all the fields"),
  check("password").isLength({min:8}).withMessage('minimum 8 character required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
]

exports.createNote =[
  check("title").isEmpty().withMessage("title is should not be empty"),
  check("description").isLength({min:5}).withMessage("description should be 5 character atleast")
]