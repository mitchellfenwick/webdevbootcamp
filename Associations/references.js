var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reference_demo", {useNewUrlParser: true});

var Post = require("./models/post");
var User = require("./models/user");

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

// Post.create({
//     title: "How to cook the best burger pt 4",
//     content: "get some good buns"
// }, function(err, post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, savedUser){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(savedUser);
//                 }
//             })        
//         }
//     });
// });

// Find user
// Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });