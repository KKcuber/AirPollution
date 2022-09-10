var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.get("/", function(req,res){
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
})

router.post("/add",(req,res) => {
    const email = req.body.email;
    const newUser = new User({email: email});
    newUser.save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
})
