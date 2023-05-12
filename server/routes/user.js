const express = require("express");
const { getUsers, registerUser, loginUser } = require("../controllers/userControllers")
const {register,login} = require("../validation/validation")

//router object
const router = express.Router();

//All users
router.get("/all-users",getUsers)

//Register or Signup
router.post("/register",register,registerUser)

//Login
router.post("/login",login,loginUser)


module.exports = router;