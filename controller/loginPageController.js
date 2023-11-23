const express = require('express');
const router = express.Router();
const User = require('../models/DriveTest');
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/login", authMiddleware.GetLogin, (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {

  res.render("Register");
});

router.post("/post", authMiddleware.GetLogin, async (req, res) => {
  const { username, password } = req.body;
  var existuser = false;
  User.findOne({ username: username }, async (methodError, user) => {
    if (!user) {  
      await User.create(req.body);
      res.locals.registrationSuccess = "User registered successfully! You can now login.";
      res.redirect("/login");
    } else {
      console.log("exist");
      res.render("login", {
        error: "User already registered",
      });
    }
  });
});


router.post("/authenticateUser", authMiddleware.GetLogin, async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.usertype;
          global.loggedIn = req.session.userId;
          global.userType = req.session.userType;
          res.redirect("/");
        } else {
          res.render("login", {
            error: "Password is wrong",
          });
        }
      });
    } else {
      res.render("login", {
        error: "No User Found",
      });
    }
  });
});


router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


module.exports = router;