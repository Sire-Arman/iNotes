const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const JWt_secret = "armanistheOG@";
const fetchuser = require("../middlewares/fetchuser");
const { body, validationResult } = require("express-validator");
//1: Creaing a user /api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password must contain at least 8 characters.").isLength({min: 8,}),
    body("email", "enter a valid email").isEmail(),
  ],
  async (req, res) => {
    // If errors are found, return BAD request along with the error.
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // check whether email is unique or not

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user already exists with that email" });
      }
      //   user is being created
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      });

      // No use of then while using async await
      // .then(user =>res.json(user)).catch(err=>{console.log(err)
      //     res.json({error:"please enter a unique value", messasge:err.messasge})
      // })
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWt_secret);
      //   console.log(jwtData);
      res.send({ authtoken });
    } catch (error) {
      // catch will look any unidentifiable error and displays a custom message
      console.log(error.message);
      // res.status sends a bad request along with a message
      res.status(500).json({ error: "Internal Server Error Occured!" });
    }
  }
);
// 2: Authenticating a user /api/auth/login
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // check for errors like invalid email
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        res.status(400).json({ success, error: "Please enter correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      // console.log("check");
      if (!passwordcompare) {
        success=false;
        res.status(400).json({ success,error: "Enter correct details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWt_secret);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      // res.status sends a bad request along with a message
      res.status(500).send("Internal Server Error Occured!");
    }
  }
);

// 3: Getting user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    // res.status sends a bad request along with a message
    res.status(500).send("Internal Server Error Occured!");
  }
});

module.exports = router;
