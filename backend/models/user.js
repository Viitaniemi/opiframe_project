const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    email:String,
    type:String,
    activated:Number,
    activationCode: String
});

module.exports = mongoose.model("User",Schema)