const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const DriveTestSchema = new Schema({
    username: String,
    password: String,
    usertype: String,
    firstname: String,
    lastname: String,
    license_no: String,
    age: Number,
    dob: String,
    car_details: {
        make: String,
        model: String,
        year: Number,
        platno: String,
    }
});


DriveTestSchema.pre("save", function (next) {
    const user = this;

    if (user.license_no == null || user.license_no == "" || user.license_no == undefined) {
        bcrypt.hash(user.password, 10, (error, hash) => {
            user.password = hash;
            next();
        });
    }
    
    if (user.license_no != null) {
        bcrypt.hash(user.license_no, 10, (error, hash) => {
            user.license_no = hash;
            next();
        });
    }
});

const DriveTest = mongoose.model('DriveTest', DriveTestSchema);

module.exports = DriveTest