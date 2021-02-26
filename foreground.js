// Authors: MLH POD 2.1.3 Goofy Goffy {Elizabeth Crouther, Sakshi Gupta, Myat Thu Ko}
console.log("execute fore");
/*
foreground.js creates the tree of the search for a specific project in search.html
*/
var treeName; // the name of the project to load in search.html

/*listen for page loaded: projectName is a variable that is saved in chrome.storage.local 
in background.js OR foreground-home.js, depending on if a new project is saved or a button 
is clicked saved when project button is clicked in foreground-home*/
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("projectName", function (result) {
    treeName = Object.entries(result)[0][1];
    loadDoc();
  });
});
// used to get value and descendent of data retrieved from chrome.storage.sync
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

//refresh page
var counter = 1;
// var auto_refresh = setInterval(function () {
//   var newcontent =
//     "<h4>" + localStorage.getItem("input_category").toUpperCase() + "</h4>";
//   $("#divID").html(newcontent);
//   counter++;
// }, 1000);

// NOT USING now, might need if we make a page with all urls
// get all keys in storage.sync to put in search.html
function getKeys() {
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    for (i in allKeys) {
      if (document.getElementById(allKeys[i]) === null && allKeys[i] !== "z") {
        treeName = allKeys[i];
        loadDoc();
      }
    }
  });
}

// load search.html page with urls for a particular project and add event listeners
// Is this function long and crazy? Yes. But I'm super proud that I figured out how to implement a dynamic tree structure with carets. :crying_laughing_smiley:
// TODO: One day, this would be beautiful as a recursive function
function loadDoc() {
  if (treeName === undefined) {
    // get the value of the last button clicked, OR the value of the last project saved
    chrome.storage.local.get(projectName, function (data) {
      treeName = Object.entries(result)[0][1];
    });
  }
  chrome.storage.sync.get(treeName, function (data) {
    // get the data tree of the desired search
    var responseText = Object.values(data); // values are urls
    var keys = Object.keys(data); // keys are the names of the projects

    if (treeName !== "z") {
      // z is a variable in storage, but not a tree
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 0) {
          // if the page is ready
          $("#search_page_title").html(treeName.toUpperCase());
          var arrayOfChildren = []; // used so that if the data structure contains multiple urls that are the same, only add them once
          for (i in keys) {
            for (j in responseText[i]) {
              if (responseText[i][j].value !== "") {
                var treeHead = responseText[i][j].value; // head node of the tree
                if (!arrayOfChildren.includes(treeHead)) {
                  arrayOfChildren.push(treeHead);
                  var desc = responseText[i][j].descendants;
                  // create head elements to go in page
                  var treeStruct = document.createElement("ul");
                  var listStruct = document.createElement("li");
                  var carrot = document.createElement("span");
                  // save attributes to head elements
                  treeStruct.className = "myUL";
                  carrot.className = "caret";
                  carrot.id = treeHead;
                  carrot.innerHTML =
                    '<a href="' + treeHead + '">' + treeHead + "</a>";
                  // add head elements to page
                  listStruct.appendChild(carrot);
                  treeStruct.appendChild(listStruct);
                  document.getElementById("demo").appendChild(treeStruct);
                  // for all descendants of the head node:

                  console.log(desc + " : " + desc.length);
                  if (Array.isArray(desc)) {
                    //// test that desc is array
                    console.log(Array.isArray(desc));
                    for (var d in desc) {
                      if (!arrayOfChildren.includes(desc[d])) {
                        // create child elements
                        var treeStructIn = document.createElement("ul");
                        var listStructIn = document.createElement("li");
                        var carrotIn = document.createElement("span");
                        // add attributes to child elements
                        treeStructIn.className = "nested";
                        carrotIn.className = "caret";
                        carrotIn.id = desc[d];
                        carrotIn.innerHTML =
                          '<a href="' + desc[d] + '">' + desc[d] + "</a>";
                        // add child element to the head element
                        listStructIn.appendChild(carrotIn);
                        treeStructIn.appendChild(listStructIn);
                        listStruct.appendChild(treeStructIn);
                        // add child to array so we don't add it to the page twice!
                        if (desc[d].length === 1) {
                          var temp = desc[d][0]; // TODO: this is not perfect, and needs fixing :(
                          arrayOfChildren.push(temp);
                        } else {
                          arrayOfChildren.push(desc[d]);
                        }

                        console.log(arrayOfChildren);
                      }
                      console.log(arrayOfChildren.includes(desc[d]));
                    }
                  } else {
                    for (var d in desc) {
                      for (var e in desc[d]) {
                        // arrays of arrays are saved so we need 2-d array iteration
                        if (!arrayOfChildren.includes(desc[d][e])) {
                          // create child elements
                          var treeStructIn = document.createElement("ul");
                          var listStructIn = document.createElement("li");
                          var carrotIn = document.createElement("span");
                          // add attributes to child elements
                          treeStructIn.className = "nested";
                          carrotIn.className = "caret";
                          carrotIn.id = desc[d][e];
                          console.log(desc[d]);
                          carrotIn.innerHTML =
                            '<a href="' +
                            desc[d][e] +
                            '">' +
                            desc[d][e] +
                            "</a>";
                          // add child element to the head element
                          listStructIn.appendChild(carrotIn);
                          treeStructIn.appendChild(listStructIn);
                          listStruct.appendChild(treeStructIn);
                          // add child to array so we don't add it to the page twice!
                          arrayOfChildren.push(desc[d][e]);
                          console.log(arrayOfChildren);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          // this for loop add an action listener to each span element
          var toggler = document.getElementsByClassName("caret");
          for (var k = 0; k < toggler.length; k++) {
            // listen
            toggler[k].addEventListener("click", function (toggler) {
              // toggler is a mouse event
              var t = toggler;
              var thisCaretID = t.toElement.id;
              var thisCaret = document.getElementById(thisCaretID); // gets the ele from the page!
              // if it doesn't have a parent element, just make it toggle down to show an action happened
              if (thisCaret.parentElement.querySelector(".nested") === null) {
                thisCaret.classList.toggle("caret-down");
              } else {
                /* if it does have a parent element, get all the elements in the parent and set the .toggle to active so they are added to the page */
                for (var z in thisCaret.parentElement.getElementsByClassName(
                  "nested"
                )) {
                  console.log(
                    thisCaret.parentElement.getElementsByClassName("nested")
                      .length
                  );
                  var nestedCaret = thisCaret.parentElement.getElementsByClassName(
                    "nested"
                  )[z];
                  console.log(nestedCaret);
                  nestedCaret.classList.toggle("active");
                }
                thisCaret.classList.toggle("caret-down");
              }
            });
          }
        }
      };
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send(); // TODO: this is giving errors. Do we need to remove xhttp all together?
    }
  });
}