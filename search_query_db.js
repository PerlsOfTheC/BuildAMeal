var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	function Recipe(sourceDisplayName, ingredients, id, smallImageUrls,
                  totalCookTime, course, cuisine) {
	  this.sourceDisplayName = sourceDisplayName;
	  this.ingredientsList = ingredients;
	  this.searchQuery = id;  // the search query for finding ingredients is the id
	  this.smallImageUrls = smallImageUrls;
	  this.totalCookTime = totalCookTime;
	  this.course = course;
	  this.cuisine = cuisine;
  }

	var dbo = db.db("mydb");
	var recipeList = [
    /*{ _id: 1, name: ["Bacon", "Mac and Cheese"], cooktime: "30 minutes"},
    { _id: 2, name: "Sinigang", cooktime: "75 minutes"},
    { _id: 3, name: "Scrambled Eggs", cooktime: "15 minutes"}, */
    new Recipe()
  ];
	dbo.collection("recipes").insertMany(recipeList, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount)
  });
	dbo.collection("recipes").find().toArray(function(err, res) {
	  if (err) throw err;
	  console.log(res);
	});
	dbo.dropCollection("recipes", function(err, delOK) {
	  if (err) throw err;
	  if (delOK) console.log("Recipe collection deleted");
	  db.close();
  });
});

