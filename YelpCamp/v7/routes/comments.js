//==============================================
// Comments Routes
//==============================================

var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

// New Route
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Create Route
router.post("/", isLoggedIn, function(req, res){
    //Lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    })    
});

 // Middleware
 // Checks if a user is logged in
 function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;