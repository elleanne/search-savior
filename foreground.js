console.log("execute fore");

var treeName;

//listen for page loaded: projectName is a variable is saved when project button is clicked in foreground-home
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get("projectName", function (result) {
    treeName = Object.entries(result)[0][1];
    loadDoc();
  });
});

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

//refresh page
var counter = 1;
var auto_refresh = setInterval(function () {
  var newcontent = " <h4>Your Search Tree</h4>";
  $("#divID").html(newcontent);
  counter++;
}, 1000);

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

// load search.html page with urls for a particular project
function loadDoc() {
  if (treeName === undefined) {
    chrome.storage.local.get(projectName, function (data) {
      treeName = Object.entries(result)[0][1];
    });
  }
  chrome.storage.sync.get(treeName, function (data) {
    var responseText = Object.values(data);
    var keys = Object.keys(data);

    if (treeName !== "z") {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 0) {
          var arrayOfChildren = [];
          for (i in keys) {
            for (j in responseText[i]) {
              console.log(i + " " + j);
              if (
                !document.getElementById("demo").innerHTML.includes(keys[i]) &&
                responseText[i][j].value !== ""
              ) {
                var treeHead = responseText[i][j].value;
                if (!arrayOfChildren.includes(treeHead)) {
                  arrayOfChildren.push(treeHead);

                  var desc = responseText[i][j].descendants;
                  console.log("head: " + treeHead + " , desc: " + desc);
                  var treeStruct = document.createElement("ul");
                  var listStruct = document.createElement("li");
                  var carrot = document.createElement("span");

                  treeStruct.className = "myUL";
                  carrot.className = "caret";
                  carrot.id = treeHead;

                  carrot.innerHTML =
                    '<a href="' + treeHead + '">' + treeHead + "</a>";
                  listStruct.appendChild(carrot);
                  treeStruct.appendChild(listStruct);
                  document.getElementById("demo").appendChild(treeStruct);
                  console.log(listStruct);
                  for (var d in desc) {
                    for (var e in desc[d]) {
                      if (!arrayOfChildren.includes(desc[d][e])) {
                        console.log(desc[d][e]);
                        var treeStructIn = document.createElement("ul");
                        var listStructIn = document.createElement("li");
                        var carrotIn = document.createElement("span");

                        treeStructIn.className = "nested";
                        carrotIn.className = "caret";
                        carrotIn.id = desc[d][e];
                        carrotIn.innerHTML =
                          '<a href="' + desc[d][e] + '">' + desc[d][e] + "</a>";
                        listStructIn.appendChild(carrotIn);
                        treeStructIn.appendChild(listStructIn);
                        listStruct.appendChild(treeStructIn);
                        console.log(listStruct);
                        arrayOfChildren.push(desc[d][e]);
                      }
                    }
                  }
                }
              }
            }
          }
          var toggler = document.getElementsByClassName("caret");
          //var toggler = document.getElementsByTagName("span");
          for (var k = 0; k < toggler.length; k++) {
            console.log(toggler[k].innerHTML);
            toggler[k].addEventListener("click", function (toggler) {
              var t = toggler;
              var thisCaretID = t.toElement.id;
              var thisCaret = document.getElementById(thisCaretID);
              console.log(thisCaret.id);
              if (thisCaret.parentElement.querySelector(".nested") === null) {
                thisCaret.classList.toggle("caret-down");
              } else {
                for (var z in thisCaret.parentElement.getElementsByClassName(
                  "nested"
                )) {
                  var nestedCaret = thisCaret.parentElement.getElementsByClassName(
                    "nested"
                  )[z];
                  nestedCaret.classList.toggle("active");
                }

                thisCaret.classList.toggle("caret-down");
              }
              console.log(
                thisCaret.parentElement.getElementsByClassName("nested")
              );
            });
            console.log("k: " + k);
            console.log(toggler[k].attributes);
          }
        }
      };

      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    }
  });
}
