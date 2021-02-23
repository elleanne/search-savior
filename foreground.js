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
<<<<<<< Updated upstream
=======

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
    console.log(allKeys);
    for (i in allKeys) {
      if (document.getElementById(allKeys[i]) === null && allKeys[i] !== "z") {
        console.log(allKeys[i]);
        treeName = allKeys[i];
        loadDoc();
      }
    }
  });
}

>>>>>>> Stashed changes
function loadDoc() {
  if (treeName === undefined) {
    treeName = getKeys();
  }
  chrome.storage.sync.get(treeName, function (data) {
    console.log(treeName);
    var responseText = data;
    console.log(responseText);
    console.log(responseText.Array);
    console.log(responseText.tree);
    var xhttp = new XMLHttpRequest();
    console.log(xhttp);
    xhttp.onreadystatechange = function () {
      console.log("before ready" + document.getElementById("demo").innerHTML);

      if (this.readyState == 4 && this.status == 0) {
        for (i in responseText.tree) {
          if (
            !document
              .getElementById("demo")
              .innerHTML.includes(responseText.tree[i].value)
          ) {
            if (
              document.getElementById("demo").innerHTML ===
              "<h2>New Tree Here</h2>"
            ) {
              document.getElementById("demo").innerHTML =
                '<ul id="tree"><li><span class="caret"><a href="' +
                responseText.tree[i].value +
                '">' +
                responseText.tree[i].value +
                '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                responseText.tree[i].descendants +
                '">' +
                responseText.tree[i].descendants +
                "</a></span></ul></li></li></ul>";
            } else {
              document.getElementById("demo").innerHTML +=
                '<ul id="tree"><li><span class="caret"><a href="' +
                responseText.tree[i].value +
                '">' +
                responseText.tree[i].value +
                '</a></span><ul class="nested"><li><span class="caret"><a href="' +
                responseText.tree[i].descendants +
                '">' +
                responseText.tree[i].descendants +
                "</a></span></ul></li></li></ul>";
            }
          }
        }
<<<<<<< Updated upstream
      };
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    });
=======
      }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
>>>>>>> Stashed changes
  });
}
