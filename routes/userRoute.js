const express = require('express')
const mongoose = require('mongoose');
const UserModel = require('../models/users');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()


const saltRounds = 10;
const secret = process.env.secret;


userRoute.use(express.json())


var cors = require('cors');
userRoute.use(cors());

userRoute.post("/register", async (req, res) => {
    let { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (hash) {
                let data = new UserModel({ name, email, gender, "password": hash });
                await data.save()
                res.send({ "message": `${req.body.name} is successfully registered` })
            } else {
                res.send({ "message": "Error while password encryption" });
            }
        });

    } catch (error) {
        res.send({ "message": "Error while registering" });
    }
})


userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let check = await UserModel.find({ "email": email });
        if (check.length >= 1) {
            bcrypt.compare(password, check[0].password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ email, "username": check[0].username }, secret, { expiresIn: '1h' });
                    res.send({ "message": `Login successfull`,"email": email, token });
                } else {
                    res.send({ "message": "Wrong Credentials" });
                }
            });
        } else {
            res.send({ "message": "Email is not Registered" });
        }

    } catch (error) {
        res.send({ "message": "Error while registering" });
    }
})


module.exports = { userRoute };