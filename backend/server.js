const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const config = require("./config");
const sessionModel = require("./models/session");

let app = express();

//use local DB
mongoose.connect("mongodb://localhost/webshopping").then(
    () => console.log("Connected to MongoDB"),
    (error) => console.log("Failed to connect to MongoDB. Reason:",error)
);

/*
//use remote DB
mongoose.connect("mongodb+srv://"+config.username+":"+config.password+"@"+config.url+"/myFirstDatabase?retryWrites=true&w=majority").then(
    () => console.log("Connected to MongoDB"),
    (error) => console.log("Failed to connect to MongoDB. Reason:",error)
);
*/

app.use(bodyParser.json());

//sessions ttl
const ttl = 3600000;


//HELPER FUNCTIONS
//check if user is loggedin
isUserLogged = (req,res,next) => {
    let token = req.headers.token;
    //look for session in DB
    sessionModel.findOne({"token":token},function(err,session){
        //check for errors
        if(err){
            console.log("Failed to find session. Reason:",err);
            return res.status(403).json({message:"Forbidden"});
        }
        //check if session exists
        if(!session){
            return res.status(403).json({message:"Forbidden"});
        }
        //check if session has expired
        let now = Date.now();
        if(session.ttl<now){
            //remove expired session from DB
            sessionModel.deleteOne({"_id":session._id},function(err){
                if(err){
                    console.log("Failedto remove session. Reason",err);
                }
                return res.status(403).json({message:"Forbidden"});
            })
        }else{ //update session ttl
            req.session = {};
            req.session.user = session.user;
            session.ttl = now+ttl;
            session.save(function(err){
                if(err){
                    console.log("Failed to save session. Reason",err);
                }
                return next();
            })
        }
    });
}

app.use("/user",userRoutes);
app.use("/api",isUserLogged,apiRoutes);

app.listen(3001);
console.log('backend started, listening on port: 3001');