const express = require('express');

const router = express.Router();

const User = require('../models/UserModel');


router.post("/", (req, res) =>{
    res.render('dashboard');
});


router.post("/post/test", async (req, res) => {
    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let platno = req.body.platno;
    await User.create({
        ...req.body,
        car_details:{
            make : make,
            model : model,
            year : year,
            platno : platno
        }
    });
    res.redirect('/');
});


router.post("/g/displayData", async (req, res) => {
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
});


router.post("/update/drivetests", async (req, res) => {
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

});


module.exports = router;