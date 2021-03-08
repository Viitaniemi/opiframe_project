const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userModel = require("../models/user");
const sessionModel = require("../models/session");

let router = express.Router();

router.use(bodyParser.json());

//nodemailer email test account
let testAccount = nodemailer.createTestAccount();

//testaccount transporter
let testTransporter = nodemailer.createTransport({
    host:"smtp.etheral.email",
    port:587,
    secure:false,
    auth:{
        user:testAccount.user,
        pass:testAccount.pass
    }
});

//sessions ttl
const ttl = 3600000;

createCode = () => {
    const letters = "abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRST0123456789";
    let token = "";
    for(let i=0;i<64;i++){
        let temp = Math.floor(Math.random()*50);
        token = token + letters[temp];
    }
    return token;
}

//creata a random token for user session
createToken = () => {
    const token = crypto.randomBytes(512);
    return token;
}

//LOGIN API
//registering a user
router.post("/register",function(req,res){
    //check for request body
    if(!req.body){
        return res.status(400).json({message:"Please provide proper credentials"});
    }
    //check for username and password
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message:"Please provide proper credentials"});
    }
    //check for username and password min length
    if(req.body.username.length<4 || req.body.password.length<8) {
        return res.status(400).json({message:"Username must be at least 4 characters and password 8 characters long"});
    }
    //check that the given email is in appropriate fromat
    let emailRegEx = new RegExp("^[A-Za-z0-9]+([\.\-\_]{1}[A-Za-z0-9]+)*@{1}[A-Za-z0-9]+([\.\-]{1}[A-Za-z0-9]+)*\.{1}[A-za-z]{2,}")
    if(!emailRegEx.test(req.body.email)){
        return res.status(400).json({message:"The email address must be valid"});
    }
    //create activation for the user
    let activationCode = createCode();
    //encrypt the received password
    bcrypt.hash(req.body.password,14,function(err,hash){
        //check for encryption error
        if(err){
            return res.status(400).json({message:"Bad request"});
        }
        //create user object for DB
        let user = new userModel({
            username:req.body.username,
            password:hash,
            emai:req.body.email,
            type:"positive",
            activated:1,
            activationCode:activationCode
        });
        //add user to DB
        user.save(function(err,){
            if(err){
                console.log("Failed to register user. Reason:",err);
                if(err.code===11000){
                    return res.status(409).json({message:"Username is already in use"});
                }
                return res.status(500).json({message:"Internal server error"});
            }
            //send account verification email to the user
            /*
            let email = await testTransporter.sendMail({
                from:'viitaniemi-mern-wiki',
                to:emai,
                subject:"Please verify your account registeration",
                html:"<b><p>Please verify your account registeration by clicking the link below:</p></br><a href='http://viitaniemi-mern-wiki.herokuapp.com/activate?username='+req.body.username+'&activationCode='+activationCode'>http://viitaniemi-mern-wiki.herokuapp.com/activate?username='+req.body.username+'&activationCode='+activationCode'</a></b>"
            })
            */

            return res.status(200).json({message:"Success"});
        });
    });
})

//login
router.post("/login",function(req,res){
    //check for request body
    if(!req.body){
        return res.status(400).json({message:"Please provide proper credentials"});
    }
    //check for username and password
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message:"Please provide proper credentials"});
    }
    //check username and password min length
    if(req.body.username.length<4 || req.body.password.length<8) {
        return res.status(400).json({message:"Username must be at least 4 characters and password 8 characters long"});
    }
    //look for the user in DB
    userModel.findOne({"username":req.body.username},function(err,user){
        //check for error
        if(err){
            console.log("Login failed. Reason:",err);
            return res.status(500).json({message:"Internal server error"});
        }
        //check if username exists
        if(!user){
            return res.status(403).json({message:"Forbidden"});
        }
        //compare given password to DB
        bcrypt.compare(req.body.password,user.password,function(err,success){
            //check for error
            if(err){
                return res.status(400).json({message:"Bad request"});
            }
            //if passwords didn't match
            if(!success){
                return res.status(403).json({message:"Forbidden"});
            }
            //create a new session
            let token = createToken();
            let time = Date.now();
            let session = new sessionModel({
                user:user.username,
                ttl:time+ttl,
                token:token
            })
            //add session to DB
            session.save(function(err){
                if(err){
                    console.log("Failed to save session. Reason:",err);
                    return res.status(500).json({message:"Internal server error"});
                }
                return res.status(200).json({token:token});
            });
        });
    });
})

//logout
router.post("/logout",function(req,res){
    let token = req.headers.token;
    //check for token
    if(!token){
        return res.status(404).json({message:"Not found"});
    }
    //delete session based on token
    sessionModel.deleteOne({"token":token},function(err){
        if(err){
            console.log("Failed to remove session in logout. Reason",err);
        }
        return res.status(200).json({message:"logged out"});
    });
})

//activate
router.post("/activate",function(req,res){
    //check for request body
    if(!req.body){
        return res.status(400).json({message:"Please provide all necessary information"});
    }
    //check for activationCode
    if(!req.body.username || !req.body.activationCode){
        return res.status(400).json({message:"Please provide all necessary information"});
    }
    //check username and password min length
    if(req.body.username.length<4 || req.body.activationCode.length!==64) {
        return res.status(400).json({message:"Please provide all necessary information"});
    }
    //look for the user in DB
    let query = {}
    userModel.updateOne({"username":req.body.username, "activationCode":req.body.activationCode},{activated:1},function(err,user){
        //check for error
        if(err){
            console.log("Failed to activate user. Reason:",err);
            return res.status(500).json({message:"Internal server error"});
        }
        return res.status(200).json({message:"Success"});
    });
})

module.exports = router;