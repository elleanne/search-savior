
var tFBool = false;

document.addEventListener("DOMContentLoaded", function () {
  var on = document.getElementById("checkboxid");
  if (on) {
    on.addEventListener("click", function () {
      var x = document.getElementById("onoff");
      if (!tFBool) {
        tFBool = true;
        x.innerHTML = "on";
        z = "on";
      } else {
        tFBool = false;

        x.innerHTML = "off";
        z = "off";
      }
      console.log(tFBool);
    });
  }
});

// need to fiugure out how to save the previos state
chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    var z;
    document.addEventListener("DOMContentLoaded", function () {
      z = document.getElementById("onoff");
    });

    if (z) {
      if (z.innerHTML === "on") {
        console.log(current_tab_info.url);
      }
    }
  });
});
