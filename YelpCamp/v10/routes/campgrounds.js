//=================================
// Campground Routes
//=================================

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

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
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err || !foundCampground){
           req.flash("error", "Campground not found");
           res.redirect("back");
       } else {
            res.render("campgrounds/show", {campground:foundCampground}); 
       }
    });
    //render show template with that campground
});


// Create campground
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, price: price, author: author};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if (err) {
            console.log(err);
        } else {
            req.flash("success", "Successfully updated campground");
            res.redirect("/campgrounds");
        }
    });

   //redirect back to campgrounds page
});

// Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            // Does the user own the campground
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect("campgrounds");
        } else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // Redirect somewhere
});

// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            Comment.deleteMany({_id: {$in: foundCampground.comments}}, function(err){
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            })
            // foundCampground.comments.forEach(function(comment){
            //     Comment.findByIdAndDelete(comment._id, function(err){
            //         if (err) {
            //             console.log(err);
            //         }
            //     });
            // });
            // foundCampground.remove(function(err){
            //     if (err){
            //         console.log(err);
            //     } else {
            //         res.redirect("/campgrounds");
            //     }
            // });
        }
    });
});

module.exports = router;