console.log("execute fore");

// chrome.runtime.onMessage.addListener(function (request) {
//   console.log("from the extension");
//   if(request.greeting === "are you ready", ()=>{
//     chrome.runtime.sendMessage({ greeting: "ready" });
//   });
//   if (request.greeting === "saved tree") {
//     console.log("got message");
//     loadDoc();
//   }
// });

loadDoc();
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

// reload page
var counter = 1;
var auto_refresh = setInterval(
function () {
    var newcontent= " <h4>Your Search Tree</h4>";
    $('#divID').html(newcontent);
    counter++;
}, 1000);


function loadDoc() {
  document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.sync.get("tree", function (data) {
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
        }
      };
      xhttp.open("GET", "ajax_info.txt", true);
      xhttp.send();
    
    });
  });
}
