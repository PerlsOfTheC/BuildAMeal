var request = require('request');

if (yummlyKeys.appKeys && yummlyKeys.appID) {
  var appQuery = '?_app_id=' + yummlyKeys.appID + '&_app_key=' + yummlyKeys.appKeys;
}

var Config = {
  "endpoints": {
    "recipe" : "https://api.yummly.com/v1/api/recipe/",
    "recipes" : "https://api.yummly.com/v1/api/recipes",
    "meta" : "https://api.yummly.com/v1/api/metadata/"
  }
};

var validRequests = ['allergy,', 'course', 'cuisine', 'diet', 'ingredient'];

function query(input) {

}

function getMetadata(url) {

}

function getDetails(recipeID) {

}
