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

// The following is for testing purpose only.
/*
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendants = [];
  }
}

exports.makeNode = (urlName) => {
  var node1 = new TreeNode();
  node1.value = urlName;
  return node1;
}

exports.addDesc = (node2, desc) => {
  if(node2.descendants !== undefined) {
    var tempDesc = node2.descendants;
    tempDesc.push(desc);
    node2.descendants = tempDesc;
  } else node2.descendants.push(desc);
  return node2;
}

var node = new TreeNode();
*/

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
    //     Testing purpose only
    //     console.log("initial status: " + result.enabled);

    if (result.enabled !== null && checkbox !== null) {
      checkbox.checked = result.enabled;
    }
    //else {
    //   if(results.enabled === nul) console.error("checkbox on/off enabled variable is not stored in local storage");
    //   else {console.error("cannot find checkbox id in html doc"); }
    // }
  });
  if (checkbox) {
    checkbox.addEventListener("click", function () {
      chrome.storage.local.set({ enabled: checkbox.checked }, function () {
        //console.log("confirmed");
      });
    });
  }
});

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    var checkbox = document.querySelector('input[type="checkbox"]');
    chrome.storage.local.get("enabled", function (result) {
      if (!result.enabled && allNodes.length !== 0) {
        saveProject(checkbox, allNodes, "tree1");
        allNodes = [];
        tFBool = true; // reset all values
        treeArray = [];
        curr_parentId = null;
        allID = [];

        //getProject("tree1"); //****  need to make this work for a user-input project name ***
      }

      // console.log("initial status: " + result.enabled);
      if (result.enabled) {
        //console.log(current_tab_info.url);
        var newdata = {
          id: tab.tabId,
          parentId: curr_parentId,
          url: current_tab_info.url,
        };

        //console.log(allID + " array");
        if (allID !== null) {
          if (allID.includes(tab.tabId)) {
            for (i in allNodes) {
              if (allNodes[i].value === current_tab_info.url) {
                // TODO: test that descendants are added correctly
                node = allNodes[i];
                break;
              }
            }
            //console.log(node);
            //console.log("already there");
            curr_parentId = tab.tabId;
            var tempchild = [];
            for (i in treeArray) {
              //console.log(treeArray[i].parentId);
              if (treeArray[i].parentId === tab.tabId) {
                tempchild.push(treeArray[i].url);
              }
            }
            //console.log("tempchild" + tempchild);
            node.descendants.push(tempchild);
            //console.log(node);
          } else {
            node = new TreeNode(current_tab_info.url);
            curr_parentId = tab.tabId;
            //console.log(newdata);
            treeArray.push(newdata);
            // console.log(treeArray);
            allID.push(tab.tabId);
            allNodes.push(node);

            //console.log(node);
          }
        } else {
          node = new TreeNode(current_tab_info.url);
          curr_parentId = tab.tabId;
          //console.log(newdata);
          treeArray.push(newdata);
          // console.log(treeArray);
          allID.push(tab.tabId);
          allNodes.push(node);
          //node.descendants.push(newdata.url);
          // console.log(node);
        }
      }
    });
  });
});

function saveProject(onOff, allNodes) {
  if (!onOff) {
    chrome.storage.sync.set({ tree: allNodes }); // TODO: need to make sync.get take an input, not hardcode tree in
    // var tempData = getProject();
    // console.log(allNodes.length);
    // if (tempData !== null && allNodes.length !== 0) {
    //   chrome.tabs.executeScript(null, { file: "/foreground-home.js" }, () =>
    //     console.log("Injected Foreground-home.js")
    //   );
    //   chrome.tabs.executeScript(null, { file: "/foreground.js" }, () =>
    //     console.log("Injected Foreground.js")
    //   );
    }
  

  return;
}

function getProject() {
  chrome.storage.sync.get("tree", function (data) {
    // TODO: need to make sync.get take an input, not hardcode tree in
    //console.log(data);
    var mySet = new Array(data);
    //console.log(mySet);
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
