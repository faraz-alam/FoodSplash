const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/food_splash", {useNewUrlParser: true});

const restaurantSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.render("index");
});

app.get("/restaurants", function(req, res){
	Restaurant.find({}, function(err, allrestaurants){
		if(err){
			console.log(err);
		} else {
			res.render("restaurants", {restaurants: allrestaurants});
		}
	});
});

app.get("/restaurants/new", function(req, res){
	res.render("new");
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
	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if(err){
			console.log(err);
		} else{
			res.render("show", {restaurant: foundRestaurant});
		}
	});
});

app.listen(3000, function(){
	console.log("Server is running!");
});


