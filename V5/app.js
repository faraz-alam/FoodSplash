const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const Restaurant = require("./models/restaurant");
const Comment = require("./models/comment");
var User = require("./models/user");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/food_splash_3", {useNewUrlParser: true});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

seedDB();

app.use(bodyParser.urlencoded({extended: true}));

//* Passport Configuration *//
app.use(require("express-session")({
	secret: "My First App",
	resave: false,
	saveUninitialized: false
}));

//* Using Passport JS functionalities/ Packages *//
app.use(passport.initialize());
app.use(passport.session());

//* To be used while authenticating user logging in *//
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//* This current user will be used by each and every route *//
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//* ROUTES *//

app.get("/", function(req, res){
	res.render("index");
});


//* Restaurant routes *//

app.get("/restaurants", function(req, res){
	Restaurant.find({}, function(err, allrestaurants){
		if(err){
			console.log(err);
		} else {
			res.render("restaurants/restaurants", {restaurants: allrestaurants});
		}
	});
});

app.get("/restaurants/new", function(req, res){
	res.render("restaurants/new");
});

app.post("/restaurants", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newRestaurant = {name: name, image: image, description: desc}
	Restaurant.create(newRestaurant, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/restaurants");
		}
	});
});

app.get("/restaurants/:id", function(req, res){
	Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
		if(err){
			console.log(err);
		} else{
			res.render("restaurants/show", {restaurant: foundRestaurant});
		}
	});
});


//* Comments Route *//

app.get("/restaurants/:id/comments/new", isLoggedIn, function(req, res){
	Restaurant.findById(req.params.id, function(err, restaurant){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {restaurant: restaurant});
		}
	});
});

app.post("/restaurants/:id/comments", isLoggedIn, function(req, res){
	Restaurant.findById(req.params.id, function(err, restaurant){
		if(err){
			console.log(err);
			res.redirect("/restaurants");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					restaurant.comments.push(comment);
					restaurant.save();
					res.redirect("/restaurants/" + restaurant._id);
				}
			});
		}
	});
});	


//==================================================
// AUTH ROUTES
//==================================================

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

// handle sign up logic
app.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      } 
      passport.authenticate("local")(req, res, function(){
         res.redirect("/restaurants");
      });
   });
});

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic || middleware - passport.authenticate("", {}) is working here as middleware as it is running before our callback.
app.post("/login", passport.authenticate("local", {
   successRedirect: "/restaurants",
   failureRedirect: "/login"
}), function(req, res){
});

// log out logic
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/restaurants");
});

// middleware function to check if a user is logged in
function isLoggedIn(req, res, next){
   if(req.isAuthenticated()){
       return next();
   } 
   res.redirect("/login");
}



app.listen(3000, function(){
	console.log("Server is running!");
});


