const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/food_splash_3", {useNewUrlParser: true});

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

seedDB();

app.use(bodyParser.urlencoded({extended: true}));


//* Restaurant routes *//

app.get("/", function(req, res){
	res.render("index");
});

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

app.get("/restaurants/:id/comments/new", function(req, res){
	Restaurant.findById(req.params.id, function(err, restaurant){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {restaurant: restaurant});
		}
	});
});

app.post("/restaurants/:id/comments", function(req, res){
	Restaurant.findById(req.params.id, function(err, restaurant){
		if(err){
			console.log(err);
		} else {
			var text = req.body.text;
			var author = req.body.author;
			var newComment = {text: text, author: author};
			Comment.create(newComment, function(err, comment){
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





app.listen(3000, function(){
	console.log("Server is running!");
});


