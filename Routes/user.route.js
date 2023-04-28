const express = require("express");
const { UserModel } = require("../model/user.model");
const  jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const {email,pass,name,age} = req.body
  bcrypt.hash(pass, 5, async function (err, hash) {
    if (err) return res.send({ message: "somthing went wrong", status: 0 });
    try {
      let user = new UserModel({ name, email, pass: hash ,age});
      await user.save();
      res.send({
        message: "User created",
        status: 1,
      });
    } catch (error) {
      res.send({
        message: error.message,
        status: 0,
      });
    }
  });
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  // let option ={
  //   expiresIn:"3m"
  // }

  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ authorID: data[0]._id, author:data[0].name}, "vivek");
      bcrypt.compare(pass, data[0].pass, function (err, result) {
        if (err)
          return res.send({ message: "Somthing went wrong:" + err, status: 0 });
        if (result) {
          res.send({
            message: "User logged in successfully",
            token: token,
            status: 1,
          });
        } else {
          res.send({
            message: "Incorrect password",
            status: 0,
          });
        }
      });
    } else {
      res.send({
        message: "User does not exist",
        status: 0,
      });
    }
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});



module.exports = {
  userRoute,
};
