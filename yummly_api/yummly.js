require('dotenv').config();

const request = require('request');


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

const Config = {
  "endpoints": {
    "recipeUrl" : "https://api.yummly.com/v1/api/recipe/",
    "recipesUrl" : "https://api.yummly.com/v1/api/recipes",
    "metaUrl" : "https://api.yummly.com/v1/api/metadata/"
  }
};

// Issue with returning URL before getting JSON info
function searchForRecipe(ingredientList) {
  var url = Config.endpoints.recipesUrl + appQuery;

  if (ingredientList && ingredientList.length && Array.isArray(ingredientList)) {
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
      maxRecipeTime: function (input) {
        if (input && typeof input === 'number') {
          url += '&maxTotalTimeInSeconds=' + input;
        }

        return this;
      },

      requiredIngredients: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedIngredient[]=' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedIngredient[]=' + encodeURIComponent(input);
          }

        }

        return this;
      },

      maxResults: function (input) {
        if (input && typeof input === 'number') {
          url += '&maxResult=' + input;
        }

        return this;
      },

      includedAllergies: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&includedAllergy[]=' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&includedAllergy[]=' + encodeURIComponent(input);
          }
        }

        return this;
      },

      requiredDiets: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedDiet[]=' + encodeURIComponent(item);
              apiParameters.requiredDiets.push(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedDiet[]=' + encodeURIComponent(input);
          }
        }

        return this;
      },

      requiredCuisines: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item.toLowerCase());
            });

          } else if (typeof input === 'string') {
            url += '&allowedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input.toLowerCase());
          }
        }

        return this;
      },

      excludedCuisines: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(item.toLowerCase());
            });

          } else if (typeof input === 'string') {
            url += '&excludedCuisine[]=cuisine^cuisine-' + encodeURIComponent(input.toLowerCase());
          }
        }

        return this;
      },

      requiredCourses: function (input) {
        if (input && input.length) {
          if (Array.isArray(input)) {
            input.forEach(function (item) {
              url += '&allowedCourse[]=course^course-' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&allowedCourse[]=course^course-' + encodeURIComponent(input);
          }
        }

        return this;
      },

      excludedCourses: function (input) {
        if (input && input.length) {
          if (input instanceof Array) {
            input.forEach(function (item) {
              url += '&excludedCourse[]=course^course-' + encodeURIComponent(item);
            });

          } else if (typeof input === 'string') {
            url += '&excludedCourse[]=course^course-' + encodeURIComponent(input);
          }
        }

        return this;
      },

      getURL: function () {
        return url;
      }
    }
  }

}

// TODO: Add timeout
function getRecipes(url, cb) {
  var options = {
    url: url
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      cb(info);
      // console.log(body);
    } else {
       console.log("error: " + error);
      return callback(error);
    }
  }

  request(options, callback);
}


console.log(searchForRecipe(['milk', 'eggs', 'chicken']));

searchQ = searchForRecipe(['onion', 'carrot', 'milk', 'brown sugar'])
  .maxResults(4)
  .requiredCuisines('American')
  .getURL();

// getRecipes(searchQ, function(recipe) {
//   console.log(recipe);
// });

// THIS IS HOW TO GET specific data from the JSON request
getRecipes(searchQ, function(get) {
  get.matches.forEach(function(recipe) {
    console.log(recipe.id);
  });
});
// async function fetchRecipes(search) {
//   try {
//     let recipes = await search.getRecipes();
//     return recipes;
//   } catch(err) {
//     throw err;
//   }
// }

// console.log("Checking json printing: " + JSON.stringify(searchQ));


function getMetadata(url) {

}

function getDetails(recipeID) {

}
