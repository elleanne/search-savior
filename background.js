// Authors: MLH POD 2.1.3 Goofy Goffy {Elizabeth Crouther, Sakshi Gupta, Myat Thu Ko}
// The follow 3 lines are for testing purposes only.
/*
const chrome = require('sinon-chrome'); 
window.chrome = chrome; 
exports.chrome = chrome;
*/
var tFBool = true;
var treeArray = [];
var curr_parentId = null;
var allID = [];
var allNodes = [];
var i = 1;
var nameIsSaved2 = false;
// used to create a tree struct to save to chrome.storage.sync
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

var node = new TreeNode();

// Listen for page loaded: check if toggle(checkbox) is on or off and save value to chrome.storage.local
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  chrome.storage.local.get("enabled", function (result) {
    if (result.enabled !== null && checkbox !== null) {
      checkbox.checked = result.enabled;
    }
  });
  if (checkbox) {
    checkbox.addEventListener("click", function () {
      chrome.storage.local.set({ enabled: checkbox.checked }, function () {});
    });
  }
  // fetch custom name and category from popup form: activated only when save button is pressed
  var bool = document.getElementById("Submit");

  if (bool) {
    bool.addEventListener("click", save_name());
  }
  function save_name() {
    var search_name = document.getElementById("name").value;

    if(search_name === null || search_name === "") {
      search_name = "Search " + i;
      i++;
    }
    localStorage.setItem("input_name", search_name);
    
    var category = document.getElementById("category").value;
    localStorage.setItem("input_category", category);
    nameIsSaved = true;
    chrome.storage.local.set({ nameIsSaved: true });
  }
});

// When toggle is enabled and a new tab is 'heard', save tab url to treeArray as a new value or a descendant
// When toggle is disabled, save the project data structure and the name of the project in chrome.storage

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    var checkbox = document.querySelector('input[type="checkbox"]');
    chrome.storage.local.get("enabled", function (result) {
      var treeName;
      if (!result.enabled && allNodes.length !== 0) {
        var searching = document.getElementById("name");
        console.log(nameIsSaved2);
        chrome.storage.local.get("nameIsSaved", (TFBOOL) => {
          nameIsSaved2 = TFBOOL.nameIsSaved;

          if (!nameIsSaved2) {
            treeName = "Search " + i;
            i++;
            localStorage.setItem("input_name", treeName);
            console.log(treeName);
          } else {
            treeName = localStorage.getItem("input_name");
            console.log(treeName);
          }

          console.log(treeName);
          if (document.getElementById("category") === null) {
            treeCategory = "Untitled Category";
            localStorage.setItem("input_category", treeCategory);
          } else {
            treeCategory = localStorage.getItem("input_category");
          }

          saveProject(checkbox, allNodes, treeName);
          chrome.storage.local.set({ projectName: treeName });
          allNodes = [];
          tFBool = true; // reset all values
          treeArray = [];
          curr_parentId = null;
          allID = [];
        });
      }

      if (result.enabled) {
        chrome.storage.local.set({ nameIsSaved: false });
        var newdata = {
          // save data into object
          id: tab.tabId,
          parentId: curr_parentId,
          url: current_tab_info.url,
        };
        if (allID !== null) {
          if (allID.includes(tab.tabId)) {
            for (i in allNodes) {
              if (allNodes[i].value === current_tab_info.url) {
                // TODO: test that descendants are added correctly
                node = allNodes[i]; // get the nodee that matches the current tab -
                break;
              }
            }
            curr_parentId = tab.tabId;
            var tempchild = [];
            for (i in treeArray) {
              if (treeArray[i].parentId === tab.tabId) {
                // get all children of the current tab
                tempchild.push(treeArray[i].url);
              }
            }
            node.descendants.push(tempchild);
          } else {
            // if url is new, but not the first url to be visited
            node = new TreeNode(current_tab_info.url);
            curr_parentId = tab.tabId;
            treeArray.push(newdata);
            allID.push(tab.tabId);
            allNodes.push(node);
          }
        } else {
          // if url is new, and IS the first url to be visited
          node = new TreeNode(current_tab_info.url);
          curr_parentId = tab.tabId;
          treeArray.push(newdata);
          allID.push(tab.tabId);
          allNodes.push(node);
        }
      }
    });
  });
});

// save a project by it's project name set by user, or defualt " search"+int
function saveProject(onOff, allNodes, treeName) {
  if (!onOff) {
    var treeVar = treeName;
    var obj = {};
    obj[treeVar] = allNodes;
    var d = new Date();
    var n = d.getDate();
    n += "-" + (d.getMonth()+1) + "-" + d.getFullYear();
    let name = "&&date-"+treeVar;
    let date = {}
    date[name] = n;
    chrome.storage.sync.set(obj);
    chrome.storage.sync.set(date);
  }
}

// get a project by it's key from chrome.storage.sync
function getProject(treeName) {
  chrome.storage.sync.get(treeName, function (data) {
    var mySet = new Array(data);
    return mySet;
  });
}