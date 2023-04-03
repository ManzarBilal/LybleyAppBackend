const express = require("express");
const router = new express.Router();
const UserModel = require("../models/userRegistrationModel");

router.post("/userRegistration", async (req, res) => {
    try {
        let body = req.body;
        let existUser = await UserModel.findOne({ email: body.email });
        if (existUser) {
            res.json({ status: false, msg: "Email already exists" });
        } else {
            let user = new UserModel(body);
            let user1 = await user.save();
            res.json({ status: true, msg: "User registration successfully" });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/userLogin", async (req, res) => {
    try {
        let body = req.body;
        let checkUser = await UserModel.findOne({ email: body.email, password: body.password });
        if (checkUser) {
            res.json({ status: true, user: checkUser, msg: "User Login successfully" });
        } else {
            res.json({ status: false, msg: "Incorrect Username and Password" });
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;