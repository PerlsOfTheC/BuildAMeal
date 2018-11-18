// Need function to delete elements and update var values
// Prevent duplicates when searching
// Sort by minimum rating OR alphabetical order
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
  // var val = $('#myInput').val();
  // $('#ingredientCheckbox').append(val + "\n");
  // $('#myInput').val('').focus();
  var ul = document.getElementById("ingredientCheckbox");
  var li = document.createElement("li");
  var children = ul.children.length + 1;

  li.setAttribute("id", "element"+children);
  var val = $('#myInput').val();
  li.appendChild(document.createTextNode(val));
  ul.appendChild(li);
   $('#myInput').val('').focus();
}

function addIngredient (ingredientID) {
  var filter = document.getElementById(ingredientID).value;
  if (resultIngredients.indexOf(filter) <= -1 && resultIngredients.length<10) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
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
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    timeFilterOn = true;
  }
}

function addDietFilter(dietID) {
  if (dietFilterOn == false) {
    var li = document.createElement("LI");
    var filter = document.getElementById(dietID).value
    var textnode = document.createTextNode(filter);
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    resultFilter.push(filter);
    dietFilterOn = true;
  }
}

function addGenericFilter(filterID) {
  var filter = document.getElementById(filterID).value
  if (resultFilter.indexOf(filter) <= -1) {
    var li = document.createElement("LI");
    var textnode = document.createTextNode(filter);
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
