const express = require('express');
require('dotenv').config()
const secret = process.env.secret;

var jwt = require('jsonwebtoken');


const authenticator = async (req, res) => {
    let token = req.body;
    try {
        jwt.verify(token, secret, async (err, decoded)=> {
            if(decoded){
                next();
            } else {
                res.send({"message": "Not Authorized"});
            }
        });
    } catch (error) {
        res.send({"message": "Something Went Wrong"});
    }
}


module.exports = {authenticator};