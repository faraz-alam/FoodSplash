const mongoose = require("mongoose");
const Restaurant = require("./models/restaurant");
const Comment = require("./models/comment");

var data = [
			{
				name: "Absolute Thunder",
				image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
				description: "Nisi irure duis cupidatat deserunt minim reprehenderit in eu elit laborum dolor velit non sint.",
			},
			{
				name: "Beijing Lush",
				image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
				description: "Lorem ipsum laborum occaecat nostrud eu exercitation cillum in non consequat ad reprehenderit do quis nisi adipisicing commodo ea ad.",
			},
			{
				name: "Mainland China",
				image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
				description: "Velit dolor qui ullamco ullamco qui voluptate commodo labore cupidatat.",
			}
]

function seedDB(){
	
	Restaurant.remove({}, function(err){
		if (err){
			console.log(err);
		} else {
			console.log("Removed all Restaurants!!");
		}
	});

	data.forEach(function(seed){
		Restaurant.create(seed, function(err, restaurant){
			if (err){
				console.log(err);
			} else {
				console.log("Added a Restaurant!!");
				Comment.create({
					text: "Pure taste of China!",
					author: "Faraz",
				}, function (err, comment){
					if (err){
						console.log(err);
					} else {
						restaurant.comments.push(comment);
						restaurant.save();
						console.log("Added a Comment!!");
					}
				});
			}
		});
	});

}

module.exports = seedDB;