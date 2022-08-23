const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/tests10")
const userModel = require("./database/models/user.model")
const data = new userModel({
    name:"marwa",
    email:"test@test3.com",
    password:"ntisten",
    age:35,
    gender:"Male"
})

data.save().then(d=> console.log(d)).catch(e=> console.log(e.message))