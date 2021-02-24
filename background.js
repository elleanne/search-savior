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
var i = 0; // for tree naming

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

var node = new TreeNode();
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  chrome.storage.local.get("enabled", function (result) {

    if (result.enabled !== null && checkbox !== null) {
      checkbox.checked = result.enabled;
    }
  });
  if (checkbox) {
    checkbox.addEventListener("click", function () {
      chrome.storage.local.set({ enabled: checkbox.checked }, function () {
      });
    });
  }
});

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    var checkbox = document.querySelector('input[type="checkbox"]');
    chrome.storage.local.get("enabled", function (result) {
      if (!result.enabled && allNodes.length !== 0) {
        treeName = "tree" + i;
        i++;
        saveProject(checkbox, allNodes, treeName);
        allNodes = [];
        tFBool = true; // reset all values
        treeArray = [];
        curr_parentId = null;
        allID = [];
      }

      if (result.enabled) {
        var newdata = {
          id: tab.tabId,
          parentId: curr_parentId,
          url: current_tab_info.url,
        };

        if (allID !== null) {
          if (allID.includes(tab.tabId)) {
            for (i in allNodes) {
              if (allNodes[i].value === current_tab_info.url) {
                // TODO: test that descendants are added correctly
                node = allNodes[i];
                break;
              }
            }
            curr_parentId = tab.tabId;
            var tempchild = [];
            for (i in treeArray) {
              if (treeArray[i].parentId === tab.tabId) {
                tempchild.push(treeArray[i].url);
              }
            }
            node.descendants.push(tempchild);
          } else {
            node = new TreeNode(current_tab_info.url);
            curr_parentId = tab.tabId;
            treeArray.push(newdata);
            allID.push(tab.tabId);
            allNodes.push(node);
          }
        } else {
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

function saveProject(onOff, allNodes, treeName) {
  if (!onOff) {
    console.log(treeName);
    var treeVar = treeName;
    var obj = {};
    obj[treeVar] = allNodes;
    console.log(obj);
    chrome.storage.sync.set(obj);
    var tempData = getProject(treeName);
    console.log(allNodes.length);
    if (tempData !== null && allNodes.length !== 0) {
      chrome.runtime.sendMessage(treeName);
    }
  }
  return;
}

function getProject(treeName) {
  chrome.storage.sync.get(treeName, function (data) {
    var mySet = new Array(data);
    return mySet;
  });
}

var makeNode = (urlName) => {
  // not used
  var node1 = new TreeNode();
  node1.value = urlName;
  return node1;
};

var addDesc = (node2, desc) => {
  // not used
  if (node2.descendants !== undefined) {
    var tempDesc = node2.descendants;
    tempDesc.push(desc);
    node2.descendants = tempDesc;
  } else node2.descendants.push(desc);
  return node2;
};