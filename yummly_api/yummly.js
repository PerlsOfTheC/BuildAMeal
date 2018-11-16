require('dotenv').config();

var request = require('request');

yummlyKey = process.env.YUMMLY_API_KEY;
yummlyID = process.env.YUMMLY_API_ID;
console.log("MY_VARIABLE: " + yummlyKey);
console.log("OTHER_VARIABLE: " + yummlyID);

// If time permits throw an error
if (typeof yummlyKey !== 'undefined' && typeof yummlyID !== 'undefined') {
  var appQuery = '?_app_id=' + yummlyID + '&_app_key=' + yummlyKey;
} else {
  var appQuery = "No API keys passed to yummly";
}

var Config = {
  "endpoints": {
    "recipeUrl" : "https://api.yummly.com/v1/api/recipe/",
    "recipesUrl" : "https://api.yummly.com/v1/api/recipes",
    "metaUrl" : "https://api.yummly.com/v1/api/metadata/"
  }
};

var validRequests = ['allergy,', 'course', 'cuisine', 'diet', 'ingredient'];

function searchForRecipe(ingredientList) {
  var url = Config.endpoints.recipesUrl + appQuery;

  if (ingredientList && ingredientList.length > 0 && Array.isArray(ingredientList)) {
    var searchQuery = '';
    for (let i = 0; i < ingredientList.length; i++) {
      if (typeof ingredientList[i] === 'string') {
        searchQuery += ingredientList[i];
        if (i >= 0 && i < ingredientList.length - 1) {
          searchQuery += '+';
        }
      }
    }
    url += '&q=' + encodeURIComponent(searchQuery);
    console.log('URL: ' + url);

    return {
      maxRecipeTime: function(input) {

      }
    }

  }

}

console.log(searchForRecipe(['milk', 'eggs', 'chicken']));
console.log(searchForRecipe(['onion', 'carrot', 'milk', 'brown sugar']));
function getMetadata(url) {

}

function getDetails(recipeID) {

}
