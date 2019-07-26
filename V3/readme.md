#FoodSplash

##Initial Setup
* Add Index Page
* Add restaurants Page that lists all restaurants

Each Restaurant has:
   * Name
   * Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Restaurant
* Setup new restaurant POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the restaurants page
* Add a better header/title
* Make restaurants display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new restaurant form

#Add Mongoose
* Install and configure Mongoose
* Setup restaurant model
* Use restaurant model inside of our routes

#Show Page
* Add description to our restaurant model
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment model!
* Display comments on restaurant show page

#Comment New/Create
* Add the comment new and create routes
* Add the new comment form



RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /restaurants
NEW     /restaurants/new
CREATE  /restaurants
SHOW    /restaurants/:id

NEW     restaurants/:id/comments/new    GET
CREATE  restaurants/:id/comments      POST
