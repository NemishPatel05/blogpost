const express = require('express');
const router = express.Router();
const User = require('../models/DriveTest');
const authMiddleware = require("../middleware/authMiddleware");


router.get("/g", authMiddleware.checkLogin, async (req, res) => {
    const user = await User.findById(loggedIn);
    if (user) {
        res.render("g", { user: user });
    } else {
        res.render("g", {
        error: "No User Found",
        });
    }
});


router.post("/g/displayData", authMiddleware.checkLogin, async (req, res) => {
    const license = req.body.license;
    const user = await User.find({license_no : license});
    if(user.length > 0){
        res.render("g", {
            user
        })
    }
    else{
        res.render("g", {
            error : "No user found!"
        })
    }
    
})


router.post("/update/drivetests", authMiddleware.checkLogin, async (req, res) => {
    await User.findOneAndUpdate(
        {license: (req.body.license_no).toString()},
        {
            car_details : { 
                make : req.body.make,
                model : req.body.model,
                year : req.body.year,
                platno : req.body.platno
        }
        }
    );
    res.render("g");
})


module.exports = router;