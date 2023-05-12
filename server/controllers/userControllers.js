const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET


//all users
exports.getUsers = async (req, res) => {
  let success = false;
  try { 
    const user =await User.find({})
    return res.status(200).send({user})
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all user callback",
    });
  }
};

//register user
exports.registerUser = async (req, res) => {
  let success = false;
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(200).send({
        success: false,
        message: "User with this email already exists",
      });
    }

    const secPass = await bcrypt.hash(password, 10);

    user = await User.create({
      name: name,
      email: email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken =await jwt.sign(data, JWT_SECRET); 
    success = true;
    res.status(200).send({ success, message: "User created successfully", authtoken });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in register callback",
    });
  }
};

//login user
exports.loginUser = async (req, res) => {
  let success = false;
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Please login with correct credentials",
        });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Please login with correct credentials",
        });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(200).send({ success, message: "User login succesfully", authtoken});
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login callback",
    });
  }
};
