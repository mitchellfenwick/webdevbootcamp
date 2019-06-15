//=================================
// Campground Routes
//=================================

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// Index
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds:allCampgrounds});
       }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});


// New campground
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           console.log(err);
       } else {
            res.render("campgrounds/show", {campground:foundCampground}); 
       }
    });
    //render show template with that campground
});


// Create campground
router.post("/", isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name
   var image = req.body.image
   var description = req.body.description;
   var newCampground = {name: name, image: image, description: description};
   // Create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {res.redirect("/campgrounds");
      }
   });

   //redirect back to campgrounds page
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