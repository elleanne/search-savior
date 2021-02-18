const chrome = require('sinon-chrome');
window.chrome = chrome;

var tFBool = false;
var treeArray = [];

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
        //console.log(st.data);
      }
      console.log(tFBool);
      chrome.storage.local.set({'z': z}, function() {
        // Notify that we saved.
          console.log(z);
      });
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
        var newdata = {id: tab.tabId, parentId: 1, url: current_tab_info.url};
        //st.data.push(newdata);
      }
    }
  });
});
