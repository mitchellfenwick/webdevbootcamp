var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render('search'); 
});

app.get("/results", function(req, res){
   var searchInput = req.query.searchInput;
   var url = "http://www.omdbapi.com/?s=" + searchInput + "&apikey=thewdb";
   request(url, function(error, response, body) {
       if (!error && response.statusCode == 200) {
           var parsedBody = JSON.parse(body);
           res.render('result', {data: parsedBody});
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie API has started") ;
});