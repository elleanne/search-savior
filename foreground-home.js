console.log("execute foreground.home");

checkKeys();

// If a new project was made on the index page, add it to the table
document.getElementById("addR").addEventListener("click", () => {
  var projTable = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  console.log();
  if (projTable.rows[2].getElementsByTagName("input")[1].value !== null) {
    chrome.tabs.executeScript(null, { file: "/js/addRow.js" }, () =>
      console.log("ran addRow.js")
    );
    checkKeys();
  }
});

// if there are new trees added to sync storage, add them to the page
function checkKeys() {
  var setAllKeys;
  chrome.storage.sync.get(null, function (items) {
    var allKeys = Object.keys(items);
    console.log(allKeys);
    setAllKeys = allKeys;
    for (i in allKeys) {
      //console.log(document.getElementById(allKeys[i]));
      if (document.getElementById(allKeys[i]) === null && allKeys[i] !== "z") {
        console.log(allKeys[i]);
        addEntry(allKeys[i]);
      }
    }
  });
}
