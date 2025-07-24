const express = require("express");
const { validateUser } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAuth = require("../middlewares/auth");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", userAuth, async (req, res) => {
  try {
    //validate the password
    // validateUser(req);

    const { firstName, lastName, emailId, password } = req.body;

    //encrytp the password

    
const passwordHash = await bcrypt.hash(password, 10); //password and salt (how many time it has to salted)
    console.log(passwordHash);
    //creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    console.log(req.body);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

authRouter.post("/login", userAuth, async (req, res) => {
  const { emailId, password } = req.body;

  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    throw new Error("User not found");
  }

  //comparing the password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    //create a jwt token
    const token = await jwt.sign({ _id: user._id }, "Sushtoken@123"); //user and secret key
    console.log(token);

    //add the token to cookie and send the response to the user
    res.cookie("token", token);
    res.send("Login successful");
  } else {
    throw new Error("Invalid credentials");
  }
});

module.exports = authRouter;