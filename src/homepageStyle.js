// Need to fix formatting when items are added to filters selection
// Need function to delete elements an update var values
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
function displayBanner() {
  var ing = "\xa0\xa0\xa0Showing results for: \xa0";
  var filter = "\xa0\xa0\xa0Filters applied: \xa0";

  for (var i = 0; i<resultIngredients.length; i++) {
    if (i != 0)
        ing += ",\xa0\xa0"
    ing += (resultIngredients[i]);
  }
  for (var i = 0; i<resultFilter.length; i++) {
    if (i != 0)
        filter += ",\xa0\xa0"
    filter += (resultFilter[i]);
  }
  document.getElementById("bannerIngredients").innerHTML = ing;
  document.getElementById("bannerFilters").innerHTML = filter;
}
