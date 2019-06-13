var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB
// var george = new Cat({
//    name: "George",
//    age: 11,
//    temperament: "Grouchy"
// });

// george.save(function(err, cat){
//    if (err) {
//       console.log("Something went wrong");
//    } else {
//       console.log(cat);
//    }
// });
Cat.create({
   name: "Snow white",
   age: 15,
   temperament: "OK"
}, function(err, cat){
   if (err){
      console.log(err);
   } else {
      console.log("Success")
   }
});

//retrieve all cats from the DB and console.log each


Cat.find({}, function(err, cats){
   if (err) {
      console.log("Oh no Error");
      console.log(err);
   } else {
      console.log(cats);
   }
});