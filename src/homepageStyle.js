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
    var li = document.createElement("BUTTON");
    var textnode = document.createTextNode(document.getElementById(timeID).value);
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    timeFilterOn = true;
  }
}

function addDietFilter(dietID) {
  if (dietFilterOn == false) {
    var li = document.createElement("BUTTON");
    var textnode = document.createTextNode(document.getElementById(dietID).value);
    li.appendChild(textnode);
    document.getElementById("filterSelection").appendChild(li);
    dietFilterOn = true;
  }
}
