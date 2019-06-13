var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});


// "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("goodbye");
})


// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    console.log("someone made a request to /dog");
    res.send("MEOW!!"); 
});

app.get("/r/:subredditName", function(req, res){
    var subreddit = req.params.subredditName.toUpperCase();
    res.send("WELCOME TO THE " + subreddit + " SUBREDDIT!!"); 
});

app.get("*", function(rew, res){
    res.send("You are a star hello");
});

// Tell Express to listen for request (start server);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});