var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
    {name: "New Plymouth", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=adventure-camping-grass-1687845.jpg&fm=jpg"},
    {name: "Mountaing Rest", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-camp-campfire-1061640.jpg&fm=jpg"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
    {name: "New Plymouth", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=adventure-camping-grass-1687845.jpg&fm=jpg"},
    {name: "Mountaing Rest", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-camp-campfire-1061640.jpg&fm=jpg"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?cs=srgb&dl=adventure-camp-camping-699558.jpg&fm=jpg"},
    {name: "New Plymouth", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=adventure-camping-grass-1687845.jpg&fm=jpg"},
    {name: "Mountaing Rest", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?cs=srgb&dl=bonfire-camp-campfire-1061640.jpg&fm=jpg"}
];

app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
   var name = req.body.name
   var image = req.body.image
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
   //redirect back to campgrounds page
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp server has started");
});