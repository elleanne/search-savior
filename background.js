var tFBool = false;
var once = 0;
function turnOn() {
  console.log("on");
  chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (current_tab_info) => {
      console.log(current_tab_info.url);
    });
  });
}

function doAmazingThings() {
  //alert("YOU AM AMAZING!");
  if (!tFBool) {
    tFBool = true;
  } else {
    tFBool = false;
  }
  console.log(tFBool);
}

document.addEventListener("DOMContentLoaded", function () {
  var on = document.getElementById("checkboxid");
  if (on) {on.addEventListener("click", doAmazingThings);}

});

