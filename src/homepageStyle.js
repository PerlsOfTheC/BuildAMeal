
var resultFilter = [];
var resultIngredients = [];
var timeFilterOn = false;
var dietFilterOn = false;

$("document").ready(function() {
  var acc = document.getElementsByClassName("accordion");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
});

function addToCheckBox() {
  var ul = document.getElementById("ingredientCheckbox");
  var li = document.createElement("li");
  var val = toTitleCase($('#myInput').val().toLowerCase());

  // if valid ingredient
  // if (VAL IS A VALID INGREDIENT) {
  //   if (resultIngredients.indexOf(val) > -1) {
  //     $('#myInput').val('ERROR: Cannot add duplicate ingredients.').focus();
  //   }
  //   else if (resultIngredients.length == 10) {
  //     $('#myInput').val('Max of 10 ingredients reached.').focus()
  //   }
  //   else { // only push if valid ingredient, not already in ingredients List && max not reached
  //     resultIngredients.push(val);
  //     li.onclick = function deleteItem() {
  //        this.parentNode.removeChild(this);
  //        var index = resultIngredients.indexOf(this.innerHTML);
  //        resultIngredients.splice(index,1);
  //    }
  //     li.appendChild(document.createTextNode(val));
  //     ul.appendChild(li);
  //     $('#myInput').val('').focus();
  //   }
  // }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function addIngredient (ingredientID) {
  var filter = document.getElementById(ingredientID).value;
  if (resultIngredients.indexOf(filter) <= -1 && resultIngredients.length<10) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultIngredients.indexOf(this.innerHTML);
      resultIngredients.splice(index,1);
    }
    li.appendChild(textnode);
    document.getElementById("ingredientCheckbox").appendChild(li);
    resultIngredients.push(filter);
  }
}

function addTimeFilter(timeID) {
  //Limits time filter to 1 option
  if (timeFilterOn == false) {
    var li = document.createElement("LI");
    var filter = document.getElementById(timeID).value;
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
      timeFilterOn = false;
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    timeFilterOn = true;
  }
}

function addDietFilter(dietID) {
  //Limits time filter to 1 option
  if (dietFilterOn == false) {
    var li = document.createElement("LI");
    var filter = document.getElementById(dietID).value
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
      dietFilterOn = false;
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    dietFilterOn = true;
  }
}

function addGenericFilter(filterID) {
  var filter = document.getElementById(filterID).value
  if (resultFilter.indexOf(filter) == -1) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
    li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultFilter.indexOf(this.innerHTML);
      resultFilter.splice(index,1);
    }
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
  }
}

function displayBanner() {
  var ing = "\xa0\xa0\xa0Showing results for: \xa0";
  ing = ing.bold();
  var filter = "\xa0\xa0\xa0Filters applied: \xa0";
  filter = filter.bold();
  var ingList = ing + resultIngredients.join(', ');
  var filterList = filter + resultFilter.join(', ');
  document.getElementById("bannerIngredients").innerHTML = ingList;
  document.getElementById("bannerFilters").innerHTML = filterList;
}

function sort() {
  var x = document.getElementById("sortByList").selectedIndex;
  // x = Sort by method (0 = alphabetical, 1 = by rating)
}
