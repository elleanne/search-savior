console.log("execute fore");
chrome.runtime.onMessage.addListener(function (request) {
  console.log("from the extension");
  if (request.greeting == "saved tree") {
    console.log("got message");
    loadDoc();
  }
});

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}
function loadDoc() {
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
                '<ul id="tree"><li><span class="caret"><a href="' + responseText.tree[i].value + '">' +
                responseText.tree[i].value +
                '</a></span><ul class="nested"><li><span class="caret"><a href="' +responseText.tree[i].descendants + '">' +
                responseText.tree[i].descendants +
                "</a></span></ul></li></li></ul>";
            } else {
              document.getElementById("demo").innerHTML +=
                '<ul id="tree"><li><span class="caret"><a href="' + responseText.tree[i].value + '">' +
                responseText.tree[i].value +
                '</a></span><ul class="nested"><li><span class="caret"><a href="' + responseText.tree[i].descendants + '">' +
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
}
 