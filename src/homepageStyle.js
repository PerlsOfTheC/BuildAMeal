var resultFilter = [];
var resultIngredients = [];
var timeFilterOn = false;
var dietFilterOn = false;
var sortingType;

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

$("document").ready(function(){
    $('#myInput').keypress(function(e){
      if(e.keyCode==13)
      $('#add').click();
    });
});

function addToCheckBox() {
  var ul = document.getElementById("ingredientCheckbox");
  var li = document.createElement("li");
  var val = $('#myInput').val();

  if (!/^[a-zA-Z\s-]*$/.test(val) || val == '') {
    $('#myInput').val('ERROR: Not a valid ingredient.').focus();
  }
  else {
    val = val.toLowerCase();
    if (resultIngredients.indexOf(val) > -1) {
      $('#myInput').val('ERROR: No duplicates.').focus();
    }
    else if (resultIngredients.length == 10) {
      $('#myInput').val('Max of 10 ingredients reached.').focus()
    }
    else { // only push if valid ingredient, not already in ingredients List && max not reached
     resultIngredients.push(val);
     li.onclick = function deleteItem() {
      this.parentNode.removeChild(this);
      var index = resultIngredients.indexOf(this.innerHTML);
      resultIngredients.splice(index,1);
     }
     li.appendChild(document.createTextNode(val));
     ul.appendChild(li);
     $('#myInput').val('').focus();
    }
  }
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

$(function () {

    $( document ).tooltip();
    $('#test').tooltip({
        content: 'TOOLTIP CONTENT'
    });
});

function displayBanner() {
  var ing = ("\xa0\xa0\xa0Showing results for: \xa0").bold();
  var filter = ("\xa0\xa0\xa0Filters applied: \xa0").bold();
  var ingList = ing + resultIngredients.join(', ');
  var filterList = filter + resultFilter.join(', ');
  document.getElementById("bannerIngredients").innerHTML = ingList;
  document.getElementById("bannerFilters").innerHTML = filterList;
  document.getElementById("sortByList").selectedIndex = "0";
  document.getElementById("finalRecipes").innerHTML = ""; // Clears recipes from last generation
  var horz = document.createElement("HR");
  horz.style.width = "97%";
  horz.style.color = "#D0D0D0";
  document.getElementById("finalRecipes").append(horz);

  // White rectangle
  var div = document.createElement("div");
  div.style.background = "white";
  div.style.color = "black";
  div.style.margin = "1vw";
  div.style.width = "97%";
  div.style.overflow = "hidden";
  div.style.border = "2px solid #b3cccc";

  var table = document.createElement("table");
  table.style.background = "white";
  table.style.height = "18vh";
  table.style.tableLayout = "fixed";
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.style.margin = "0px 1vh 0px 0px" ;
  var row = document.createElement("TR");

  // Left food image
  var left = document.createElement("TD");
  left.style.width = '20%';
  var a = document.createElement('a');
  a.setAttribute('href','https://coderanch.com/t/120597/languages/javascript-open-window');
  a.setAttribute('target', '_blank');
  var pic = document.createElement('img');
  pic.setAttribute('src','https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=s180');
  pic.style.objectFit = "cover";
  pic.style.margin = "1vh";
  pic.style.height = "16vh";
  pic.style.width = "16vh";
  pic.style.maxWidth = "100%";
  pic.style.maxHeight = "100%";
  left.style.textAlign = "center";
  a.append(pic);
  left.append(a);

  // Right pane
  var right = document.createElement("TD");
  right.style.width = "80%";
  right.style.verticalAlign = "center";

  var row1 = document.createElement("div");
  row1.style.marginTop = "-2vh";
  row1.style.fontWeight = "bold";
  row1.style.fontSize = "3vh";
  row1.style.height = "4vh";
  row1.style.borderLeft = "5px dotted orange";
  row1.style.paddingLeft = "5px";
  var linkText = document.createTextNode("Recipe Ncipe ipe Ncipe Namee Recipe Ncipe Name Recipe Ncipe Name");
  a = document.createElement('a');
  a.setAttribute('href','https://coderanch.com/t/120597/languages/javascript-open-window');
  a.setAttribute('target', '_blank');
  a.appendChild(linkText);
  a.title = "Recipe Name";
  a.style.textDecoration = "none";
  a.style.color = "black";
  a.setAttribute('id', 'test');
  var p = document.createElement ("p");
  p.style.height = "4vh";
  p.append(a);
  row1.append(p);
  p.style.textOverflow = "ellipsis";
  p.style.overflow = "hidden";
  row1.style.marginBottom = "0";

  var row2 = document.createElement("div");
  row2.style.marginTop = "1vh";
  row2.style.height = "5vh";
  var italicize = document.createElement("I");
  var row2P = document.createElement('span');
  row2P.style.display = "block";
  row2P.style.height = "3vh";
  var bold = document.createElement('strong');
  var boldText = document.createTextNode("INGREDIENTS: ");
  var row2Data = document.createTextNode("HElHEll oHElloHEll oHElloHElloHEl loHElloHEl loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo ");
  row2P.style.marginRight = "10px";
  row2P.style.verticalAlign = "middle";
  row2P.style.color = "grey";
  row2.style.textOverflow = "ellipsis";
  row2.style.overflow = "hidden";
  row2.style.fontSize = "2vh";
  bold.append(boldText);
  row2P.append(row2Data);
  italicize.append(row2P);
  bold.append(italicize);
  row2.append(bold);

  var row3 = document.createElement("div");
  row3.style.marginTop = "1vh";
  row3.style.width = "100%";
  row3.style.height = "3vh";
  row3.style.display = "flex";

  var row3A = document.createElement("div");
  bold = document.createElement('strong');
  boldText = document.createTextNode("PREP TIME: ");
  var row3AData = document.createTextNode("HElHEll oHElloHEll oHElloHElloHEl loHElloHEl loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloH ElloHElHE lloHElloHEllo HElloH ElloH ElloHElloH  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHElHE lloHElloHEllo  loHElloHEl loHElloH ElloHEl");
  row3A.style.height = "3vh";
  row3A.style.width = "50%";
  bold.append(boldText);
  row3A.append(bold);
  row3A.append(row3AData);
  row3A.style.fontSize = "2vh";
  row3A.style.textOverflow = "ellipsis";
  row3A.style.overflow = "hidden";

  var row3B = document.createElement("div");
  bold = document.createElement('strong');
  boldText = document.createTextNode("RATING: ");
  var row3BData = document.createTextNode("3.5");
  row3B.style.height = "3vh";
  row3B.style.width = "50%";
  bold.append(boldText);
  row3B.append(bold);
  row3B.append(row3BData);
  row3B.style.fontSize = "2vh";
  row3B.style.textOverflow = "ellipsis";
  row3B.style.overflow = "hidden";

  row3.append(row3A);
  row3.append(row3B);

  right.append(row1);
  right.append(row2);
  right.append(row3);
  row.appendChild(left);
  row.appendChild(right);
  table.appendChild(row);
  div.appendChild(table);

  document.getElementById("finalRecipes").append(div);
}


function sort() {
  sortingType = document.getElementById("sortByList").selectedIndex;
  // x = Sort by method (0 = alphabetical, 1 = by rating; 2 = Prep Time (low to high))
}
