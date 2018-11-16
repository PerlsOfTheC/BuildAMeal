require('dotenv').config();

var request = require('request');


yummlyKey = process.env.YUMMLY_API_KEY;
yummlyID = process.env.YUMMLY_API_ID;
//Debugging
console.log("MY_VARIABLE: " + yummlyKey);
console.log("OTHER_VARIABLE: " + yummlyID);

if (typeof yummlyKey !== 'undefined' && typeof yummlyID !== 'undefined') {
  var appQuery = '?_app_id=' + yummlyID + '&_app_key=' + yummlyKey;
} else {
  throw new Error("API credentials improperly passed into yummly.js");
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
  var apiParameters = {};

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

    return {
      maxRecipeTime: function(input) {
        if (input && typeof input === 'number') {
          url += '&maxTotalTimeInSeconds=' + input;
          apiParameters.maxRecipeTime = input;
        }

        return this;
      },

      requiredIngredients: function(input) {
        if (input && input.length) {
          apiParameters.requiredIngredients = apiParameters.requiredIngredients || [];

          if (Array.isArray(input)) {
            input.forEach(function(item) {
              url += '&allowedIngredient[]=' + encodeURIComponent(item);
              apiParameters.requiredIngredients.push(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedIngredient[]=' + encodeURIComponent(input);
            apiParameters.requiredIngredients.push(input);
          }

        }

        return this;
      },

      maxResults: function(input) {
        if (input && typeof input == 'number') {
          url += '&maxResult=' + input;
          apiParameters.maxResults = input;
        }

        return this;
      },

      includedAllergies: function(input) {
        if (input && input.length) {

          apiParameters.includedAllergies = apiParameters.includedAllergies || [];

          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&includedAllergy[]=' + encodeURIComponent(item);
              apiParameters.includedAllergies.push(input);
            });
          } else if (typeof input == 'string') {
            url += '&includedAllergy[]=' + encodeURIComponent(input);
            apiParameters.includedAllergies.push(input);
          }
        }

        return this;
      },

      requiredDiets: function(input) {
        if (input && input.length) {
          apiParameters.requiredDiets = apiParameters.requiredDiets || [];

          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&allowedDiet[]=' + encodeURIComponent(item);
              apiParameters.requiredDiets.push(item);
            });
          } else if (typeof input == 'string') {
            url += '&allowedDiet[]=' + encodeURIComponent(input);
            apiParameters.requiredDiets.push(input);
          }
        }

        return this;
      },

      requiredCuisines: function(input) {
        if (input && input.length) {
          apiParameters.requiredCuisines = apiParameters.requiredCuisines || [];
          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item);
              apiParameters.requiredCuisines.push(item);
            });
          } else if (typeof input == 'string') {
            url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input);
            apiParameters.requiredCuisines.push(input);
          }
        }

        return this;
      },

      excludedCuisines: function(input) {
        if (input && input.length) {
          apiParameters.excludedCuisines = apiParameters.excludedCuisines || [];
          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item);
              apiParameters.excludedCuisines.push(item);
            });
          } else if (typeof input == 'string') {
            url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input);
            apiParameters.excludedCuisines.push(input);
          }
        }

        return this;
      },

      requiredCourses: function(input) {
        if (input && input.length) {
          apiParameters.requiredCourses = apiParameters.requiredCourses || [];
          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&allowedCourse[]=course^course-' + encodeURIComponent(item);
              apiParameters.requiredCourses.push(item);
            });
          } else if (typeof input === 'string') {
            url += '&allowedCourse[]=course^course-' + encodeURIComponent(input);
            apiParameters.requiredCourses.push(input);
          }
        }

        return this;
      },

      excludedCourses: function(input) {
        if (input && input.length) {
          apiParameters.excludedCourses = apiParameters.excludedCourses || [];
          if (input instanceof Array) {
            input.forEach(function(item) {
              url += '&excludedCourse[]=course^course-' + encodeURIComponent(item);
              apiParameters.excludedCourses.push(item);
            });
          } else if (typeof input === 'string') {
            url += '&excludedCourse[]=course^course-' + encodeURIComponent(input);
            apiParameters.excludedCourses.push(input);
          }
        }

        return this;
      },
    }

  }

}

console.log(searchForRecipe(['milk', 'eggs', 'chicken']));
console.log(searchForRecipe(['onion', 'carrot', 'milk', 'brown sugar'])
  .maxRecipeTime(10)
  .excludedCuisines('Asian'));

function getMetadata(url) {

}

function getDetails(recipeID) {

}
