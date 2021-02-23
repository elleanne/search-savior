console.log("execute fore");
var treeName; //= chrome.runtime.onMessage;
chrome.runtime.onMessage.addListener(function (request) {
  treeName = request;
  console.log(treeName);
  loadDoc();
});

// listen for
document.addEventListener("DOMContentLoaded", function () {
  loadDoc();
});

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

// reload page
var counter = 1;
var auto_refresh = setInterval(function () {
  var newcontent = " <h4>Your Search Tree</h4>";
  $("#divID").html(newcontent);
  counter++;
}, 1000);

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

function loadDoc() {
  if (treeName === undefined) {
    treeName = getKeys();
  }
  chrome.storage.sync.get(treeName, function (data) {
    console.log(treeName);

    var responseText = Object.values(data);
    var keys = Object.keys(data);

    if (treeName !== "z") {
      var xhttp = new XMLHttpRequest();
      //console.log(xhttp);
      xhttp.onreadystatechange = function () {
        //console.log("before ready" + document.getElementById("demo").innerHTML);
        console.log(responseText);
        if (this.readyState == 4 && this.status == 0) {
          for (i in keys) {
            for (j in responseText[i]) {
              console.log(responseText[i][j].value + " " + i+ " " +j);
              if (
                !document.getElementById("demo").innerHTML.includes(keys[i]) && responseText[i][j].value !== ""
              ) {
                if (
                  document.getElementById("demo").innerHTML ===
                  "<h2>New Tree Here</h2>"
                ) {
                  document.getElementById("demo").innerHTML =
                    '<ul id="tree"><li><span class="caret"><a href="' +
                    responseText[i][j].value +
                    '">' +
                    responseText[i][j].value +
                    '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                    responseText[i][j].descendants +
                    '">' +
                    responseText[i][j].descendants +
                    "</a></span></ul></li></li></ul>";
                } else {
                  document.getElementById("demo").innerHTML +=
                    '<ul id="tree"><li><span class="caret"><a href="' +
                    responseText[i][j].value +
                    '">' +
                    responseText[i][j].value +
                    '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                    responseText[i][j].descendants +
                    '">' +
                    responseText[i][j].descendants +
                    "</a></span></ul></li></li></ul>";
                }
              }
            }
          }
        }
      };
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    }
  });
}
