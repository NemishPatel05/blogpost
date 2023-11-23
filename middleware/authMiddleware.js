
const User = require("../models/DriveTest");


const checkLogin = (req, res, next) => {
  if (!loggedIn) {
    return res.redirect("/login");
  } else if ((req.path == "/g2" || req.path == "/g") && userType != "Driver") {
    return res.redirect("/");
  }

  next();

};

const GetLogin = (req, res, next) => {

  if (loggedIn) {
    return res.redirect("/");
  }

  next();

};

module.exports = { checkLogin, GetLogin };
