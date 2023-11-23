const express = require('express');
const router = express.Router();
const User = require('../models/DriveTest');
const authMiddleware = require("../middleware/authMiddleware");


// For g2 page 
router.get("/g2", authMiddleware.checkLogin, async (req, res) => {
    const userDetail = await User.findById(loggedIn);
    if (userDetail && userDetail.firstname != "undefine") {
      res.render("g2", { userDetail: userDetail });
    } else {
      res.render("g2", { userDetail: new User() });
    }
  });


// For get data on gr page 
router.post("/getG2data", authMiddleware.checkLogin, async(req, res) => {
    const user = await User.findById(loggedIn);
    if (userDetail && userDetail.license_no != "undefine") {
        res.render("g2", { userDetail: userDetail });
      } else {
        res.render("g2", { userDetail: new userDetails() });
      }
});


// Find licenceNo
router.get("/g2/:licenceNo" , async (req, res) => {
  const userDetail = await userDetail.find({
    license_no: req.params.licenceNo,
  });
  res.render("g2", {
    userDetail,
  });
});


// Update data
router.post("/post/test", async (req, res) => {
  await User.findOneAndUpdate(
    { _id: loggedIn },
    {
      ...req.body,
      car_details: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        platno : req.body.platno,
      },
    }
  );

  res.redirect("/");

});

module.exports = router;