var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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

app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if (err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds:allCampgrounds});
       }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err){
           console.log(err);
       } else {
               res.render("show", {campground:foundCampground}); 
       }
    });
    //render show template with that campground
});

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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started");
});