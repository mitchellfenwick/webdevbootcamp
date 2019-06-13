var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/embed_demo", {useNewUrlParser: true});

// POST - title, content
var postSchema = mongoose.Schema({
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = mongoose.Schema({
   email: String,
   name: String,
   posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class if you want to learn!"
// });

// newUser.save(function(err, user){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Hermione Granger"}, function(err, user){
   if (err) {
       console.log(err);
   } else {
       user.posts.push({
          title: "Three things I really hate",
          Content: "Voldemort, Voldemort, and Voldemort"
       });
       user.save(function(err, savedUser){
           if (err) {
               console.log(err);
           } else {
               console.log(savedUser);
           }
       })
   }
});