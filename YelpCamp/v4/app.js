var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    seedDB     = require("./seeds");



mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//         description: "This is a huge granite hill, no bathrooms, no water. Beautiful granite."
//     },
//     function(err, campground){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(campground);
//         }
//     }
// );

// Landing page
app.get("/", function(req, res) {
   res.render("landing"); 
});


// Index
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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
app.post("/campgrounds", function(req, res){
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

//==============================================
// COMMENTS ROUTES
//==============================================

// New Route
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Create Route
app.post("/campgrounds/:id/comments", function(req, res){
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

app.listen(8080, "127.0.0.1", function(){
    console.log("The Yelp Camp server has started");
});