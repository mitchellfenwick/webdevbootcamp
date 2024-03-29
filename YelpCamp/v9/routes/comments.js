//==============================================
// Comments Routes
//==============================================

var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
var middleware = require("../middleware");

// New Route
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save the comment
                    comment.save();
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

// Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
});

// Update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("/campgrounds/"+ req.params.id + "/comments/" + req.params.comment_id + "/edit");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;