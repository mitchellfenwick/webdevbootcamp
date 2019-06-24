var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport   = require("passport");

// Landing page
router.get("/", function(req, res) {
    res.render("landing"); 
 });
 
 // ====================================
 // Auth Routes
 // ====================================
 
 // Show register form
 router.get("/register", function(req, res){
     res.render("register");
 });
 
 // Handle user sign up
 router.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if (err) {
             console.log("error");
             return res.render("register");
         }
         passport.authenticate("local")(req, res, function(){
             res.redirect("/campgrounds");
         });
     });
 });
 
 // Show login form
 router.get("/login", function(req, res){
     res.render("login");
 });
 
 // Handle user login
 router.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // Handle logout
 router.get("/logout", function(req, res){
     req.logout();
     res.redirect("/campgrounds");
 });

 module.exports = router;